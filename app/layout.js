import "./globals.css";
import { Roboto_Flex } from "next/font/google";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export const metadata = {
  title: "Lingua",
  description:
    '"Lingua": A GPT-powered learning path generator' +
    " built for UCSD's LIGN 101",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoFlex.className}>{children}</body>
    </html>
  );
}