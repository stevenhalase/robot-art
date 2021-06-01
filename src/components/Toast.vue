<template>
	<div :class="['toast', message.type]">
		{{ message.message }}
	</div>
</template>

<script>
export default {
	name: 'toast',
	props: {
		message: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.toast {
	position: fixed;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	justify-content: center;
	padding: 16px 216px;
	background: $gray3;
	border: 2px solid $gray3;
	border-radius: 8px;
	font-family: $font-family;
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 21px;
	color: $white;
	text-align: center;
	white-space: nowrap;
	z-index: 30;

	&.error {
		background: $red0;
		border: 2px solid $red0;
	}
}

@media (max-width: 780px) {
	.toast {
		padding: 16px 25px;
	}
}
</style>
