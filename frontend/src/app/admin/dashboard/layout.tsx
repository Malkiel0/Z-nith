// Layout wrapper pour toutes les pages /admin/dashboard/*
import AdminLayout from "../AdminLayout";

// Le ToastProvider est déjà appliqué globalement dans RootLayout
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
