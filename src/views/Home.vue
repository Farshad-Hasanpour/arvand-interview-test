<template>
	<section>
		<div class="section-header">
			<h2>نظرات</h2>
		</div>

		<Table
				:items="items"
				:headers="headers"
				:fetching="fetchingItems"
				:per-page="7"
				:clickable-rows="true"
				@rowClick="rowClick($event)"
		/>
	</section>
</template>

<script>
	//Services
	import commentService from '@/services/comment';

	//Components
	import Table from '@/components/table/Table';

	const headers = {
		postId: {title: 'پست', dir: 'ltr', sortable: true},
		email: {title: 'ایمیل', dir: 'ltr', sortable: true},
		name: {title: 'نام', dir: 'ltr', sortable: true},
		body: {title: 'نظر', dir: 'ltr'}
	};

	export default {
		name: "Home",
		components: {Table},
		created(){
			this.fetchComments();
		},
		data: function(){
			return{
				fetchingItems: false,
				items: [],
				headers,
			}
		},
		methods:{
			fetchComments(){
				this.fetchingItems = true;
				commentService(this.$http).getComments().then(response => {
					this.items = response.data;
				}).catch(error => {
					error.response && this.$store.dispatch('showErrorByStatusCode', error.response.status);
				}).finally(() => {
					this.fetchingItems = false;
				});
			},
			rowClick(item){
				this.$store.dispatch('setCommentToShow', item);
				this.$router.push({name: 'Comment', params: {id: item.id}});
			}
		}
	}
</script>

<style scoped>

</style>