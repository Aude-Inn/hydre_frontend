import { Login } from "../components/Login";

export function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-black/20 backdrop-blur-sm rounded-2xl border border-teal-400/20 shadow-lg p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-teal-200 mb-6 text-center">
          Welcome !
        </h1>
        <Login />
      </div>
    </div>
  );
}

