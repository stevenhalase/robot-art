<template>
	<div class="loader" />
</template>

<script>
export default {
	name: 'loader'
}
</script>

<style lang="scss" scoped>
.loader {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.4);
	z-index: 20;
	

	&:after {
		content: '';
		background: rgba(0,0,0,0.4);
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 10px;
		z-index: 19;
		animation: animation-width-ltr 3s infinite;
	}
}

@keyframes animation-width-ltr {
	0%,
	100% {
		width: 0;
	}

	50% {
		width: 100%;
	}
}
</style>
