import Content from "./content";
import type { Metadata } from "next"
 
export const metadata: Metadata = {
  title: "Login | Glider: Advanced logistics",
  description: "Access to your account.",
}

export default function Page() {
  return (
    <Content />
  );
}