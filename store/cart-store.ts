import { CartItemDTO } from "@/lib/types/product.types";
import { create } from "zustand";

interface CartStore {
  items: CartItemDTO[] | null;
  setCart: (products: CartItemDTO[]) => void;
  addToCart: (product: CartItemDTO) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: null,
  setCart: (products) => set({ items: products }),
  addToCart: (cartItem) => {
    const cartItems = get().items;
    if (!cartItems) return set({ items: [cartItem] });

    const existing = cartItems.find((item) => item.id === cartItem.id);

    if (existing)
      set({
        items: cartItems.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    else set({ items: [...cartItems, cartItem] });
  },
  removeFromCart: (productId) => {
    const cartItems = get().items;
    if (!cartItems) return;
    set({ items: cartItems.filter((item) => item.product.id !== productId) });
  },
  updateQuantity: (productId, quantity) => {
    const cartItems = get().items;
    if (!cartItems) return;
    set({
      items: cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    });
  },
}));
