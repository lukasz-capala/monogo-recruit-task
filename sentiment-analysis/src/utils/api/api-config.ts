import { APP_CONFIG } from '@/app.config';
import axios, { type AxiosInstance } from 'axios';

export class ApiConfig {
	private static api: ApiConfig;
	private _axiosInstance: AxiosInstance;

	private constructor() {
		this._axiosInstance = axios.create();
		this._axiosInstance.interceptors.request.use((config) => {
			config.headers.set('Authorization', `Bearer ${APP_CONFIG.API_TOKEN}`);
			return config;
		});
	}

	static get axios(): AxiosInstance {
		if (!ApiConfig.api) {
			ApiConfig.api = new ApiConfig();
		}

		return ApiConfig.api._axiosInstance;
	}
}
