"use client";

import { useCartStore } from "@/store/cart-store"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

function CartPageNavigator() {
  const cartItems = useCartStore(state => state.cart.items);
  return (
    <Link href="/cart" className="relative hover:bg-[#e9ebef] p-1 rounded-md duration-150 cursor-pointer">
      {cartItems?.length &&
        <span className="absolute bottom-full end-full translate-3 h-5 min-w-5 flex items-center justify-center text-white bg-primary/80 rounded-full p-1 text-[12px] font-semibold">{cartItems.length}</span>
      }
      <ShoppingCart className="size-4 text-foreground" />
    </Link>
  )
}

export default CartPageNavigator