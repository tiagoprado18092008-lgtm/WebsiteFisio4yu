import { RootHtml } from "@/components/RootHtml";
export { viewport } from "@/components/RootHtml";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>;
}
