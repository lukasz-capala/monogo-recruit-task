import type { AnalysisApiError } from '@/utils/api/analysis-api.error';
import type { AnalysisError } from '@/utils/api/analysis-error';
import type { AnalysisPayload } from '@/utils/api/analysis-payload';
import type { AnalysisResponse } from '@/utils/api/analysis-response';
import { isAxiosError, type AxiosInstance } from 'axios';

export class AnalysisService {
	private url =
		'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';

	constructor(private axiosInstance: AxiosInstance) {}

	async sendAnalysis(message: string): Promise<AnalysisResponse | AnalysisError> {
		try {
			const { data } = await this.axiosInstance.post<Array<AnalysisResponse>>(this.url, <
				AnalysisPayload
			>{
				inputs: message
			});

			return data?.[0] ?? [];
		} catch (error) {
			if (isAxiosError<AnalysisApiError>(error)) {
				throw <AnalysisError>{
					status: error.response?.status ?? -1,
					message: `${error.message}<br />${error.response?.data?.error ?? ''}`
				};
			}

			throw <AnalysisError>{
				status: -1,
				message: 'Wystąpił nieoczekiwany błąd'
			};
		}
	}
}
