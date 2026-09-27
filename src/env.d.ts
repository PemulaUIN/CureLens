/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Mengizinkan TypeScript membaca import file CSS
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}