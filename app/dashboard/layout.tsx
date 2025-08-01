import Sidebar from "./_components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[calc(100vh-60px)] mt-[20px]">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
