<template>
	<div id="app">
		<template v-for="(message, index) of messages">
			<toast
				:key="index"
				:message="message" />
		</template>
		<navigation v-if="shouldShowNav" />
		<div class="view">
			<loader v-if="loading" />
			<router-view/>
		</div>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Toast from '@/components/Toast';
import Loader from '@/components/Loader';
import { mapState } from 'vuex';

export default {
	name: 'app',
	components: {
		Navigation,
		Toast,
		Loader
	},
	computed: {
		...mapState({
			messages: state => state.messages,
			loading: state => state.loading
		}),
		shouldShowNav() {
			let show = false;
			const navlessRoutes = ['login', 'register'];
			if (!navlessRoutes.some(r => r === this.$route.name)) {
				show = true;
			}
			return show;
		}
	}
}
</script>

<style lang="scss">
#app {
	position: relative;
	background: $gray0;
	min-height: 100vh;
	width: 100vw;

	.view {
		padding-top: 80px;
	}
}
</style>
