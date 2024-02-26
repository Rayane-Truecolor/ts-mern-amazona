import  { ApiError } from './types/ApiError'
import { CartItem } from './types/Cart';
import { Product } from './types/Product';

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

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1
  }
  
  return cartItem
}
