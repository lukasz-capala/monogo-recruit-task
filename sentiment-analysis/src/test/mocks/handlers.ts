import type { AnalysisResponse } from '@/utils/api/analysis-response';
import { http, HttpResponse } from 'msw';

export const handlers = [
	http.post(
		'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
		() => {
			return HttpResponse.json<Array<AnalysisResponse>>([
				[
					{
						label: 'POSITIVE',
						score: 0.7
					},
					{
						label: 'NEGATIVE',
						score: 0.3
					}
				]
			]);
		}
	)
];
