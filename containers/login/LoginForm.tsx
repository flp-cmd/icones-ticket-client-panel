import SubmitButton from "@/components/buttons/SubmitButton";
import StatusMessage from "@/components/feedback/StatusMessage";
import { useAuth } from "@/contexts/auth/AuthContext";
import { LoginCredentials } from "@/types/auth";
import { EyeOff, Eye, LogIn } from "lucide-react";
import { useState, FormEvent } from "react";
import { FiLogIn } from "react-icons/fi";

export default function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, isInitializing, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

    if (error) {
      clearError();
    }
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
              value={credentials.email}
              onChange={handleInputChange}
              required
              placeholder="Digite aqui"
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
              value={credentials.password}
              onChange={handleInputChange}
              required
              placeholder="Digite aqui"
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
