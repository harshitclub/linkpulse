import "./globals.css";

export const metadata = {
  title: "LinkPulse — Minimalist URL Shortener & Analytics",
  description: "A fast URL shortener and real-time click analytics dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
