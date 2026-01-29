export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
