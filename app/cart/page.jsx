"use client";

import { useCart } from "@/Context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-medium">₹{item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold">Total: ₹{total}</p>
          </div>
        </div>
      )}
    </div>
  );
}
