import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/guest/GuestPage.vue'),
    children: [
		{
			path: '/',
			name: 'Login',
			component: () => import('../views/guest/Login.vue')
		},
		{
			path: '/sign-up',
			name: 'SignUp',
			component: () => import('../views/guest/SignUp.vue')
		},
		{
			path: '/forgot-password',
			name: 'ForgotPassword',
			component: () => import('../views/guest/ForgotPassword')
		},
		{
			path: '/password-reset/:uuid&:ruuid',
			name: 'PasswordReset',
			props: true,
			component: () => import('../views/guest/PasswordReset')
		},
    ]
  },
  {
    path: '/user',
    component: () => import('../views/user/UserPage.vue'),
    children: [
		{
			path: '/',
			name: 'Catalog',
			component: () => import('../views/user/Catalog.vue')
		},
		{
			path: 'shopping-cart',
			name: 'ShoppingCart',
			component: () => import('../views/user/ShoppingCart.vue')
		}
    ]
  },
  {
	path:'/agent',
	component: () => import('../views/agent/AgentPage.vue'),
	children: [
		{
			path: '/',
			name: 'Products',
			component: () => import('../views/agent/Products.vue')
		},
	]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
