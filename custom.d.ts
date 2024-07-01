// custom.d.ts
declare module "*.crt" {
  const content: string;
  export default content;
}
