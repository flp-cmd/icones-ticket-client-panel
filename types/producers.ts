export interface Producer {
  producerId: number;
  name: string;
  documentNumber: string;
}

export interface ProducerSearchParams {
  query: string;
}

export interface ProducerCreateRequest {
  name: string;
  documentNumber: string;
}
