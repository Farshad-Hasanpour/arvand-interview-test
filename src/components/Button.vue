<template>
	<div
			id="button"
			:class="[
				type, loading? 'loading' : '',
				depressed ? 'depressed' : '',
				ripple ? 'ripple' : '',
			]"
			:style="style"
			@click="!loading && $emit('click')"
	>
		<Icon v-if="loading" name="loading" rotate/>
		<slot v-else></slot>
	</div>
</template>

<script>
	export default {
		name: "Button",
		props:{
			type: {required: true, type: String}, // icon or outlined
			depressed: {type: Boolean, default: () => false},
			ripple: {type: Boolean, default: () => true},
			dark: {type: Boolean, default: () => false},
			color: {type: String},
			width: {type: String},
			height: {type: String},
			loading: {type: Boolean, default: () => false}
		},
		computed:{
			themeColors(){ return this.$store.getters.themeColors},
			style(){
				const style = {};
				// Set button color
				if(this.type === 'outlined' || this.type === 'icon'){
					style.color = this.color;
				}else{
					style.background = this.color;
					this.dark ? style.color = 'white' : undefined;
				}
				// Set button size
				style.height = this.height || 'auto';
				style.width = (this.type === 'icon' || this.type === 'fab') ?  style.height : this.width || 'auto';

				return style;
			}
		}
	}
</script>

<style scoped>
	#button{
		display: inline-flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border-radius: 5px;
	}
	#button.loading{ cursor: initial; }
	#button:not(.depressed):not(.outlined){
		box-shadow: var(--color-line) 0px 3px 6px, var(--color-line) 0px 3px 6px;
	}

	/* Button types */
	#button.icon, #button.fab{ border-radius: 100%; }
	#button.outlined{
		border-width: 1px;
		border-style: solid;
		padding: 8px 16px;
	}

	/* ripple on click */
	.ripple {
		transition: background var(--animation-speed);
		background: radial-gradient(circle, transparent 1%, rgba(0, 0, 0, 0.1) 1%) center/15000%;
	}
	.ripple:active {
		background-size: 100%;
		transition: background 0s;
	}
</style>