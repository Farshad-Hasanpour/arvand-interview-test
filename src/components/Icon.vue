<template>
	<i :class="['mdi-set', `mdi-${name}`, rotate ? 'rotate' : '', inverse ? 'inverse' : '']" :style="{color, fontSize: size}"></i>
</template>

<script>
	export default {
		name: "Icon",
		props:{
			name: {type: String, required: true},
			size: {type: String, default: () => '24px'},
			color: {type: String, default: () => undefined},
			rotate: {type: Boolean, default: () => false},
			inverse: {type: Boolean, default: () => false}
		}
	}
</script>

<style scoped>
	@keyframes rotating {
		from{
			transform: rotate(0deg);
		}
		to{
			transform: rotate(360deg);
		}
	}

	i.rotate{
		animation: rotating .7s linear infinite;
	}

	i.inverse{
		transform: rotate(180deg);
	}
</style>