import { AxiosHeaders } from 'axios';
import { Todo } from '../models/todo.model';

import { httpClient } from './http.client';

export const getTodos = async (endpoint: string) => {
	return await httpClient(endpoint).get();
};

export const getTodosById = async (endpoint: string, id: number) => {
	return await httpClient(`${endpoint}/${id}`).get();
};

export const postTodo = async (
	endpoint: string,
	data: Todo,
	headers?: AxiosHeaders
) => {
	return await httpClient(endpoint).post(data, headers);
};
