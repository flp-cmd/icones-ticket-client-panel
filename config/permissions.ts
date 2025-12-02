import { routes, RouteConfig } from './routes';

export interface Permission {
  id: string;
  label: string;
  category: string;
}

export const AVAILABLE_PERMISSIONS: Permission[] = [
  // Event Management
  { id: 'events-read', label: 'Visualizar Eventos', category: 'Gestão de Eventos' },
  { id: 'events-write', label: 'Editar Eventos', category: 'Gestão de Eventos' },
  { id: 'events-delete', label: 'Excluir Eventos', category: 'Gestão de Eventos' },
  { id: 'events-reports', label: 'Relatórios de Eventos', category: 'Gestão de Eventos' },
  { id: 'events-finances', label: 'Financeiro de Eventos', category: 'Gestão de Eventos' },
  { id: 'events-blockages', label: 'Gerenciar Lugares Bloqueados', category: 'Gestão de Eventos' },
  { id: 'events-all', label: 'Gerenciar Mapa do Evento', category: 'Gestão de Eventos' },

  // Financial Management
  { id: 'finances-read', label: 'Visualizar Financeiro', category: 'Gestão Financeira' },
  { id: 'finances-write', label: 'Editar Financeiro', category: 'Gestão Financeira' },

  // Order Management
  { id: 'orders-read', label: 'Visualizar Pedidos', category: 'Gestão de Pedidos' },
  { id: 'orders-write', label: 'Editar Pedidos', category: 'Gestão de Pedidos' },
  { id: 'orders-create', label: 'Criar Pedidos', category: 'Gestão de Pedidos' },
  { id: 'orders-cancel', label: 'Cancelar Pedidos', category: 'Gestão de Pedidos' },

  // Ticket Management
  { id: 'tickets-read', label: 'Visualizar Ingressos', category: 'Gestão de Ingressos' },
  { id: 'tickets-write', label: 'Editar Ingressos', category: 'Gestão de Ingressos' },

  // User Management - Customers
  { id: 'users-customers-read', label: 'Visualizar Consumidores', category: 'Gestão de Consumidores' },
  { id: 'users-customers-write', label: 'Editar Consumidores', category: 'Gestão de Consumidores' },
  { id: 'users-customers-delete', label: 'Excluir Consumidores', category: 'Gestão de Consumidores' },
  { id: 'users-customers-token', label: 'Gerenciar Token de Acesso', category: 'Gestão de Consumidores' },

  // User Management - Clients
  { id: 'users-clients-read', label: 'Visualizar Produtores', category: 'Gestão de Produtores' },
  { id: 'users-clients-write', label: 'Editar Produtores', category: 'Gestão de Produtores' },
  { id: 'users-clients-security', label: 'Gerenciar Segurança', category: 'Gestão de Produtores' },

  // User Management - Administrators
  { id: 'users-admins-read', label: 'Visualizar Administradores', category: 'Gestão de Administradores' },
  { id: 'users-admins-write', label: 'Editar Administradores', category: 'Gestão de Administradores' },
  { id: 'users-admins-security', label: 'Gerenciar Segurança', category: 'Gestão de Administradores' },

  // Producer Management
  { id: 'producers-read', label: 'Visualizar Produtoras', category: 'Gestão de Produtoras' },
  { id: 'producers-write', label: 'Editar Produtoras', category: 'Gestão de Produtoras' },

  // Category Management
  { id: 'categories-read', label: 'Visualizar Categorias', category: 'Gestão de Categorias' },
  { id: 'categories-write', label: 'Editar Categorias', category: 'Gestão de Categorias' },

  // Coupon Management
  { id: 'coupons-read', label: 'Visualizar Cupons', category: 'Gestão de Cupons' },
  { id: 'coupons-write', label: 'Editar Cupons', category: 'Gestão de Cupons' },

  // Courtesy Management
  { id: 'courtesies-read', label: 'Visualizar Cortesias', category: 'Gestão de Cortesias' },
  { id: 'courtesies-write', label: 'Editar Cortesias', category: 'Gestão de Cortesias' },

  // Sale Points Management
  { id: 'sale-points-read', label: 'Visualizar Pontos de Venda', category: 'Gestão de Pontos de Venda' },
  { id: 'sale-points-write', label: 'Editar Pontos de Venda', category: 'Gestão de Pontos de Venda' },
  {
    id: 'sale-points-tickets',
    label: 'Imprimir Ingressos nos Pontos de Venda',
    category: 'Gestão de Pontos de Venda',
  },

  // Localization Management
  { id: 'localizations-read', label: 'Visualizar Localizações', category: 'Gestão de Localizações' },
  { id: 'localizations-write', label: 'Editar Localizações', category: 'Gestão de Localizações' },

  // Occurrence Management
  { id: 'occurrences-read', label: 'Visualizar Ocorrências', category: 'Gestão de Ocorrências' },

  // System Management
  { id: 'app-validator', label: 'Gerenciar Validador', category: 'Validador' },
];

export const getPermissionsByCategory = (permissions: Permission[]) => {
  return permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>
  );
};

export const getPermissionById = (id: string) => {
  return AVAILABLE_PERMISSIONS.find((permission) => permission.id === id);
};

export const getPermissionsByCategoryName = (category: string) => {
  return AVAILABLE_PERMISSIONS.filter((permission) => permission.category === category);
};

export const getAllCategories = () => {
  return [...new Set(AVAILABLE_PERMISSIONS.map((permission) => permission.category))];
};

const checkMasterAccess = (userRoles: string[]): boolean => {
  return userRoles.includes('all');
};

const checkNoPermissionsRequired = (requiredPermissions: string[]): boolean => {
  return requiredPermissions.length === 0;
};

export const hasPermission = (userRoles: string[], requiredPermissions: string[]): boolean => {
  if (checkMasterAccess(userRoles) || checkNoPermissionsRequired(requiredPermissions)) {
    return true;
  }
  return requiredPermissions.some((permission) => userRoles.includes(permission));
};

export const hasAnyPermission = (userRoles: string[], requiredPermissions: string[]): boolean => {
  return hasPermission(userRoles, requiredPermissions);
};

export const hasAllPermissions = (userRoles: string[], requiredPermissions: string[]): boolean => {
  if (checkMasterAccess(userRoles) || checkNoPermissionsRequired(requiredPermissions)) {
    return true;
  }
  return requiredPermissions.every((permission) => userRoles.includes(permission));
};

export const getRoutePermission = (path: string): string | undefined => {
  const findRoutePermission = (routeList: RouteConfig[], targetPath: string): string | undefined => {
    for (const route of routeList) {
      if (route.path === targetPath) {
        return route.permission;
      }

      if (route.isDynamic) {
        const routePattern = route.path.replace(/\[[^\]]+\]/g, '.*');
        if (new RegExp(`^${routePattern}$`).test(targetPath)) {
          return route.permission;
        }
      }

      if (route.children) {
        const childPermission = findRoutePermission(route.children, targetPath);
        if (childPermission !== undefined) {
          return childPermission;
        }
      }
    }
    return undefined;
  };

  return findRoutePermission(routes, path);
};
