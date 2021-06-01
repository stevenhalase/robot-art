<template>
	<div class="robots">
		<h1>Robots</h1>
		<robots-list :view="view" />
	</div>
</template>

<script>
import RobotsList from '@/components/RobotsList';

export default {
	name: 'robots',
	components: {
		RobotsList
	},
	props: {
		results: {
			type: Boolean,
			default: false
		},
		admin: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		view() {
			let view = 'vote';
			if (this.results) {
				view = 'results';
			} else if (this.admin) {
				view = 'admin';
			}
			return view;
		}
	}
}
</script>

<style lang="scss" scoped>
.robots {
	padding: 29px 100px;

	h1 {
		color: $gray3;
	}
}

@media (max-width: 1480px) {
	.robots {
		padding: 29px 28px;
	}
}

@media (max-width: 375px) {
	.robots {
		padding: 29px 4px;

		h1 {
			margin-left: 28px;
		}
	}
}
</style>
