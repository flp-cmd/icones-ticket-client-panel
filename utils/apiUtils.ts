export function buildQueryParams(params: object): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      const stringValue = value instanceof Date ? value.toISOString() : String(value);
      searchParams.append(key, stringValue);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
