export interface RouteConfig {
  path: string;
  label: string;
  permission?: string;
  children?: RouteConfig[];
  isDynamic?: boolean;
  dynamicParams?: string[];
}

const PUBLIC_ROUTES = ['/login'];

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname);
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    label: 'Visão Geral',
  },
  {
    path: '/perfil',
    label: 'Perfil',
    children: [{ path: '/perfil/seguranca', label: 'Segurança' }],
  },
  {
    path: '/financeiro',
    label: 'Financeiro',
    permission: 'finances-read',
    children: [{ path: '/financeiro/mensal', label: 'Faturamento Mensal', permission: 'finances-read' }],
  },
  {
    path: '/eventos',
    label: 'Eventos',
    permission: 'events-read',
    children: [
      {
        path: '/eventos/[id]',
        label: 'Detalhes',
        permission: 'events-read',
        isDynamic: true,
        dynamicParams: ['id'],
      },
    ],
  },
  {
    path: '/pedidos',
    label: 'Pedidos',
    permission: 'orders-read',
  },
  {
    path: '/usuarios',
    label: 'Usuários',
    children: [
      { path: '/usuarios/administradores', label: 'Administradores', permission: 'users-admins-read' },
      {
        path: '/usuarios/administradores/[id]',
        label: 'Detalhes',
        permission: 'users-admins-read',
        isDynamic: true,
        dynamicParams: ['id'],
      },
      { path: '/usuarios/consumidores', label: 'Consumidores', permission: 'users-customers-read' },
      { path: '/usuarios/produtores', label: 'Produtores', permission: 'users-clients-read' },
    ],
  },
];
