"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import products from "@/assets/cartdata";
import { useCart } from "@/Context/CartContext"; 

export default function ProductDetail() {
  const { id } = useParams();
  const { cart, setCart } = useCart(); 

  const product = products.find((p) => p.id.toString() === id);
  if (!product) return <p>Product not found</p>;

  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.title} added to cart`);
  }

  return (
    <div className=" flex justify-center items-center bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg" style={{ height: 600 }}>
        <div className="relative  w-full  md:w-[30rem] h-64 md:h-full rounded-t-lg md:rounded-l-lg overflow-hidden">
          <Image src={product.image} alt={product.title} fill className="" />
        </div>

        <div className="flex flex-col justify-center p-6 md:p-8 w-full md:w-3/5 space-y-3 md:space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold text-indigo-900">₹{product.price}</p>
          <p className="text-blue-900">{product.reviews} ★ ★ ★ ★ ★</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-sm font-medium text-gray-600">
            Category: <span className="capitalize">{product.category}</span>
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-indigo-900 hover:bg-[#14213D] cursor-pointer text-white py-3 px-8 rounded-xl font-semibold w-max transition-colors self-start"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
