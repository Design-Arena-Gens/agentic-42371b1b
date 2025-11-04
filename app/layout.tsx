export const metadata = {
  title: "Girl Dancing in the Rain",
  description: "A serene animated scene of a girl dancing in the rain"
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
