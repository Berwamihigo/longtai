interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onAddToCart: (id: number) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-[#e5a666] font-bold text-xl">${price.toFixed(2)}</p>
        <button
          onClick={() => onAddToCart(id)}
          className="mt-4 w-full bg-[#e5a666] text-white py-2 rounded-lg hover:bg-[#d88f44] transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} 