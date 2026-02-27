export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        {children}
      </div>
    </div>
  );
}