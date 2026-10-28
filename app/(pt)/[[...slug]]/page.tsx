import type { Metadata } from "next";
import { RenderPage } from "@/components/RenderPage";
import { resolve, staticParams } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("pt");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = resolve("pt", (await params).slug);
  return page ? buildMetadata("pt", page) : {};
}

export default async function Page({ params }: Props) {
  return <RenderPage locale="pt" slug={(await params).slug} />;
}
