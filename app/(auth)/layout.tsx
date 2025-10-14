import Navigation from "@/components/Navigation";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
