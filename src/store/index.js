import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		loading: false,
		messages: []
	},
	mutations: {
		SET_USER(state, payload) {
			state.user = payload.user;
			localStorage.setItem('ra_u', JSON.stringify(payload.user));
		},
		SET_LOADING(state, payload) {
			state.loading = payload.loading;
		},
		SET_MESSAGE(state, payload) {
			state.messages.push(payload);
			setTimeout(() => {
				state.messages.shift();
			}, 2000);
		}
	},
	actions: {
		CHECK_LOCAL_USER({ commit }) {
			const user = JSON.parse(localStorage.getItem('ra_u'));
			if (user) {
				const expire = new Date(user.authTokenExpire);
				if (new Date() < expire) {
					commit('SET_USER', { user });
				} else {
					localStorage.removeItem('ra_u');
				}
			}
		}
	},
	modules: {
	}
})
