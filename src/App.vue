<template>
	<div id="app-wrapper" :rtl="$store.state.rtl" :theme="$store.state.themeName">
		<div id="app">
			<Snackbar/>
			<header>
				<Button class="setting-button" type="fab" dark size="36px" ripple="" :color="themeColors.primary" title="تغییر قالب" @click="$store.dispatch('switchTheme')">
					<Icon name="brightness-4"/>
				</Button>
				<Button class="setting-button" type="fab" dark size="36px" ripple="" :color="themeColors.primary" title="تغییر جهت" @click="$store.dispatch('switchDirection')">
					<Icon name="translate"/>
				</Button>
			</header>
			<main>
				<router-view/>
			</main>
		</div>
	</div>
</template>

<script>
	const Snackbar = () => import('@/components/Snackbar');
	export default {
		components:{Snackbar},
		computed:{
			themeColors(){ return this.$store.getters.themeColors },
		}
	}
</script>

<style>
	@import '../node_modules/@mdi/font/css/materialdesignicons.min.css';

	@font-face{
		font-family: shabnam;
		src: url('./assets/fonts/shabnam/Shabnam-FD.eot');
		src: url('./assets/fonts/shabnam/Shabnam-FD.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/shabnam/Shabnam-FD.woff') format('woff'),
		url('./assets/fonts/shabnam/Shabnam-FD.ttf') format('truetype');
		font-weight: normal;
	}

	:root{
		--breakpoint-mobile: 600px;
		--breakpoint-small-tablet: 960px;
		--breakpoint-large-tablet: 1264px;
		--breakpoint-desktop: 1904px;
		--animation-speed: 0.5s;
	}
	#app-wrapper[theme="light"]{
		--color-primary: #1A237E;
		--color-secondary: #F1F2F6;
		--color-success: #4ab190;
		--color-error: #ef3d59;
		--color-text: #2c3e50;
		--color-card-back: #FFF;
		--color-line: rgba(0, 0, 0, .1);
	}
	#app-wrapper[theme="dark"]{
		--color-primary: #7286ed;
		--color-secondary: #171C21;
		--color-success: #4ab190;
		--color-error: #ef3d59;
		--color-text: #FFF;
		--color-card-back: #2F3841;
		--color-line: rgba(255, 255, 255, .1);
	}
	#app-wrapper{
		font-family: Shabnam, Tahoma, Arial, sans-serif;
		position: fixed;
		height: 100%;
		width: 100%;
		scroll-behavior: smooth;
		overflow-y: auto;
		color: var(--color-text);
		background-color: var(--color-secondary);
	}
	#app-wrapper[rtl] #app{
		direction: rtl;
		text-align: right;
	}
	#app { height: 100%;}

	/*** Style Reset ***/
	*{ box-sizing: border-box;}
	body{ margin: 0; padding: 0; }
	ul, li{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	a{ text-decoration: none; }
	main{ padding: 20px 20px; }
	section{ margin-bottom: 16px; }
	header{
		height: 48px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding: 0 25px;
	}
	label{ user-select: none; }

	/*** Chrome Scroll ***/
	::-webkit-scrollbar {
		width: 12px;
		background: var(--color-secondary);
	}
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 8px rgba(0,0,0,0.5);
	}
	::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb:hover{
		background-color: #666;
	}

	/*** Global Styles ***/
	.section-header{
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
	}
	.section-header > *:not(:last-child){
		margin-inline-end: 20px;
	}

	header > .setting-button:not(:first-child){
		margin-inline-start: 15px;
	}
</style>
