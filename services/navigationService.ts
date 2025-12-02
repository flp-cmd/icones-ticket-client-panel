import { routes, RouteConfig } from '@/config/routes';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export class NavigationService {
  private static matchDynamicRoute(routePath: string, currentPath: string): boolean {
    const routeParts = routePath.split('/');
    const currentParts = currentPath.split('/');

    if (routeParts.length !== currentParts.length) return false;

    return routeParts.every((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) return true;
      return part === currentParts[index];
    });
  }

  static findRouteByPath(path: string): RouteConfig | undefined {
    const findRoute = (routes: RouteConfig[]): RouteConfig | undefined => {
      for (const route of routes) {
        if (route.isDynamic && this.matchDynamicRoute(route.path, path)) return route;
        if (route.path === path) return route;
        if (route.children) {
          const found = findRoute(route.children);
          if (found) return found;
        }
      }
      return undefined;
    };

    return findRoute(routes);
  }

  static getBreadcrumbItems(path: string): { label: string; href?: string }[] {
    const segments = path.split('/').filter(Boolean);
    const items: { label: string; href?: string }[] = [];
    let currentPath = '';

    if (path === '/') {
      const rootPage = routes.find((route) => route.path === '/');
      if (rootPage) {
        items.push({ label: rootPage.label, href: '/' });
      }
      return items;
    }

    for (const segment of segments) {
      currentPath += `/${segment}`;
      const route = NavigationService.findRouteByPath(currentPath);
      if (route) {
        items.push({
          label: route.label,
          href: route.children?.some((child) => !child.isDynamic) ? undefined : currentPath,
        });
      }
    }

    return items;
  }
}

export const findRouteByPath = NavigationService.findRouteByPath;
export const getBreadcrumbItems = NavigationService.getBreadcrumbItems;
