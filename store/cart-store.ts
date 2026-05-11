import { CartState } from "@/lib/types/cart.types";
import { CartCouponDTO } from "@/lib/types/coupon.types";
import { CartItemDTO } from "@/lib/types/product.types";
import { create } from "zustand";

interface CartStore {
  cart: CartState;
  setCart: (cart: CartState) => void;
  addToCart: (product: CartItemDTO) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setAppliedCoupon: (appliedCoupon?: CartCouponDTO) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: {
    items: null,
    cartId: null,
    appliedCoupon: null,
  },
  setCart: (cart: CartState) => {
    console.log("CartStore: ", cart);
    set({ cart })
  },
  addToCart: (cartItem) => {
    const cart = get().cart;
    if (!cart.items)
      return set({
        cart: {
          ...cart,
          items: [cartItem],
        },
      });

    const existing = cart.items.find((item) => item.id === cartItem.id);

    if (existing)
      set({
        cart: {
          ...cart,
          items: cart.items.map((item) =>
            item.id === existing.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        },
      });
    else set({ cart: { ...cart, items: [...cart.items, cartItem] } });
  },
  removeFromCart: (productId) => {
    const cart = get().cart;
    if (!cart.items) return;
    set({ cart: { ...cart, items: cart.items.filter((item) => item.product.id !== productId) } });
  },
  updateQuantity: (productId, quantity) => {
    const cart = get().cart;
    if (!cart.items) return;
    set({
      cart: {
        ...cart, items: cart.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        )
      },
    });
  },
  setAppliedCoupon: (appliedCoupon) => {
    const cart = get().cart;
    set({ cart: { ...cart, appliedCoupon: appliedCoupon || null } })
  }
}));
