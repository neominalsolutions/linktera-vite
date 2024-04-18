/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosHeaders } from 'axios';

export const login = async (
	endpoint: string,
	data: any,
	headers?: AxiosHeaders
) => {
	try {
		const response = await axios.post(endpoint, data, { headers: headers });

		return response.data;
	} catch (error) {
		alert('Kullanıcı bilgileri hatalı');
		return Promise.reject(error);
	}
};
