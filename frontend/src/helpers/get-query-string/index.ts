import queryString from 'query-string';

export default function (baseUrl: string, params: Record<string, unknown>) {
  return `${baseUrl}?${queryString.stringify(params)}`;
}
