//استفاده از کتابخونه zustand
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  stock?: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void;
  decreaseQuantity: (id: string | number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalCount: number;
}


export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (newItem) => {
        const { items } = get();
        const qtyToAdd = newItem.quantity || 1;
        const existing = items.find((item) => item.id === newItem.id);

        const updatedItems = existing
          ? items.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + qtyToAdd }
              : item
          )
          : [...items, { ...newItem, quantity: qtyToAdd }];

        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
          totalCount: updatedItems.reduce((acc, i) => acc + i.quantity, 0),
        });
      },


      removeFromCart: (id) => {
        const updatedItems = get().items.filter((item) => item.id !== id);
        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
          totalCount: updatedItems.reduce((acc, i) => acc + i.quantity, 0),
        });
      },

      increaseQuantity: (id) => {
        const updatedItems = get().items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
          totalCount: updatedItems.reduce((acc, i) => acc + i.quantity, 0),
        });
      },

      decreaseQuantity: (id) => {
        const updatedItems = get()
          .items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0);

        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
          totalCount: updatedItems.reduce((acc, i) => acc + i.quantity, 0),
        });
      },

      clearCart: () => set({ items: [], totalPrice: 0, totalCount: 0 }),

      totalPrice: 0,
      totalCount: 0,
    }),
    {
      name: "mini_verse_cart",
    }
  )
);
