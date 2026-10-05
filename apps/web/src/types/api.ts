export interface HealthResponse {
  status: 'ok' | 'error';
  version: string;
  timestamp: string;
}

export interface ReadyResponse {
  status: 'ready' | 'not_ready';
}

export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
