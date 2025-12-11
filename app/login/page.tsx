import { createPrivatePageMetadata } from "@/config/metadata";
import LoginContainer from "@/containers/login/LoginContainer";

export const metadata = createPrivatePageMetadata({
  title: "Login",
  description: "Faça login no painel administrativo",
});

export default function LoginPage() {
  return <LoginContainer />;
}
