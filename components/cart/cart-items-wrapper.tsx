import { fetchCart } from "@/actions/cart.action";
import CartItems from "./cart-items";

async function CartItemsWrapper({ className = "" }) {
  const cart = await fetchCart();
  const items = cart?.payload.products || [];

  return <CartItems items={items} className={className} />;
}

export default CartItemsWrapper