import SubmitButton from "@/components/buttons/SubmitButton";
import StatusMessage from "@/components/feedback/StatusMessage";
import { useAuth } from "@/contexts/auth/AuthContext";
import { LoginCredentials } from "@/types/auth";
import { EyeOff, Eye } from "lucide-react";
import { useRef, useState } from "react";
import { FiLogIn } from "react-icons/fi";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, isInitializing, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginCredentials = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };

    await login(credentials);
  };

  const handleFocus = () => {
    if (error) clearError();
  };

  return (
    <>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        {/* Email Input */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium"
            style={{ color: "var(--textDark)" }}
          >
            E-mail
          </label>
          <div className="relative group">
            <input
              id="email"
              type="email"
              name="email"
              ref={emailRef}
              required
              placeholder="Digite aqui"
              onFocus={handleFocus}
              className="block w-full px-4 py-3 bg-gray-50 border-none rounded-lg
                           text-gray-900 placeholder:text-gray-400
                           focus:ring-2 focus:bg-white transition-all duration-200 outline-none"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium"
            style={{ color: "var(--textDark)" }}
          >
            Senha
          </label>
          <div className="relative group">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              ref={passwordRef}
              required
              placeholder="Digite aqui"
              onFocus={handleFocus}
              className="block w-full px-4 py-3 bg-gray-50 border-none rounded-lg
                           text-gray-900 placeholder:text-gray-400
                           focus:ring-2 focus:bg-white transition-all duration-200 outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <StatusMessage message={error} type="error" />}

        <SubmitButton
          isLoading={isLoading && !isInitializing}
          loadingText="Entrando..."
          defaultText="Entrar no Painel"
          icon={FiLogIn}
        />
      </form>
    </>
  );
}
