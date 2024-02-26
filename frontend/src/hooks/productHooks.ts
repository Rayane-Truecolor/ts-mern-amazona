import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Product";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
  })



  //Sert a avoir les infossquand on clique sur produits

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['products', slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
  })

  

{/* useGetProductsQuery permet de remplacer 




type State = {
  products: Product[]
  loading: boolean
  error: string
}

type Action =
  | { type: 'FETCH_REQUEST' }
  | {
      type: 'FETCH_SUCCESS'
      payload: Product[]
    }
  | { type: 'FETCH_FAIL'; payload: string }

const initialState: State = {
  products: [],
  loading: true,
  error: '',
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
} par import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Product";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
})*/}