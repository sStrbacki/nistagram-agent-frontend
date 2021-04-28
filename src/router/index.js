import Vue from 'vue'
import VueRouter from 'vue-router'
import { getRole } from '../helpers/roles'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/guest/GuestPage.vue'),
	meta: { unauthorized: true },
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
	meta: { requiresUserAuth: true },
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
	meta: { requiresAdminAuth: true },
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

router.beforeEach((to, from, next) => {
	const role = getRole()

	if(to.matched.some( record => record.meta.unauthorized )){
		if(role !== null){
			switch(role){
				case 'ROLE_ADMIN':
					next({ name: 'Products'})
					break;
				case 'ROLE_USER':
					next({ name: 'Catalog'})
					break;
			}
		}
		else next();
	}

	else if(to.matched.some(record => record.meta.requiresUserAuth)){
		switch(role){
			case 'ROLE_ADMIN':
				next({ name: 'Products'})
				break;
			case null:
				next({ name: 'Login' })
				break;
			case 'ROLE_USER':
				next()
				break;

		}
	}

	else if(to.matched.some(record => record.meta.requiresAdminAuth)){
		switch(role){
			case 'ROLE_USER':
				next({ name: 'Catalog'})
				break;
			case null:
				next({ name: 'Login' })
				break;
			case 'ROLE_ADMIN':
				next()
				break;

		}
	}
	else next()
	

})

export default router
