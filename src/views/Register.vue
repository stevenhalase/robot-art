<template>
	<div class="register">
		<div class="card">
			<img
				class="mr-logo"
				:src="MRLogoImg" />
			<div class="input-group">
				<label>Full Name</label>
				<input
					v-model="fullName"
					type="text" />
			</div>
			<div class="input-group">
				<label>Email</label>
				<input
					v-model="email"
					type="email" />
			</div>
			<div class="input-group">
				<label>Password</label>
				<input
					v-model="password"
					type="password" />
			</div>
			<button
				:disabled="!fullName.length || !email.length || !password.length"
				class="button"
				@click="register">Register</button>
			<button
				class="button button--secondary"
				@click="$router.push({ name: 'login' })">Back to Login</button>
		</div>
	</div>
</template>

<script>
import MRLogoImg from '@/assets/mr-logo.svg';
import RobotAPIService from '@/services/robot-api';

export default {
	name: 'register',
	data() {
		return {
			fullName: '',
			email: '',
			password: '',
			MRLogoImg
		}
	},
	methods: {
		async register() {
			this.$store.commit('SET_LOADING', { loading: true });
			try {
				const user = await RobotAPIService.register(this.fullName, this.email, this.password);
				this.$store.commit('SET_USER', { user });
				this.$store.commit('SET_MESSAGE', { message: `Welcome ${user.fullName}!` });
				this.$router.push({ name: 'robots' });
			} catch (error) {
				this.$store.commit('SET_MESSAGE', { message: 'Failed to Register', type: 'error' });
			}
			this.$store.commit('SET_LOADING', { loading: false });
		}
	}
}
</script>

<style lang="scss" scoped>
.register {
	padding-top: 17px;
	display: flex;
	justify-content: center;

	.card {
		padding: 80px 55px;
		width: 607px;

		.input-group {
			margin: 10px 0;

			&:first-of-type {
				margin-top: 80px;
			}

			&:last-of-type {
				margin-bottom: 20px;
			}
		}

		.mr-logo {
			width: 233px;
			height: 91px;
		}

		.button {
			width: 100%;
			margin-bottom: 16px;
		}
	}
}

@media (max-width: 768px) {
	.register {

		.card {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			.mr-logo {
				width: 165px;
				height: 65px;
			}

			.input-group {
				input {
					min-width: 327px;
					width: 327px;
				}
			}

			.button {
				padding: 16px 136px;
				width: 327px;
			}


		}
	}
}
</style>
