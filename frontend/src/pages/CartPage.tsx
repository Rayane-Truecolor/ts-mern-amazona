import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import { CartItem } from '../types/Cart'

export default function CartPage() {
  const navigate = useNavigate()

  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store)

  const updateCartHandler = async (item: CartItem, quantity: number) => {
    if (item.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
  }
}
