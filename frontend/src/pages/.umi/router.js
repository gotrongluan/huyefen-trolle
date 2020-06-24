import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/auth',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__AuthLayout" */ '../../layouts/AuthLayout'),
          LoadingComponent: require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/AuthLayout').default,
    title: 'route.auth',
    routes: [
      {
        path: '/auth/login',
        title: 'route.auth.login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Auth__Login" */ '../Auth/Login'),
              LoadingComponent: require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/components/PageLoading/index')
                .default,
            })
          : require('../Auth/Login').default,
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'route.auth.login - route.auth',
        _title_default: 'HuYeFen Admin',
      },
      {
        path: '/auth/register',
        title: 'route.auth.register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Auth__Register" */ '../Auth/Register'),
              LoadingComponent: require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/components/PageLoading/index')
                .default,
            })
          : require('../Auth/Register').default,
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'route.auth.register - route.auth',
        _title_default: 'HuYeFen Admin',
      },
      {
        redirect: '/auth/login',
        exact: true,
        _title: 'route.auth',
        _title_default: 'HuYeFen Admin',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'HuYeFen Admin',
        _title_default: 'HuYeFen Admin',
      },
    ],
    _title: 'route.auth',
    _title_default: 'HuYeFen Admin',
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../../routes/Authenticated').default],
    title: 'route.basic',
    routes: [
      {
        path: '/dashboard',
        title: 'route.dashboard',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Dashboard" */ '../Dashboard'),
              LoadingComponent: require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/components/PageLoading/index')
                .default,
            })
          : require('../Dashboard').default,
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: 'route.dashboard - route.basic',
        _title_default: 'HuYeFen Admin',
      },
      {
        path: '/exception',
        routes: [
          {
            path: '/exception/404',
            title: 'route.exception.404',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Exception/404'),
                  LoadingComponent: require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/components/PageLoading/index')
                    .default,
                })
              : require('../Exception/404').default,
            exact: true,
            Routes: [require('./TitleWrapper.jsx').default],
            _title: 'route.exception.404 - route.basic',
            _title_default: 'HuYeFen Admin',
          },
          {
            path: '/exception/403',
            title: 'route.exception.403',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Exception/403'),
                  LoadingComponent: require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/components/PageLoading/index')
                    .default,
                })
              : require('../Exception/403').default,
            exact: true,
            Routes: [require('./TitleWrapper.jsx').default],
            _title: 'route.exception.403 - route.basic',
            _title_default: 'HuYeFen Admin',
          },
          {
            redirect: '/exception/404',
            exact: true,
            _title: 'route.basic',
            _title_default: 'HuYeFen Admin',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
            _title: 'HuYeFen Admin',
            _title_default: 'HuYeFen Admin',
          },
        ],
        _title: 'route.basic',
        _title_default: 'HuYeFen Admin',
      },
      {
        path: '/',
        redirect: '/dashboard',
        exact: true,
        _title: 'route.basic',
        _title_default: 'HuYeFen Admin',
      },
      {
        redirect: '/exception/404',
        exact: true,
        _title: 'route.basic',
        _title_default: 'HuYeFen Admin',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'HuYeFen Admin',
        _title_default: 'HuYeFen Admin',
      },
    ],
    _title: 'route.basic',
    _title_default: 'HuYeFen Admin',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: 'HuYeFen Admin',
    _title_default: 'HuYeFen Admin',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
