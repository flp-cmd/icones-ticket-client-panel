import { OrderStatus, PaymentMethod, OrderOrigin, OrderHistoryEvent } from '@/types/orders';

// Get human-readable text for order status
export const getOrderStatusText = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'Pendente';
    case OrderStatus.APPROVED:
      return 'Aprovado';
    case OrderStatus.DELIVERED:
      return 'Entregue';
    case OrderStatus.DECLINED:
      return 'Recusado';
    case OrderStatus.CANCELED:
      return 'Cancelado';
    default:
      return 'Desconhecido';
  }
};

// Get CSS classes for order status styling
export const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    case OrderStatus.APPROVED:
      return 'bg-blue-100 text-blue-800';
    case OrderStatus.DELIVERED:
      return 'bg-green-100 text-green-800';
    case OrderStatus.DECLINED:
      return 'bg-red-100 text-red-800';
    case OrderStatus.CANCELED:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Get order status badge component props
export const getOrderStatusBadgeProps = (status: OrderStatus) => {
  return {
    text: getOrderStatusText(status),
    className: `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getOrderStatusColor(status)}`,
  };
};

// Get human-readable text for payment method
export const getPaymentMethodText = (method: PaymentMethod): string => {
  switch (method) {
    case PaymentMethod.CREDIT:
      return 'Cartão de Crédito';
    case PaymentMethod.DEBIT:
      return 'Cartão de Débito';
    case PaymentMethod.PIX:
      return 'PIX';
    case PaymentMethod.MONEY:
      return 'Dinheiro';
    case PaymentMethod.UNKNOWN:
    default:
      return 'Desconhecido';
  }
};

// Get human-readable text for order origin
export const getOrderOriginText = (origin: OrderOrigin): string => {
  switch (origin) {
    case OrderOrigin.SITE:
      return 'Site';
    case OrderOrigin.SALE_POINT:
      return 'Ponto de Venda';
    case OrderOrigin.COURTESY:
      return 'Cortesia';
    case OrderOrigin.PANEL:
      return 'Painel';
    case OrderOrigin.CAMPAIGN:
      return 'Campanha';
    default:
      return 'Desconhecido';
  }
};

// Get order history event display information
export const getOrderHistoryEventInfo = (event: OrderHistoryEvent) => {
  switch (event) {
    case OrderHistoryEvent.ORDER_CREATED:
      return {
        title: 'Pedido Criado',
        description: 'Pedido foi criado no sistema',
        status: 'completed' as const,
        icon: 'FiInfo' as const,
      };
    case OrderHistoryEvent.ORDER_PAID:
      return {
        title: 'Pagamento Aprovado',
        description: 'Pagamento foi aprovado pela operadora',
        status: 'completed' as const,
        icon: 'FiCheckCircle' as const,
      };
    case OrderHistoryEvent.TICKET_SEEN:
      return {
        title: 'Ingresso Visualizado',
        description: 'O consumidor acessou o ingresso',
        status: 'completed' as const,
        icon: 'FiEye' as const,
      };
    case OrderHistoryEvent.TICKET_VALIDATED:
      return {
        title: 'Ingresso Validado',
        description: 'Ingresso foi utilizado no evento',
        status: 'completed' as const,
        icon: 'FiCheckCircle' as const,
      };
    case OrderHistoryEvent.TICKET_CANCELLED:
      return {
        title: 'Ingresso Cancelado',
        description: 'Ingresso foi invalidado',
        status: 'error' as const,
        icon: 'FiXCircle' as const,
      };
    case OrderHistoryEvent.CUSTOMER_CREATED:
      return {
        title: 'Consumidor Criado',
        description: 'Consumidor foi criado no sistema',
        status: 'completed' as const,
        icon: 'FiUser' as const,
      };
    default:
      return {
        title: 'Evento Desconhecido',
        description: 'Evento não identificado',
        status: 'info' as const,
        icon: 'FiInfo' as const,
      };
  }
};

// Validate if a string is a valid order status
export const isValidOrderStatus = (status: string): status is OrderStatus => {
  return Object.values(OrderStatus).includes(status as OrderStatus);
};

// Get all available order statuses
export const getAllOrderStatuses = (): OrderStatus[] => {
  return Object.values(OrderStatus);
};
