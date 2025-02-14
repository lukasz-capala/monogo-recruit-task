export interface AnalysisRecord {
	label: AnalysisLabel;
	score: number;
}

// Really weird response
export type AnalysisResponse = Array<AnalysisRecord>;
export type AnalysisLabel = 'POSITIVE' | 'NEGATIVE';
