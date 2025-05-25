"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/Context/CartContext";

export default function ProductGrid({ products }) {
  const { cart, setCart } = useCart();

  function addToCart(product) {
    const exists = cart.find(i => i.id === product.id);
    if (exists) {
      setCart(
        cart.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.title} added`);
  }

  if (!products.length) {
    return <p className="p-4 text-center">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map(p => (
        <div
          key={p.id}
          className="bg-white rounded-lg  flex flex-col text-sm"
        >
          <Link href={`/product/${p.id}`}>
            <div className="relative w-full h-64 sm:h-56 md:h-48 lg:h-56 xl:h-64 overflow-hidden rounded-t-lg">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw,
                       (max-width: 768px) 50vw,
                       (max-width: 1024px) 33vw,
                       25vw"
                priority={true}
              />
            </div>
            <div className="px-6 py-4 text-left">
              <h2 className="text-lg sm:text-xl font-semibold line-clamp-2">
                {p.title}
              </h2>
              <p className="text-gray-700 mt-2 text-base sm:text-lg">
                ₹{p.price}
              </p>
            </div>
          </Link>
          <button
            onClick={() => addToCart(p)}
            className="mt-auto mx-6 mb-6 bg-indigo-900 text-white text-md tracking-wider py-3 rounded-xl hover:bg-indigo-800 transition-colors"
            aria-label={`Add ${p.title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
