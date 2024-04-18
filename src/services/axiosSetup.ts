import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_BASEURL}`,
	timeout: 5000, // 5sn
	timeoutErrorMessage: 'İstek zaman aşımına uğradı',
});

function OnRequest(config: InternalAxiosRequestConfig) {
	console.log('config', config);
	return config;
}

function OnRequestError(error: AxiosError) {
	return Promise.reject(error);
}

function OnResponse(response: AxiosResponse) {
	console.log('response', response);
	return response;
}

function OnResponseError(error: AxiosError) {
	return Promise.reject(error);
}

// interceptorlu bir axios tanımı yapmış olduk.
function SetUpInterceptors(axiosInstance: AxiosInstance) {
	axiosInstance.interceptors.request.use(OnRequest, OnRequestError);
	axiosInstance.interceptors.response.use(OnResponse, OnResponseError);

	return axiosInstance;
}

export const client = SetUpInterceptors(axiosInstance);
