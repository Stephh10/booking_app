import Sidebar from "./_components/Sidebar";
import ThemeProvider from "@/components/theme/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-gradient-custom">
      <ThemeProvider>
        <div className="max-w-[1700px] px-5 mx-auto flex min-h-screen pt-[20px] gap-5">
          <Sidebar />
          <main className="w-full rounded-xl">{children}</main>
        </div>
      </ThemeProvider>
    </div>
  );
}
