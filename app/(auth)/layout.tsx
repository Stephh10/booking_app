import Navigation from "@/components/Navigation";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden">
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
