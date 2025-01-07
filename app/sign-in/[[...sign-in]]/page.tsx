import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <SignIn appearance={{
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          card: "bg-white/90 backdrop-blur-xl shadow-xl rounded-xl",
          headerTitle: "text-gray-800 text-2xl font-bold",
          headerSubtitle: "text-gray-600",
          socialButtonsBlockButton: "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300",
          formFieldInput: "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500",
          footerActionLink: "text-blue-600 hover:text-blue-700 font-medium",
        }
      }} />
    </div>
  );
}