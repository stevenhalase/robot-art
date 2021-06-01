<template>
	<div class="robot-card card">
		<h3>{{ robot.name }}</h3>
		<div class="image-container">
			<img :src="`data:${robot.image.contentType};base64,${robot.image.data}`" />
		</div>
		<div
			v-if="admin"
			class="actions">
			<button class="button">Edit</button>
			<button
				class="button button--secondary"
				@click="deleteRobot">Delete</button>
		</div>
		<div
			v-else-if="showVotes"
			class="votes">
			<span>
				<span class="count">{{ robot.votes.length }}</span>/{{ totalVotes }}
			</span>
			<div class="vote-graph">
				<div
					:style="{ width: `${votePercent}%` }"
					class="vote-indicator" />
			</div>
		</div>
		<div
			v-else
			class="actions">
			<button
				:disabled="userVotedForRobot"
				class="button"
				@click="vote">
				{{ userVotedForRobot ? 'Vote Cast' : 'Vote' }}	
			</button>
		</div>
	</div>
</template>

<script>
import RobotAPIService from '@/services/robot-api';
import { mapState } from 'vuex';

export default {
	name: 'robot-card',
	props: {
		robot: {
			type: Object,
			required: true
		},
		admin: {
			type: Boolean,
			default: false
		},
		showVotes: {
			type: Boolean,
			default: false
		},
		totalVotes: {
			type: Number,
			default: 0
		}
	},
	computed: {
		...mapState({
			user: state => state.user
		}),
		userVotedForRobot() {
			return this.robot && this.robot.votes.find(v => v === this.user._id);
		},
		votePercent() {
			return this.robot.votes.length ? (this.robot.votes.length / this.totalVotes) * 100 : 0;
		}
	},
	methods: {
		async vote() {
			this.$store.commit('SET_LOADING', { loading: true });
			try {
				const robot = await RobotAPIService.castVote(this.user.authToken, this.robot._id);
				this.$store.commit('SET_MESSAGE', { message: `Voted for ${robot.name}!` });
				this.$emit('updateRobots');
			} catch (error) {
				this.$store.commit('SET_MESSAGE', { message: 'Failed to cast vote', type: 'error' });
			}
			this.$store.commit('SET_LOADING', { loading: false });
		},
		async deleteRobot() {
			this.$store.commit('SET_LOADING', { loading: true });
			try {
				await RobotAPIService.deleteRobot(this.user.authToken, this.robot._id);
				this.$store.commit('SET_MESSAGE', { message: `Deleted ${this.robot.name}!` });
				this.$emit('updateRobots');
			} catch (error) {
				this.$store.commit('SET_MESSAGE', { message: 'Failed to delete robot', type: 'error' });
			}
			this.$store.commit('SET_LOADING', { loading: false });
		}
	}
}
</script>

<style lang="scss" scoped>
.robot-card {
	width: 397px;
	padding: 40px 24px 24px;
	margin: 22px 12px;

	h3 {
		margin: 0;
	}

	.image-container {
		margin: 20px 0 36px;
		flex-grow: 1;

		img {
			width: 349px;
		}
	}

	.votes {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		position: relative;

		span {
			font-family: $font-family;
			font-style: normal;
			font-weight: bold;
			font-size: 22px;
			line-height: 25px;
			color: $gray2;
			text-align: center;

			.count {
				font-size: 40px;
				line-height: 46px;
				color: $gray3;
			}
		}

		.vote-graph {
			position: relative;
			border: 2px solid $gray1;
			box-sizing: border-box;
			border-radius: 8px;
			width: 100%;
			padding: 2px;

			.vote-indicator {
				width: 0;
				height: 26px;
				background: $gray3;
				border-radius: 5px;
			}
		}
	}

	.actions {
		display: flex;
		justify-content: center;
		padding: 24px 0 0;
		width: 100%;

		.button {
			padding: 16px 55px;

			&:first-of-type {
				margin-right: 16px;
			}
		}
	}
}

@media (max-width: 900px) {
	.robot-card {
		width: 344px;
		padding: 40px 24px 24px;
		margin: 4px;

		.image-container {
			img {
				width: 311px;
			}
		}

		.actions {
			.button {
				padding: 16px 45px;
			}
		}
	}
}
</style>
