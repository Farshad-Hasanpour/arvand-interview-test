export default function($http){
	return{
		getComments(id = ''){
			return $http.get(`comments/${id}`);
		}
	}
}