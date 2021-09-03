<template>
	<div id="table-footer">
		<div v-show="!loading" class="pagination">
			<label for="page-input">صفحه</label>
			<div>
				<input
						v-model="pageToGo"
						type="text"
						id="page-input"
						name="page-input"
						dir="ltr"
						:class="isPageValid ? '' : 'error'"
						@blur="page = pageToGo"
						@keyup.enter="page = pageToGo"
						@input="delayedPageUpdate()"
				/>
			</div>
			<span id="from-text">از {{totalPages}}</span>

		</div>
		<Icon id="loading-icon" v-show="loading" name="loading" size="36px" :color="themeColors.primary" rotate/>
	</div>
</template>

<script>
	export default {
		name: "TableFooter",
		props:{
			loading: {type: Boolean, default: false },
			value: {type: Number, required: true},
			totalPages: {type: Number, required: true},
		},
		data: function(){
			return {
				timeoutId: null,
				pageToGo: this.value,
			}
		},
		computed:{
			themeColors(){ return this.$store.getters.themeColors},
			isPageValid(){
				return (
					this.pageToGo &&
					parseInt(this.pageToGo) > 0 &&
					parseInt(this.pageToGo) <= this.totalPages &&
					parseInt(this.pageToGo) == parseFloat(this.pageToGo)
				)
			},
			page:{
				get(){
					return this.value;
				},
				set(val, old){
					this.timeoutId && clearTimeout(this.timeoutId);
					val = parseInt(val);
					old = parseInt(old);
					if(!this.isPageValid || val === old) return;
					this.$emit('input', val);
				}
			}
		},
		methods:{
			delayedPageUpdate(duration=700){
				this.timeoutId && clearTimeout(this.timeoutId);
				this.timeoutId = setTimeout(function(){
					this.page = this.pageToGo;
				}.bind(this), duration);
			},
		}
	}
</script>

<style scoped>
	/* footer pagination */
	#table-footer{
		text-align: center;
	}
	.pagination{
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
	}
	.pagination > *:not(:last-child){
		margin-inline-end: 12px;
	}
	#page-input{
		width: 70px;
		height: 32px;
		text-align: center;
		font-family: shabnam, Tahoma, sans-serif;
		font-size: 18px;
		outline: none;
		background-color: transparent;
		color: var(--color-text);
		border-style: solid;
		border-radius: 7px;
	}
	#page-input:not(.error){
		border-width: 1px;
		border-color: var(--color-text);
	}
	#page-input:not(.error):focus{
		border-width: 2px;
		border-color: var(--color-primary);
	}
	#page-input.error{
		border-width: 2px;
		border-color: var(--color-error);
	}
</style>