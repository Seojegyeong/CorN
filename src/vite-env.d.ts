/// <reference types="vite/client" />
/// <reference types="navermaps" />

declare module "*.svg?react" {
  import { ComponentType, SVGProps } from "react";
  const component: ComponentType<SVGProps<SVGSVGElement>>;
  export default component;
}
