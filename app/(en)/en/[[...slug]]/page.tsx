import type { Metadata } from "next";
import { RenderPage } from "@/components/RenderPage";
import { resolve, staticParams } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;
export const generateStaticParams = () => staticParams("en");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = resolve("en", (await params).slug);
  return page ? buildMetadata("en", page) : {};
}

export default async function Page({ params }: Props) {
  return <RenderPage locale="en" slug={(await params).slug} />;
}
