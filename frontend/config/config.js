/* eslint-disable  global-require */
// https://umijs.org/config/
import os from 'os';
import pageRoutes from './routes.config';
import theme from './theme.config';

let defaultDefine = {};
defaultDefine = require(`./env.${process.env.APP_TYPE || 'dev'}`);
const plugins = [
    [
        'umi-plugin-react',
        {
            antd: true,
            dva: {
                hmr: true,
            },
            targets: {
                ie: 11,
            },
            locale: {
                enable: true, // default false
                default: 'en-US', // default en-US
                baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
            },
            dynamicImport: {
                webpackChunkName: true,
                loadingComponent: './components/PageLoading/index',
            },
            routes: {
                exclude: [
                    /models\//,
                    /services\//,
                    /model\.(t|j)sx?$/,
                    /service\.(t|j)sx?$/,
                    /components\//,
                ],
            },
            title: {
                defaultTitle: 'HuYeFen Admin',
                useLocale: true,
                format: '{current}{separator}{parent}'
            },
            ...(!process.env.TEST && os.platform() === 'darwin'
                ? {
                    dll: {
                        include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
                        exclude: ['@babel/runtime'],
                    }
                }
                : {}),
        },
    ],
];

export default {
    // add for transfer to umi
    plugins,
    targets: {
        ie: 11,
    },
    publicPath: '/',
    define: {
        APP_TYPE: process.env.APP_TYPE || '',
        ...defaultDefine,
    },
    // Routing configuration
    routes: pageRoutes,
    // Theme for antd
    // https://ant.design/docs/react/customize-theme-cn
    theme,
    lessLoaderOptions: {
        javascriptEnabled: true,
    },
    disableRedirectHoist: true,
    cssLoaderOptions: {
        modules: true,
        getLocalIdent: (context, localIdentName, localName) => {
            if (
                context.resourcePath.includes('node_modules') ||
                context.resourcePath.includes('ant.design.pro.less') ||
                context.resourcePath.includes('ant.design.less') ||
                context.resourcePath.includes('global.less')
            ) {
                return localName;
            }
            const match = context.resourcePath.match(/src(.*)/);
            if (match && match[1]) {
                const antdProPath = match[1].replace('.less', '');
                const arr = antdProPath
                .split('/')
                .map(a => a.replace(/([A-Z])/g, '-$1'))
                .map(a => a.toLowerCase());
                return `huyefen-trolle-${arr.join('-')}-${localName}`.replace(/--/g, '-');
            }
            return localName;
        },
    },
    manifest: {
        basePath: '/',
    },
    urlLoaderExcludes: [/\.svg$/],
    chainWebpack: (config) => {
        config.module
            .rule('svg-with-file')
            .test(/.svg$/)
            .use('svg-with-file-loader')
            .loader('file-loader');
    },
    treeShaking: true
};