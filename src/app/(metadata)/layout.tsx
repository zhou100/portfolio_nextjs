import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yujun Zhou",
  description: "Personal portfolio website",
};

export default function MetadataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
