// Layout wrapper pour toutes les pages /admin/dashboard/*
import AdminLayout from "../AdminLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
