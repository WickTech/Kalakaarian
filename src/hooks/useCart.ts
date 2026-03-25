import { useState, useCallback, useEffect } from "react";
import { Influencer, CartItem } from "@/lib/store";
import { cartAPI } from "@/api/cart";
import { getErrorMessage } from "@/api/axios";

const CART_STORAGE_KEY = "kalakariaan_cart";

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

function loadFromLocalStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveToLocalStorage(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function useCart() {
  const [state, setState] = useState<CartState>({
    items: [],
    isLoading: true,
    error: null,
  });

  const fetchCart = useCallback(async () => {
    try {
      const response = await cartAPI.getCart();
      const items: CartItem[] = response.items.map((item) => ({
        influencer: item.influencer,
        quantity: item.quantity,
      }));
      saveToLocalStorage(items);
      setState({ items, isLoading: false, error: null });
    } catch {
      const localItems = loadFromLocalStorage();
      setState({ items: localItems, isLoading: false, error: null });
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(async (influencer: Influencer) => {
    const exists = state.items.some((i) => i.influencer.id === influencer.id);
    if (exists) return;

    const newItems = [...state.items, { influencer, quantity: 1 }];
    saveToLocalStorage(newItems);
    setState((prev) => ({ ...prev, items: newItems }));

    try {
      await cartAPI.addToCart(influencer.id);
    } catch (error) {
      console.error("Failed to sync cart to backend:", getErrorMessage(error));
    }
  }, [state.items]);

  const removeFromCart = useCallback(async (id: string) => {
    const newItems = state.items.filter((i) => i.influencer.id !== id);
    saveToLocalStorage(newItems);
    setState((prev) => ({ ...prev, items: newItems }));

    try {
      const item = state.items.find((i) => i.influencer.id === id);
      if (item) {
        await cartAPI.removeFromCart(item.influencer.id);
      }
    } catch (error) {
      console.error("Failed to sync cart to backend:", getErrorMessage(error));
    }
  }, [state.items]);

  const clearCart = useCallback(async () => {
    saveToLocalStorage([]);
    setState((prev) => ({ ...prev, items: [] }));

    try {
      await cartAPI.clearCart();
    } catch (error) {
      console.error("Failed to sync cart to backend:", getErrorMessage(error));
    }
  }, []);

  const isInCart = useCallback(
    (id: string) => state.items.some((i) => i.influencer.id === id),
    [state.items]
  );

  const total = state.items.reduce((sum, i) => sum + (i.influencer.price ?? 0), 0);

  return {
    items: state.items,
    isLoading: state.isLoading,
    error: state.error,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    total,
    count: state.items.length,
    refetch: fetchCart,
  };
}
