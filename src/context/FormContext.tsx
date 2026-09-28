"use client";

import React, { createContext, useContext, useState } from "react";

interface Profile {
  age: string;
  medicalConditions: string;
  allergies: string;
}

interface FormContextType {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>({
    age: "",
    medicalConditions: "",
    allergies: "",
  });

  return (
    <FormContext.Provider value={{ profile, setProfile }}>
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