import Navigation from "@/components/Navigation";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col md:min-h-screen overflow-hidden ">
      <Navigation />
      <main className="flex-1">{children}</main>
    </div>
  );
}
