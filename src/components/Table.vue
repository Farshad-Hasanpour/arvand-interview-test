<template>
	<div>
		<template v-if="smAndDown">
			<transition-group id="card-view" tag="div" name="table-fade">
				<div class="item-card" v-for="item in items" :key="item.id">
					<div class="item-info" v-for="(header, property) in headers" :key="property">
						<span class="title">{{header.title}}: </span>
						<span class="value" :dir="header.dir">{{item[property]}}</span>
					</div>
					<div class="actions" v-if="actions">
						<label class="checkbox-option">
							<input
									:ref="`checkbox-${item.id}`"
									v-model="selected"
									type="checkbox"
									:value="item.id"
									class="checkbox-input"
							>
							<span class="checkbox"></span>
						</label>
						<Button
								v-for="(button, index) in actions"
								:key="index"
								type="icon"
								depressed
								height="32px"
								:color="button.color"
								:title="button.title"
								:loading="button.loadingProperty ? item[button.loadingProperty] : undefined"
								@click="$emit(button.event, item.id)"
						>
							<Icon :name="button.icon"/>
						</Button>
					</div>
				</div>
			</transition-group>
		</template>
		<table v-else>
			<thead>
				<tr>
					<th v-if="selectable">انتخاب</th>
					<th v-for="(header, property) in headers" :key="property">{{header.title}}</th>
					<th v-if="actions">عملیات‌ها</th>
				</tr>
			</thead>
			<tr v-show="loading" class="loading">
				<td :colspan="numberOfColumns">
					<Icon name="loading" size="36px" :color="themeColors.primary" rotate/>
				</td>
			</tr>
			<transition-group tag="tbody" name="table-fade">
				<tr v-for="item in items" :key="item.id">
					<td v-if="selectable">
						<label class="checkbox-option">
							<input
									:ref="`checkbox-${item.id}`"
									v-model="selected"
									type="checkbox"
									:value="item.id"
									class="checkbox-input"
							>
							<span class="checkbox"></span>
						</label>
					</td>
					<td v-for="(header, property) in headers" :key="property" :dir="header.dir">{{item[property]}}</td>
					<td v-if="actions">
						<div class="actions">
							<Button
									v-for="(button, index) in actions"
									:key="index"
									type="icon"
									depressed
									height="32px"
									:color="button.color"
									:title="button.title"
									:loading="button.loadingProperty ? item[button.loadingProperty] : undefined"
									@click="$emit(button.event, item.id)"
							>
								<Icon :name="button.icon"/>
							</Button>
						</div>
					</td>
				</tr>
			</transition-group>
		</table>
	</div>
</template>

<script>
	export default {
		name: "Table",
		props:{
			loading:{required: true, type: Boolean},
			items:{required: true, type: Array},
			headers:{required: true, type: Object},
			selectable:{type: Boolean, default: () => false},
			maxSelectCount:{type: Number},
			value:{type: Array, default: () => []},
			actions:{type: Object, default: () => undefined}
		},
		data: function(){
			return {

			}
		},
		computed:{
			selected:{
				get(){
					return this.value;
				},
				set(val){
					if(this.maxSelectCount && val.length > this.maxSelectCount){
						const lastId = val[val.length - 1];
						this.$refs['checkbox-'+lastId][0].checked = false;
						const message = `حداکثر می توانید ${this.maxSelectCount} ردیف انتخاب کنید.`;
						this.$store.dispatch('showMessage', {messageType: 'error', message});
						return;
					}
					this.$emit('input', val);
				}
			},
			themeColors(){ return this.$store.getters.themeColors},
			numberOfColumns(){
				let result = Object.keys(this.headers).length;
				if(this.selectable) result++;
				if(this.actions) result++;
				return result;
			},
			smAndDown(){
				return this.$store.getters.smAndDown;
			}
		},
		methods:{

		}
	}
</script>

<style scoped>

	table{
		border-collapse: collapse;
		width: 100%;
	}

	td, th{
		text-align: center;
		padding: 10px 10px;
	}
	tr:not(.loading){
		border-bottom: 1px solid var(--color-line);
	}
	.actions{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.item-card .actions{
		justify-content: flex-end;
	}
	.actions > *:not(:last-child){
		margin-inline-end: 7px;
	}

	input[type="checkbox"]{
		cursor: pointer;
	}

	tr.loading td{
		padding: 16px 0;
	}

	#card-view{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: start;
		align-items: center;
	}

	.item-card{
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: stretch;
		width: 100%;
		border-bottom: 1px solid var(--color-line);
		padding: 16px 16px;
	}

	.item-info{margin-bottom: 5px;}
	.item-info .title{ font-weight: bold; }

	/* custom checkbox */
	.checkbox-option{
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.checkbox-input{display: none;}
	.checkbox{
		position: relative;
		width: 22px;
		height: 22px;
		border: 2px solid var(--color-line);
		background-color: white;
	}
	.checkbox:after {
		content: "";
		position: absolute;
		display: none;
		left: 5px;
		top: 2px;
		width: 5px;
		height: 8px;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}
	input.checkbox-input:checked ~ .checkbox:after {display: block;}
	input.checkbox-input:checked ~ .checkbox{ background-color: var(--color-primary); }

	/* animation */
	.table-fade-enter-active, .table-fade-leave-active {
		transition: opacity .3s;
	}
	.table-fade-enter, .table-fade-leave-to {
		opacity: 0;
	}
	.table-fade-move{
		transition: transform .3s;
	}

</style>