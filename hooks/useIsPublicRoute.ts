import { usePathname } from "next/navigation";

const PUBLIC_ROUTES = ["/login"];

export function useIsPublicRoute(): boolean {
  const pathname = usePathname();
  return PUBLIC_ROUTES.includes(pathname);
}
