"use client";

import React, { createContext, useContext, useState } from "react";
import { AnalysisResponse } from "@/types";

interface Profile {
  age: string;
  medicalConditions: string;
  allergies: string;
}

interface FormContextType {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  analysisResult: AnalysisResponse | null;
  setAnalysisResult: React.Dispatch<
    React.SetStateAction<AnalysisResponse | null>
  >;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>({
    age: "",
    medicalConditions: "",
    allergies: "",
  });

  // State untuk menampung hasil respon Gemini
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(
    null,
  );

  return (
    <FormContext.Provider
      value={{ profile, setProfile, analysisResult, setAnalysisResult }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
