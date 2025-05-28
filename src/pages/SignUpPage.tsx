import { FormSignUp } from "../components/FormSignUp";

export function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      <div className="w-full max-w-md bg-black/20 backdrop-blur-sm border border-teal-400/20 rounded-2xl shadow-lg p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-teal-200 mb-6">
          Si tu souhaites nous rejoindre c'est par ici :
        </h1>
        
        {/* Register */}
        <FormSignUp />
      </div>
    </div>
  );
}