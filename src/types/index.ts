export interface AnalysisResponse {
  detected_medicine_name: string;
  batch_number: string;
  dosage_form: string;
  ai_confidence_level: string;
  active_ingredients_text: string;
  active_ingredients_list: string[];
  safety_status: "Aman" | "Sebaiknya Dihindari" | "Tidak Aman (Terdeteksi)";
  status_badge_label: string;
  medical_explanation: string;
  recommendations: string;
}
