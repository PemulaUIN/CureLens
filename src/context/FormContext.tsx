"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Profile,
  QuotaType,
  AnalysisResponse,
  HistoryItem,
  FormContextType,
} from "@/types";

const initialProfile: Profile = {
  age: "",
  medicalConditions: "Tidak Ada",
  allergies: "Tidak Ada",
};

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfileState] = useState<Profile>(initialProfile);
  const [selectedImage, setSelectedImageState] = useState<string | null>(null);
  const [analysisResult, setAnalysisResultState] =
    useState<AnalysisResponse | null>(null);
  const [quota, setQuotaState] = useState<QuotaType>({
    remaining: 5,
    total: 5,
  });
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const todayStr = new Date().toISOString().split("T")[0];
    const savedQuotaDate = localStorage.getItem("curelens_quota_date");
    const savedQuota = localStorage.getItem("curelens_quota");
    const savedHistory = localStorage.getItem("curelens_history");
    const savedImage = localStorage.getItem("curelens_saved_image");
    const savedAnalysis = localStorage.getItem("curelens_analysis_result");
    const savedProfile = localStorage.getItem("curelens_profile");

    if (savedProfile) {
      try {
        setProfileState(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Gagal membaca profil dari localStorage:", e);
      }
    }

    // Reset kuota jika hari berganti
    if (savedQuotaDate !== todayStr) {
      const freshQuota = { remaining: 5, total: 5 };
      setQuotaState(freshQuota);
      localStorage.setItem("curelens_quota", JSON.stringify(freshQuota));
      localStorage.setItem("curelens_quota_date", todayStr);
    } else if (savedQuota) {
      try {
        setQuotaState(JSON.parse(savedQuota));
      } catch (e) {
        console.error("Gagal membaca kuota:", e);
      }
    }

    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Gagal membaca riwayat:", e);
      }
    }

    if (savedImage) setSelectedImageState(savedImage);

    if (savedAnalysis) {
      try {
        setAnalysisResultState(JSON.parse(savedAnalysis));
      } catch (e) {
        console.error("Gagal membaca hasil analisis:", e);
      }
    }
  }, []);

  const setProfile = (newProfile: React.SetStateAction<Profile>) => {
    setProfileState((prev) => {
      const updated =
        typeof newProfile === "function" ? newProfile(prev) : newProfile;
      localStorage.setItem("curelens_profile", JSON.stringify(updated));
      return updated;
    });
  };

  const setSelectedImage = (image: string | null) => {
    setSelectedImageState(image);
    if (image) {
      localStorage.setItem("curelens_saved_image", image);
    } else {
      localStorage.removeItem("curelens_saved_image");
    }
  };

  const setAnalysisResult = (data: AnalysisResponse | null) => {
    setAnalysisResultState(data);
    if (data) {
      localStorage.setItem("curelens_analysis_result", JSON.stringify(data));
    } else {
      localStorage.removeItem("curelens_analysis_result");
    }
  };

  // Hanya perbarui kuota jika menerima data baru secara eksplisit
  const setQuota = (newQuota: QuotaType) => {
    setQuotaState(newQuota);
    localStorage.setItem("curelens_quota", JSON.stringify(newQuota));
  };

  const addHistoryItem = (newItem: HistoryItem) => {
    setHistory((prevHistory) => {
      const exists = prevHistory.some(
        (item) =>
          item.id === newItem.id ||
          (item.medicineName === newItem.medicineName &&
            item.detail === newItem.detail),
      );
      if (exists) return prevHistory;

      const updated = [newItem, ...prevHistory];
      localStorage.setItem("curelens_history", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteHistoryItem = (idToDelete: string) => {
    setHistory((prevHistory) => {
      const updated = prevHistory.filter((item) => item.id !== idToDelete);
      localStorage.setItem("curelens_history", JSON.stringify(updated));
      return updated;
    });
  };

  const resetForm = () => {
    setProfileState(initialProfile);
    setSelectedImageState(null);
    setAnalysisResultState(null);
    localStorage.removeItem("curelens_profile");
    localStorage.removeItem("curelens_saved_image");
    localStorage.removeItem("curelens_analysis_result");
  };

  return (
    <FormContext.Provider
      value={{
        profile,
        setProfile,
        formData: profile,
        setFormData: setProfile,
        selectedImage,
        setSelectedImage,
        analysisResult,
        setAnalysisResult,
        quota,
        setQuota,
        history,
        setHistory,
        addHistoryItem,
        deleteHistoryItem,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
