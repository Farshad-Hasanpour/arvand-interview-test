<template>
	<div v-if="smAndDown">
		<div
				class="item-card"
				v-for="item in pageItems"
				:key="item.id"
				@click="$emit('rowClick', $utility.copyObj(item))"
				:class="clickableRows ? 'clickable' : ''"
		>
			<div class="item-info" v-for="(header, property) in headers" :key="property">
				<span class="title">{{header.title}}: </span>
				<span class="value" :dir="header.dir">{{item[property]}}</span>
			</div>
			<div class="actions" v-if="actions">
				<label class="checkbox-option" v-if="selectable">
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
						:size="actionSize"
						:color="button.color"
						:title="button.title"
						:loading="button.loadingProperty ? item[button.loadingProperty] : undefined"
						@click.stop="$emit(button.event, item.id)"
				>
					<Icon :name="button.icon"/>
				</Button>
			</div>
		</div>
		<TableFooter v-model="page" :loading="isLoading" :total-pages="totalPages" style="margin-top: 16px;" />
	</div>
	<table v-else>
		<colgroup dir="ltr">
			<col v-if="selectable"/>
			<col v-for="(header, property) in headers" :key="property" :width="header.width || 'auto'"/>
			<col v-if="actions"/>
		</colgroup>

		<thead>
			<tr>
				<th v-if="selectable">انتخاب</th>
				<th
						v-for="(header, property) in headers"
						:key="property"
						:class="[
							header.sortable ? 'sortable' : '',
							sorting.property === property ? 'active' : ''
						]"
						@click="header.sortable ? sort(property) : undefined"
				>
					<div class="table-header-content">
						<span style="margin-inline-end: 5px;">{{header.title}}</span>
						<Icon
								v-if="header.sortable"
								size="16px"
								name="arrow-down"
								:inverse="sorting.property === property && sorting.desc"
						/>
					</div>
				</th>
				<th v-if="actions">عملیات‌ها</th>
			</tr>
		</thead>

		<tbody>
			<tr
					v-for="item in pageItems"
					:key="item.id"
					@click="$emit('rowClick', $utility.copyObj(item))"
					:class="clickableRows ? 'clickable' : ''"
			>
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
								:size="actionSize"
								:color="button.color"
								:title="button.title"
								:loading="button.loadingProperty ? item[button.loadingProperty] : undefined"
								@click.stop="$emit(button.event, item.id)"
						>
							<Icon :name="button.icon"/>
						</Button>
					</div>
				</td>
			</tr>
		</tbody>

		<tfoot>
			<tr class="footer">
				<td :colspan="numberOfColumns">
					<TableFooter v-model="page" :loading="isLoading" :total-pages="totalPages" />
				</td>
			</tr>
		</tfoot>
	</table>
</template>

<script>
	import TableFooter from './TableFooter';

	export default {
		name: "Table",
		components: {TableFooter, },
		props:{
			fetching: {required: true, type: Boolean},
			items: {required: true, type: Array},
			headers: {required: true, type: Object},
			selectable: {type: Boolean, default: () => false},
			maxSelectCount: {type: Number},
			value: {type: Array, default: () => []},
			actions: {type: Object, default: () => undefined},
			perPage: {type: Number, default: 0},
			clickableRows: {type: Boolean, default: false},
		},
		watch:{
			items(){
				this.changeOrder(this.sorting.property, this.sorting.desc);
			}
		},
		data: function(){
			const d = {
				actionSize: '32px',
				page: 1,
				sortedItems: this.$utility.copyObj(this.items),
				sorting: {
					property: null,
					desc: false,
				}
			};
			return d;
		},
		computed:{
			isLoading(){
				return this.fetching;
			},
			pageItems(){
				if(!this.perPage) return this.sortedItems;
				return this.sortedItems.slice((this.page-1) * this.perPage, this.page * this.perPage + 1)
			},
			totalPages(){
				if(!this.perPage || !this.items.length) return 1;
				return Math.ceil(this.items.length / this.perPage);
			},
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
			sort(property){
				// change sorting status
				if(this.sorting.property === property){
					if(!this.sorting.desc){
						this.sorting.desc = true;
					}else{
						this.sorting.property = null;
						this.sorting.desc = false;
					}
				}else{
					this.sorting.property = property;
					this.sorting.desc = false;
				}

				this.changeOrder(this.sorting.property, this.sorting.desc);
			},
			changeOrder(property, desc){
				// if sorting is disabled return to original state
				if(!property){
					this.sortedItems = this.$utility.copyObj(this.items);
					return;
				}
				// do the sorting
				desc = desc ? -1 : 1;
				this.sortedItems.sort(function(a, b){
					if (a[property] > b[property]) return desc;
					if (a[property] < b[property]) return -1 * desc;
					return 0;
				});
			}
		}
	}
</script>

<style scoped>

	table{
		border-collapse: collapse;
		width: 100%;
	}

	td{
		text-align: center;
		padding: 10px 20px;
	}
	th{
		text-align: center;
		padding: 10px 10px;
		cursor: initial;
	}
	th.sortable{
		cursor: pointer;
	}
	th.sortable i{
		color: var(--color-line);
	}
	th.sortable.active i{
		color: var(--color-primary);
	}
	th .table-header-content{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

	}
	tr:not(.footer){
		border-bottom: 1px solid var(--color-line);
	}
	.actions, .checkbox-option{
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

	tfoot td{
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

	.item-info{ margin-bottom: 5px; }
	.item-info .title{ font-weight: bold; }

	/* custom checkbox */
	.checkbox-option{
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

	.clickable{
		cursor: pointer;
	}
	.clickable:hover{
		background-color: var(--color-line);
	}

</style>