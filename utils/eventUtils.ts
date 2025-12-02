import { EventStatus } from '@/types/events';

// Get human-readable text for event status
export const getEventStatusText = (status: EventStatus): string => {
  switch (status) {
    case EventStatus.DRAFT:
      return 'Rascunho';
    case EventStatus.ACTIVE:
      return 'Vendendo';
    case EventStatus.PAUSED:
      return 'Pausado';
    case EventStatus.CANCELLED:
      return 'Cancelado';
    case EventStatus.COMPLETED:
      return 'Finalizado';
    case EventStatus.ARCHIVED:
      return 'Arquivado';
    default:
      return 'Desconhecido';
  }
};

// Get CSS classes for event status styling
export const getEventStatusColor = (status: EventStatus): string => {
  switch (status) {
    case EventStatus.DRAFT:
      return 'bg-gray-100 text-gray-800';
    case EventStatus.ACTIVE:
      return 'bg-green-100 text-green-800';
    case EventStatus.PAUSED:
      return 'bg-yellow-100 text-yellow-800';
    case EventStatus.CANCELLED:
      return 'bg-red-100 text-red-800';
    case EventStatus.COMPLETED:
      return 'bg-blue-100 text-blue-800';
    case EventStatus.ARCHIVED:
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Get event status badge component props
export const getEventStatusBadgeProps = (status: EventStatus) => {
  return {
    text: getEventStatusText(status),
    className: `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getEventStatusColor(status)}`,
  };
};

// Get event status options for select fields
export const getEventStatusOptions = () => {
  return [
    { value: EventStatus.DRAFT, label: getEventStatusText(EventStatus.DRAFT) },
    { value: EventStatus.ACTIVE, label: getEventStatusText(EventStatus.ACTIVE) },
    { value: EventStatus.PAUSED, label: getEventStatusText(EventStatus.PAUSED) },
    { value: EventStatus.CANCELLED, label: getEventStatusText(EventStatus.CANCELLED) },
    { value: EventStatus.COMPLETED, label: getEventStatusText(EventStatus.COMPLETED) },
    { value: EventStatus.ARCHIVED, label: getEventStatusText(EventStatus.ARCHIVED) },
  ];
};
