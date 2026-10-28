import { Bricolage_Grotesque, Public_Sans } from "next/font/google";

// Bricolage Grotesque: grotesca com carácter e eixo ótico — títulos grandes, em frase normal.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-bricolage",
});

// Public Sans: sóbria e muito legível — texto corrido e interface.
export const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-public-sans",
});
