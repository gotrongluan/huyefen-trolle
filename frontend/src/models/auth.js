import { delay } from '@/helpers/utils';
import storage from '@/helpers/storage';
import router from 'umi/router';
import sampleUser from '@/assets/fakers/user';
import * as authServices from '@/services/auth';

export default {
    namespace: 'auth',
    state: null,
    effects: {
        *register({ payload }, { call, put }) {
            yield delay(1200);
            router.push('/auth/login');
        },
        *login({ from, payload }, { call, put }) {
            const { phone, password } = payload;
            const response = yield call(authServices.login, phone, password);
            if (response) {
                const user = response.data;
                const sampleToken = 'sample-token';
                storage.setToken(sampleToken);
                yield put({
                    type: 'user/save',
                    payload: user
                });
                router.replace(from);
            }
        },
        *logout(_, { put }) {
            storage.setToken(null);
            router.push('/auth/login');
            yield put({ type: 'user/reset' });
        }
    }
}