<template>
	<div class="robots-list">
		<robot-upload-card
			v-if="view === VIEWS.ADMIN"
			@updateRobots="handleUpdateRobots" />
		<template v-for="(robot, index) of robots">
			<robot-card
				:key="index"
				:robot="robot"
				:totalVotes="totalVotes"
				:showVotes="view === VIEWS.RESULTS"
				:admin="view === VIEWS.ADMIN"
				@updateRobots="handleUpdateRobots" />
		</template>
	</div>
</template>

<script>
import RobotUploadCard from '@/components/RobotUploadCard';
import RobotCard from '@/components/RobotCard';
import RobotAPIService from '@/services/robot-api';
import { mapState } from 'vuex';

const VIEWS = {
	VOTE: 'vote',
	RESULTS: 'results',
	ADMIN: 'admin'
};

export default {
	name: 'robots-list',
	components: {
		RobotUploadCard,
		RobotCard
	},
	props: {
		view: {
			type: String,
			default: VIEWS.VOTE
		}
	},
	data() {
		return {
			robots: [],
			VIEWS
		}
	},
	mounted() {
		this.loadRobots();
	},
	computed: {
		...mapState({
			user: state => state.user
		}),
		totalVotes() {
			return this.robots ? this.robots.reduce((total, robot) => total + robot.votes.length, 0) : 0;
		}
	},
	methods: {
		async loadRobots() {
			this.$store.commit('SET_LOADING', { loading: true });
			try {
				this.robots = await RobotAPIService.getRobots(this.user.authToken);
			} catch (error) {
				this.$store.commit('SET_MESSAGE', { message: 'Failed to load robots', type: 'error' });
			}
			this.$store.commit('SET_LOADING', { loading: false });
		},
		handleUpdateRobots() {
			this.loadRobots();
		}
	}
}
</script>

<style lang="scss" scoped>
.robots-list {
	display: flex;
	flex-wrap: wrap;
}
</style>
