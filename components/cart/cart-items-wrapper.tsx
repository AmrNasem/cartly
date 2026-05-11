import { fetchCart } from "@/actions/cart.action";
import CartItems from "./cart-items";

async function CartItemsWrapper({ className = "" }) {
  const cart = (await fetchCart()).payload;

  return <CartItems cart={cart} className={className} />;
}

export default CartItemsWrapper