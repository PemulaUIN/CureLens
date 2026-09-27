export interface MedicalProfile {
  age: number | string;
  medicalConditions: string;
  allergies: string;
}

export type SafetyStatus = 'AMAN' | 'HATI_HATI' | 'BERBAHAYA';

export interface DetailedAnalysis {
  diseaseInteraction: string;
  allergyRisk: string;
  ageAppropriateness: string;
}

export interface AnalysisResponse {
  detectedMedicineName: string;
  activeIngredients: string[];
  safetyStatus: SafetyStatus;
  statusTitle: string;
  summary: string;
  detailedAnalysis: DetailedAnalysis;
  recommendations: string[];
}