import request from "./axios";

export function addOne(data) {
	return request({
		url: '/api/userArticle/add',
		method: 'post',
		data
	});
}