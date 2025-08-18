import Sidebar from "@/app/dashboard/_components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[calc(100vh-60px)] mt-[20px] gap-5">
      <Sidebar />
      <main className="w-full rounded-xl">{children}</main>
    </div>
  );
}
