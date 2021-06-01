<template>
	<div class="robot-upload-card card">
		<h3>Add Robot</h3>
		<div class="input-group">
			<label>Name</label>
			<input
				v-model="newRobot.name"
				type="text" />
		</div>
		<div
			class="input-group image-upload"
			@click="triggerImageUpload">
			<img
				class="upload-img"
				:src="UploadImg" />
			<span>Select image to upload</span>
			<input
				ref="fileUpload"
				class="file-upload"
				type="file"
				@change="handleImageSelection" />
		</div>
		<div class="actions">
			<button
				class="button button--text"
				@click="clearForm">Clear</button>
			<button
				:disabled="!newRobot.name || !newRobot.file"
				class="button"
				@click="createNewRobot">Add Robot</button>
		</div>
	</div>
</template>

<script>
import UploadImg from '@/assets/upload.svg';
import RobotAPIService from '@/services/robot-api';
import { mapState } from 'vuex';

export default {
	name: 'robot-upload-card',
	data() {
		return {
			newRobot: {
				name: '',
				file: null
			},
			UploadImg
		}
	},
	computed: {
		...mapState({
			user: state => state.user
		})
	},
	methods: {
		triggerImageUpload() {
			this.$refs.fileUpload.click();
		},
		handleImageSelection(e) {
			const selectedFile = e.target.files[0];
			if (selectedFile.type.includes('image/')) {
				this.newRobot.file = selectedFile;
			} else {
				this.$store.commit('SET_MESSAGE', { message: 'Only image files are allowed', type: 'error' });
			}
		},
		async createNewRobot() {
			this.$store.commit('SET_LOADING', { loading: true });
			try {
				const newRobot = await RobotAPIService.createRobot(this.user.authToken, this.newRobot.name, this.newRobot.file);
				this.$store.commit('SET_MESSAGE', { message: `Created ${newRobot.name}!` });
				this.clearForm();
				this.$emit('updateRobots');
			} catch (error) {
				this.$store.commit('SET_MESSAGE', { message: 'Failed to create robot', type: 'error' });
			}
			this.$store.commit('SET_LOADING', { loading: false });
		},
		clearForm() {
			this.newRobot.name = '';
			this.newRobot.file = null;
		}
	}
}
</script>

<style lang="scss" scoped>
.robot-upload-card {
	width: 397px;
	padding: 20px 24px 24px;
	margin: 22px 12px;

	h3 {
		margin: 0;
	}

	img {
		margin: 20px 0 36px;
	}

	.input-group {
		width: 349px;
		margin-top: 30px;

		input {
			width: 349px;
			min-width: 349px;
		}

		&.image-upload {
			background: #ECEEF0;
			border: 2px dashed $gray2;
			box-sizing: border-box;
			border-radius: 8px;
			padding: 69px;
			margin-top: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.upload-img {
				width: 21px;
				height: 21px;
			}

			span {
				font-family: $font-family;
				font-style: normal;
				font-weight: normal;
				font-size: 20px;
				line-height: 23px;
				text-align: center;
				color: $gray3;
			}

			.file-upload {
				display: none;
			}

			&:hover {
				cursor: pointer;
			}
		}
	}

	.actions {
		display: flex;
		justify-content: space-between;
		padding: 24px 0 0;
		width: 100%;

		.button {
			padding: 16px 55px;
		}

		.button--text {
			padding: 10px;
		}
	}
}

@media (max-width: 900px) {
	.robot-upload-card {
		width: 344px;
		padding: 40px 24px 24px;
		margin: 4px;

		.input-group {
			width: 311px;
			input {
				width: 311px;
				min-width: 311px;
			}
		}

		.actions {
			.button {
				padding: 16px 45px;
			}
			.button--text {
				padding: 10px;
			}
		}
	}
}
</style>
