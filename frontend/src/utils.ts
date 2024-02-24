import  { ApiError } from './types/ApiError'

// Définition du type d'union pour Error et ApiError
type ErrorOrApiError = Error | ApiError;

// Modifiez la signature de la fonction getError pour accepter ErrorOrApiError
export function getError(error: ErrorOrApiError): string {
  if ('response' in error && error.response) {
    return error.response.data.message;
  } else {
    return error.message;
  }
}
