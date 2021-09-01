<template>
	<section>
		<div class="section-header">
			<h2>نظرات</h2>
		</div>

		<!--<Table-->
				<!--v-model="selected"-->
				<!--:items="usersWithRow"-->
				<!--:selectable="true"-->
				<!--:max-select-count="5"-->
				<!--:headers="headers"-->
				<!--:loading="fetching"-->
				<!--:actions="actions"-->
				<!--@delete="deleteUsers($event)"-->
		<!--/>-->
	</section>
</template>

<script>
	import commentService from '@/services/comment';

	export default {
		name: "Home",
		components: {},
		created(){
			this.fetchComments();
		},
		methods:{
			fetchComments(){
				commentService(this.$http).getComments().then(response => {
					console.log(response.data);
				});
			}
		}
	}
</script>

<style scoped>

</style>