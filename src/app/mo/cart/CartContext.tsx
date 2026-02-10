"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "../../../lib/mo/types";

type CartItem = {
  id: string;
  name: string;
  price?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  zone: string;
  note: string;
  paymentMethod: "efectivo" | "tigo" | "transferencia";
  pickupWindow: "mediodia" | "tarde" | "frio" | "";
};

type CartContextValue = CartState & {
  addItem: (product: Product, qty: number) => void;
  updateItemQty: (id: string, qty: number) => void;
  clearCart: () => void;
  setZone: (value: string) => void;
  setNote: (value: string) => void;
  setPaymentMethod: (value: CartState["paymentMethod"]) => void;
  setPickupWindow: (value: CartState["pickupWindow"]) => void;
  totalItems: number;
};

const CART_STORAGE_KEY = "yrs-mini-cart-v1";

const CartContext = createContext<CartContextValue | undefined>(undefined);

const safeParse = (payload: string | null): CartState | null => {
  if (!payload) return null;
  try {
    const parsed = JSON.parse(payload) as CartState;
    if (!Array.isArray(parsed.items)) return null;
    return {
      items: parsed.items.map((item) => ({
        id: String(item.id),
        name: String(item.name),
        price: item.price ? String(item.price) : undefined,
        qty: Number(item.qty) || 1,
      })),
      zone: typeof parsed.zone === "string" ? parsed.zone : "",
      note: typeof parsed.note === "string" ? parsed.note : "",
      paymentMethod:
        parsed.paymentMethod === "tigo" ||
        parsed.paymentMethod === "transferencia"
          ? parsed.paymentMethod
          : "efectivo",
      pickupWindow:
        parsed.pickupWindow === "mediodia" ||
        parsed.pickupWindow === "tarde" ||
        parsed.pickupWindow === "frio"
          ? parsed.pickupWindow
          : "",
    };
  } catch {
    return null;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [zone, setZone] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<CartState["paymentMethod"]>("efectivo");
  const [pickupWindow, setPickupWindow] =
    useState<CartState["pickupWindow"]>("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = safeParse(localStorage.getItem(CART_STORAGE_KEY));
    if (stored) {
      setItems(stored.items);
      setZone(stored.zone);
      setNote(stored.note);
      setPaymentMethod(stored.paymentMethod);
      setPickupWindow(stored.pickupWindow);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: CartState = { items, zone, note, paymentMethod, pickupWindow };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
  }, [items, zone, note, paymentMethod, pickupWindow, hydrated]);

  const addItem = useCallback((product: Product, qty: number) => {
    const safeQty = Number.isFinite(qty) && qty > 0 ? qty : 1;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + safeQty } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: safeQty,
        },
      ];
    });
  }, []);

  const updateItemQty = useCallback((id: string, qty: number) => {
    const safeQty = Number.isFinite(qty) ? qty : 0;
    setItems((prev) => {
      if (safeQty <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, qty: safeQty } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      zone,
      note,
      paymentMethod,
      pickupWindow,
      addItem,
      updateItemQty,
      clearCart,
      setZone,
      setNote,
      setPaymentMethod,
      setPickupWindow,
      totalItems,
    }),
    [
      items,
      zone,
      note,
      paymentMethod,
      pickupWindow,
      addItem,
      updateItemQty,
      clearCart,
      totalItems,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};
