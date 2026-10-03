// 1. Profil Pasien
export interface Profile {
  age: string;
  medicalConditions: string;
  allergies: string;
}

// 2. Status Kuota
export interface QuotaType {
  remaining: number;
  total: number;
}

// 3. Kategori Keamanan Obat
export type SafetyCategory =
  | "Aman"
  | "Sebaiknya Dihindari"
  | "Tidak Aman";

// 4. Hasil Analisis AI
export interface AnalysisResponse {
  detected_medicine_name: string;
  batch_number?: string;
  dosage_form: string;
  ai_confidence_level: string;
  active_ingredients_text: string;
  active_ingredients_list: string[];
  safety_status: SafetyCategory;
  medical_explanation: string;
  recommendations: string;
}

// 5. Response API dari Backend (/api/analyze)
export interface AnalyzeApiResponse extends AnalysisResponse {
  quota?: QuotaType;
  historyItem?: HistoryItem;
  error?: string;
  message?: string;
}

// 6. Item Riwayat
export interface HistoryItem {
  id: string;
  timestamp: string;
  medicineName: string;
  dosageForm: string;
  safetyStatus: SafetyCategory;
  category: SafetyCategory;
  detail: string;
}

// 7. Context Type Utama
export interface FormContextType {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;

  formData: Profile; // Aliasing untuk kompatibilitas
  setFormData: React.Dispatch<React.SetStateAction<Profile>>;

  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;

  analysisResult: AnalysisResponse | null;
  setAnalysisResult: React.Dispatch<
    React.SetStateAction<AnalysisResponse | null>
  >;

  quota: QuotaType;
  setQuota: (newQuota: QuotaType) => void;

  history: HistoryItem[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
  addHistoryItem: (newItem: HistoryItem) => void;
  deleteHistoryItem: (id: string) => void;

  resetForm: () => void;
}