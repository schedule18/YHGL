import request from "./axios";

export function getMemorabiliaPage(data){
	return request({
		url: '/api/memorabilia/page',
		method: 'post',
        data
	});
}

export function getOne(id){
	return request({
		url: `/api/memorabilia/one/${id}`,
		method: 'get',
	});
}

export function delOne(id){
	return request({
		url: `/api/memorabilia/delete/${id}`,
		method: 'get'
	});
}

export function addOne(data){
	return request({
		url: '/api/memorabilia/add',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/api/memorabilia/edit',
		method: 'post',
		data
	});
}

