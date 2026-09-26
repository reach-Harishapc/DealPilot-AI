import "./globals.css";

export const metadata = {
  title: "DealPilot Enterprise — Autonomous Pre-Meeting Intelligence & Pitch Strategy",
  description: "Transform raw B2B account context, CRM history, and product catalogs into executive-ready meeting battlecards in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#0f172a] selection:bg-indigo-500/20 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
