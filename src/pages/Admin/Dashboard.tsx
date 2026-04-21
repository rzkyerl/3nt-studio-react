import AdminLoginGuard from '../../components/auth/AdminLoginGuard'

export default function Dashboard() {
  return (
    <div className="fixed inset-0 bg-white z-[60]">
      <AdminLoginGuard />
    </div>
  )
}
