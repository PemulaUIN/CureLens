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
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [quota, setQuotaState] = useState<QuotaType>({ remaining: 5, total: 5 });
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // 1. Synchronize Kuota Harian & Riwayat dari localStorage saat pertama kali dimuat
  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const savedQuotaDate = localStorage.getItem("curelens_quota_date");
    const savedQuota = localStorage.getItem("curelens_quota");
    const savedHistory = localStorage.getItem("curelens_history");

    // Reset kuota otomatis jika tanggal berganti (hari baru)
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

    // Load riwayat analisis lama
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Gagal membaca riwayat:", e);
      }
    }
  }, []);

  // Update kuota & simpan ke localStorage
  const setQuota = (newQuota: QuotaType) => {
    setQuotaState(newQuota);
    localStorage.setItem("curelens_quota", JSON.stringify(newQuota));
  };

  // Fungsi khusus pemotong kuota (dipanggil saat analisis sukses di Step 3)
  const decrementQuota = () => {
    setQuotaState((prev) => {
      const updated = {
        ...prev,
        remaining: Math.max(0, prev.remaining - 1),
      };
      localStorage.setItem("curelens_quota", JSON.stringify(updated));
      return updated;
    });
  };

  // Tambah item ke riwayat (tanpa menghapus riwayat lama)
  const addHistoryItem = (newItem: HistoryItem) => {
    setHistory((prevHistory) => {
      const filtered = prevHistory.filter((item) => item.id !== newItem.id);
      const updated = [newItem, ...filtered];
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

  // Reset form hanya untuk inputan aktif (tidak menghapus riwayat)
  const resetForm = () => {
    setProfile(initialProfile);
    setSelectedImage(null);
    setAnalysisResult(null);
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