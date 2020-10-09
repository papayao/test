import Vue from 'vue'
import VueRouter from 'vue-router';
// 引入路由
import Login from '../components/Login.vue'
import Index from '../components/Index.vue'
// import router from '../../../../vue/src/router';
import { api_token } from '../apis/apis';
Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        // 一级路由
        // 登录
        { path: '/', name: 'Login', component: Login },
        // 首页
        {
            path: '/index', name: 'Login', component: Index, children: [
                { path: '/main/', name: 'main', component: () => import('../components/index/Main.vue') },
                { path: '/order/', name: 'Order', component: () => import('../components/index/Order.vue') },
                { path: '/proList', name: 'ProList', component: () => import('../components/index/ProList.vue') },
                { path: '/proAdd', name: 'proAdd', component: () => import('../components/index/proAdd.vue') },
                { path: '/proSort', name: 'proSort', component: () => import('../components/index/proSort.vue') },
                { path: '/shopMana', name: 'shopMana', component: () => import('../components/index/shopMana.vue') },
                { path: '/acAdd', name: 'acAdd', component: () => import('../components/index/acAdd.vue') },
                { path: '/pwdChange', name: 'pwdChange', component: () => import('../components/index/pwdChange.vue') },
                { path: '/acList', name: 'acList', component: () => import('../components/index/acList.vue') },
                { path: '/userInfo', name: 'userInfo', component: () => import('../components/index/UserInfo.vue') },
                { path: '/orderStat', name: 'orderStat', component: () => import('../components/index/orderStat.vue') },
            ]
        },



    ]
});
router.beforeEach((to, from, next) => {
    // console.log(to) //要去哪里，目标对象
    // console.log(from) //从哪里来， 之前对象
    from
    if (to.path != '/') {
        api_token({ params: { token: localStorage.token } }).then(res => {

            //已经登录过了，并在登录状态，放行
            if (res.data.code == 0)
                next()
            else {
                console.log('非法访问')
                // alert('报警了！！！非法访问！！！！！！！')
                next('/') //如果没有登录则跳转到登录页面
            }
        })
    } else
        next()
})
//设置完后暴露路由
export default router