import Vue from 'vue'
import Router from 'vue-router'

// 引入页面组件
import Index from '@/views/index'
import Login from '@/views/login'
import Register from '@/views/register'

import UserManagement from '@/components/UserManagement.vue'
import ArticleManagement from '@/components/ArticleManagement.vue'
import CommentManagement from '@/components/CommentManagement.vue'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        redirect: '/user', // 默认重定向到 /user
        children: [
            {
                path: '/user',
                name: 'UserManagement',
                component: UserManagement
            },
            {
                path: 'articles',
                name: 'ArticleManagement',
                component: ArticleManagement
            },
            {
                path: 'comments',
                name: 'CommentManagement',
                component: CommentManagement
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

const router = new Router({
    mode: 'history', // 使用 history 模式
    base: process.env.BASE_URL, // eslint-disable-next-line no-undef
    routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
    // 获取本地存储的 token
    const token = localStorage.getItem('token');
    console.log(token);
    // 如果没有 token 且访问的不是登录页，重定向到登录页面
    if (!token && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});



export default router
