import request from "./axios";

export function getUserLogPage(data) {
	return request({
		url: '/api/userLog/page',
		method: 'post',
		data
	});
}

export function getPageByUserId(data) {
	return request({
		url: '/api/userLog/page/user',
		method: 'post',
		data
	});
}

export function addOne(data) {
	return request({
		url: '/api/userLog/add',
		method: 'post',
		data
	});
}