import { FormProvider } from "@/context/FormContext";

export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormProvider>
      <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </FormProvider>
  );
}