<template>
	<button
			:class="[
				type,
				loading ? 'loading' : '',
				depressed ? 'depressed' : '',
				ripple ? 'ripple' : '',
			]"
			:style="style"
			@click="!loading && $emit('click')"
	>
		<Icon v-if="loading" name="loading" rotate/>
		<slot v-else></slot>
	</button>
</template>

<script>
	export default {
		name: "Button",
		props:{
			type: {type: String, default: 'normal'}, // icon, outlined, fab, normal
			depressed: {type: Boolean, default: false},
			ripple: {type: Boolean, default: true },
			dark: {type: Boolean, default: false},
			color: {type: String},
			width: {type: String},
			height: {type: String},
			size: {type: String}, //only for fab and icon
			loading: {type: Boolean, default: () => false}
		},
		computed:{
			style(){
				const style = {};

				// Set button color
				if(this.type === 'outlined' || this.type === 'icon'){
					style.color = this.color;
				}else{
					style.backgroundColor = this.color;
					this.dark ? style.color = 'white' : undefined;
				}

				// Set button size
				style.height = this.height || 'auto';
				style.width = this.width || 'auto';
				if(this.type === 'icon' || this.type === 'fab' && this.size){
					style.height = style.width = this.size;
				}

				return style;
			}
		}
	}
</script>

<style scoped>
	button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-radius: 5px;
		border: none;
		padding: 0;
		margin: 0;
		text-decoration: none;
		background: transparent;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
		line-height: normal;
		outline: none;
		box-shadow: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		position: relative;
	}
	button:active { transform:scale(.97); }

	button.loading{ cursor: initial; }
	button:not(.depressed):not(.outlined){
		box-shadow: var(--color-line) 0px 3px 6px, var(--color-line) 0px 3px 6px;
	}

	/* Button types */
	button.icon, button.fab{
		border-radius: 100%;
		padding: 3px;
	}
	button.outlined{
		border-width: 1px;
		border-style: solid;
		padding: 8px 16px;
	}
	button.normal{
		padding: 8px 16px;
	}

	/* ripple on click */
	/*button.ripple {*/
		/*transition: background var(--animation-speed);*/
		/*background: radial-gradient(circle, transparent 1%, rgba(0, 0, 0, 0.1) 1%) center/15000%;*/
	/*}*/
	/*button.ripple:active {*/
		/*background-size: 100%;*/
		/*transition: background 0s;*/
	/*}*/
</style>