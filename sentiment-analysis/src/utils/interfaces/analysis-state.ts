import type { AnalysisError } from '../api/analysis-error';
import type { AnalysisResponse } from '../api/analysis-response';

export interface AnalysisState {
	loading: boolean;
	showSuccessModal: boolean;
	analysisResult: AnalysisResponse;
	showErrorModal: boolean;
	analysisError?: AnalysisError;
}
