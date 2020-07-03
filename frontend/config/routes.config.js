export default [
    {
        path: '/auth',
        component: '../layouts/AuthLayout',
        title: 'route.auth',
        routes: [
            {
                path: '/auth/login',
                title: 'route.auth.login',
                component: 'Auth/Login'
            },
            {
                path: '/auth/register',
                title: 'route.auth.register',
                component: 'Auth/Register'
            },
            {
                redirect: '/auth/login'
            }
        ]
    },
    {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['./src/routes/Authenticated'],
        title: 'route.basic',
        routes: [
            {
                path: '/dashboard',
                title: 'route.dashboard',
                component: 'Dashboard'
            },
            {
                path: '/projects/:id',
                title: 'route.dashboard',
                component: 'Project'
            },
            {
                path: '/exception',
                routes: [
                    {
                        path: '/exception/404',
                        title: 'route.exception.404',
                        component: 'Exception/404'
                    },
                    {
                        path: '/exception/403',
                        title: 'route.exception.403',
                        component: 'Exception/403'
                    },
                    {
                        redirect: '/exception/404'
                    }
                ]
            },
            {
                path: '/',
                redirect: '/dashboard'
            },
            {
                redirect: '/exception/404'
            }
        ]
    }
]