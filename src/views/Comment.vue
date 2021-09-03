<template>
	<section v-if="fetchingComment" class="container">
		<Icon id="loading-icon" name="loading" size="36px" :color="themeColors.primary" rotate/>
	</section>
	<section v-else class="container">
		<template v-if="comment">
			<h2 id="name">{{comment.name}}</h2>
			<h4 id="email">{{comment.email}}</h4>
			<p id="body">{{comment.body}}</p>
		</template>
		<template v-else>
			<h2 id="error">کامنت مورد نظر یافت نشد.</h2>
		</template>

		<Button
				id="return"
				dark
				:color="themeColors.primary"
				height="42px"
				width="150px"
				@click="$router.push({name: 'Home'})"
		>
			<span style="margin-inline-end: 7px;">بازگشت</span>
			<Icon name="arrow-right" :inverse="$store.state.rtl"></Icon>
		</Button>
	</section>
</template>

<script>
	//Services
	import commentService from '@/services/comment';

	export default {
		name: "Comment",
		created(){
			this.fetchComment();
		},
		data: function(){
			return{
				fetchingComment: false,
				comment: null,
			}
		},
		computed: {
			themeColors() { return this.$store.getters.themeColors },
		},
		methods:{
			fetchComment(){
				if(this.$store.state.pageDataToShow.comment){
					this.comment = this.$store.state.pageDataToShow.comment;
					return;
				}
				const commentId = parseInt(this.$route.params.id);
				this.fetchingComment = true;
				commentService(this.$http).getComments(commentId).then(response => {
					this.comment = response.data;
				}).finally(() => {
					this.fetchingComment = false;
				});
			},
		}
	}
</script>

<style scoped>
	.container{
		text-align: center;
	}
	#name, #error{
		text-align: center;
		margin: 0;
	}
	#email{
		text-align: center;
		font-weight: normal;
		margin: 0;
		margin-top: 7px;
	}
	#body{
		text-align: justify;
		text-align-last: center;
		line-height: 1.5;
		margin-top: 32px;
	}
	#return{
		margin-top: 32px;
	}
</style>