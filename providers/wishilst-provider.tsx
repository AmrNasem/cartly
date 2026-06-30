"use client";

import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  ReactNode,
} from "react";

type WishlistCount = number;
type WishlistContextType = {
  wishlistCount: WishlistCount;
  setWishlistCount: Dispatch<SetStateAction<WishlistCount>>;
};

export const WishlistContext = createContext<WishlistContextType | null>(null);

function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistCount, setWishlistCount] = useState<WishlistCount>(0);
  return (
    <WishlistContext.Provider value={{ wishlistCount, setWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
