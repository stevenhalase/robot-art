import Vue from 'vue';
import VueRouter from 'vue-router';
import Robots from '@/views/Robots.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/robots',
		name: 'robots',
		component: Robots
	},
	{
		path: '/results',
		name: 'results',
		component: Robots,
		props: { results: true }
	},
	{
		path: '/admin',
		name: 'admin',
		component: Robots,
		props: { admin: true }
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/register',
		name: 'register',
		component: Register
	},
	{
		path: '*',
		redirect: 'robots'
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	if ((to.name !== 'login' && to.name !== 'register') && !store.state.user) {
		next({ name: 'login' });
	} else {
		next();
	}
});

export default router;
