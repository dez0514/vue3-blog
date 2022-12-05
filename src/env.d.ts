/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'docxtemplater-image-module-free';
declare module './assets/libs/live2d.min.js'
declare interface Window {
  copyCode: any
  loadlive2d: any
}