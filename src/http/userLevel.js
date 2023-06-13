import request from "./axios";

export function getAll(){
	return request({
		url: '/api/userlevel/all',
		method: 'get',
	});
}

export function getOne(id){
	return request({
		url: `/api/userlevel/one?id=${id}`,
		method: 'get',
	});
}

export function delOne(id){
	return request({
		url: `/api/userlevel/delete?id=${id}`,
		method: 'get'
	});
}

export function addOne(data){
	return request({
		url: '/api/userlevel/add',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/api/userlevel/modify',
		method: 'post',
		data
	});
}

