import axios from "axios";

const api = {
	getPosts: () => {
		return axios.get("localhost://8082/post/all").then((res) => res.json());
	},
	createPost: (ob) => {
		return axios
			.put("localhost://8082/post/create", ob)
			.then((res) => res.json());
	},
};

export default api;
