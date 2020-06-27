# huyefen-trolle

Trước khi chạy cài umi version 2:
yarn global add umi@2.13.13
```js
yarn global add umi@2.13.13
npm install -g umi@2.13.13
```
Tham khảo [umi](https://v2.umijs.org/guide/getting-started.html)

Để chạy app front end
```
cd frontend
yarn install
yarn start
```

Web app sẽ được chạy ở origin: **http://localhost:8080**

# Cấu trúc thư mục frontend
1. config
2. src

#config
Thư mục này chứa các config cho project. Trong đó ta chỉ cần quan tâm file **routes.config.js**
**routes.config.js** chứa config về route như
* Có những route gì.
* Ứng với route đó sẽ là page gì.
* Khi không match route thì redirect về đâu.

#src
Thư mục này có các thư mục con:
* components: Chứa các component thường hay dùng chung, tái sử dụng.
* assets: Chứa các hình ảnh (assets/images) hoặc mock data (assets/fakers).
* helpers: Thư mục chứa các file phụ trợ. Các file đó chứa các hàm phụ trợ, xử lí logic nhỏ nhặt.
* layouts: Thư mục chứa các file layouts. Layouts bản chất cũng là 1 component, nhưng nó thường là component cha to bự, wrap bên ngoài các component page, như là phần **xương sườn** của hệ thống. Nhiều pages có thể chung 1 layout. Ví dụ page **Login** và **Register** cùng chung layout **AuthLayout** --> Tính tái sử dụng
* pages: Thư mục chứa các file pages. Mỗi file thường ứng với một route. Đại diện cho 1 màn hình. Bản chất nó cũng là component, nhưng là component bự đại diện cho 1 màn hình, gồm nhiều component nhỏ bên trong.
* locales: Thư mục chứa các file ngôn ngữ.
* models: Thư mục chứa các model, liên quan đến các khái niệm như [redux](redux.js.org), [redux-saga](https://redux-saga.js.org). Tạm hiểu đây là nơi viết logic gọi API đến server.
* routes: Cùng là các component, thường dùng để xử lí logic authenticate.
* services: Chứa các file service, là phần nằm giữa API và models. Model không gọi trực tiếp API mà thông qua service, service sẽ gọi trực tiếp API.

#src 
Lưu ý mỗi lần git commit
```
git commit -m [message] --no-verify
```