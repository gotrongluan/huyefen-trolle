import fetch from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import storage from '@/helpers/storage';
import { toQueryString } from '@/helpers/utils';
import styles from './index.less';

const { NODE_ENV } = process.env;

const codeMessage = {
	200: 'Máy chủ đã trả về thành công dữ liệu được yêu cầu.',
	201: 'Dữ liệu mới hoặc sửa đổi thành công.',
	202: 'Dữ liệu mới hoặc sửa đổi thành công.',
	204: 'Xóa dữ liệu thành công.',
	400: 'Bad request. Kiểm tra lại tham số bạn gửi lên.',
	401: 'Người dùng không có quyền (mã thông báo, tên người dùng, lỗi mật khẩu).',
	403: 'Người dùng được ủy quyền nhưng quyền truy cập bị cấm.',
	404: 'Không thấy trang yêu cầu',
	405: 'Phương thức không được phép',
	406: 'Định dạng được yêu cầu không khả dụng.',
	409: 'Lỗi conflict dữ liệu.',
	410: 'Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không còn khả dụng nữa.',
	422: 'Đã xảy ra lỗi xác thực khi tạo đối tượng.',
	500: 'Đã xảy ra lỗi trên máy chủ. Vui lòng kiểm tra máy chủ.',
	502: 'Bad gateway.',
	503: 'The service is unavailable and the server is temporarily overloaded or maintained.',
	504: 'Đã hết thời gian chờ của cổng.',
};

class ErrorWithReponse extends Error {
	constructor(message, response) {
		super(message);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
		if (response) {
			this.name = response.status;
			this.response = response;
		}
	}
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const errortext = codeMessage[response.status] || response.statusText;
	notification.error({
		className: styles.reqNotification,
		// message: `${response.status}: ${NODE_ENV !== 'production' ? response.url : ''}`,
		message: `${response.status}: ${response.url}`,
		description: errortext
	});
	const error = new ErrorWithReponse(errortext, response);
	throw error;
}

function checkErrorCode(response) {
	if (typeof response === 'object' && typeof response.errorCode !== 'undefined') {
		const errorCode = 1 * response.errorCode;
		if (errorCode !== 0) {
			const errortext = response.message || 'Máy chủ báo rằng yêu cầu có lỗi';
			notification.error({
				message: 'Lỗi yêu cầu:',
				description: errortext,
			});
		}
	}
	return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
	const defaultOptions = {
		headers: {
			'Access-Control-Allow-Credentials': false,
		},
	};
	let qs = '';
	const newOptions = { ...defaultOptions, ...options };
	const token = storage.getToken();
	if (token) {
		newOptions.headers.Authorization = `Bearer ${token}`;
	}
	if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
		if (!(newOptions.body instanceof FormData)) {
			newOptions.headers = {
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=utf-8',
				...newOptions.headers,
			};
			newOptions.body = JSON.stringify(newOptions.body);
		} else {
			// newOptions.body is FormData
			newOptions.headers = {
				Accept: 'application/json',
				...newOptions.headers,
			};
		}
	} else if (newOptions.method === 'GET') {
		delete options.method;
		qs = toQueryString(options);
	}

	return fetch(`${url}${qs ? `?${qs}` : ''}`, newOptions)
		.then(checkStatus)
		.then(response => {
			// DELETE and 204 do not return data by default
			// using .json will report an error.
			if (response.status === 204) {
				return response.text();
			}
			return response.json();
		})
		.then(checkErrorCode)
		.catch(e => {
			const status = e.name;
			if (status === 401) {
				// @HACK
				/* eslint-disable no-underscore-dangle */
				window.g_app._store.dispatch({
					type: 'user/logout',
				});
				return;
			}
			// environment should not be used
			if (status === 403) {
				router.push('/exception/403');
				return;
			}
			if (status <= 504 && status >= 500) {
				router.push('/exception/500');
				return;
			}
			if (status === 404) {
				router.push('/exception/404');
			}
		});
}

export async function apiGet(url, options) {
  	return request(url, { method: 'GET', ...options });
}

export async function apiPost(url, options) {
  	return request(url, { method: 'POST', ...options });
}

export async function apiPut(url, options) {
  	return request(url, { method: 'PUT', ...options });
}

export async function apiDelete(url, options) {
  	return request(url, { method: 'DELETE', ...options });
}