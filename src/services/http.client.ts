/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosHeaders } from 'axios';
import { client } from './axiosSetup';

// http verbleri merkezi olarak yöneteceğimiz bir mekanizma kurduk.
// bu mekanizma aynı zamanda axios request response interceptors üzerinden çalışıyor.
// herhangi bir timeout durumunda isteği otomatik olarak sonlandırıyor. (AbortSignal.timeout(5000)
export const httpClient = (endPoint: string) => {
	const get = async () => {
		try {
			const response = await client.get(endPoint, {
				signal: AbortSignal.timeout(5000),
			});
			return response.data;
		} catch (error) {
			return Promise.reject(error);
		}
	};

	// param JSON data
	// headers ile de Http Header güncellemsi yapmak için kullanabiliriz.
	const post = async (param: any, headers?: AxiosHeaders) => {
		try {
			const response = await client.post(endPoint, param, {
				signal: AbortSignal.timeout(5000),
				headers: headers,
			});

			return response.data;
		} catch (error) {
			return Promise.reject(error);
		}
	};

	return {
		get,
		post,
	};
};
