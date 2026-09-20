import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const fallbackImage =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80";

const ProductCard = ({ product }) => {
  const firstVariant = product.variants?.[0];

  const price = firstVariant?.price || 0;

  const image = product.images?.[0] || fallbackImage;

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.slug}`}>
        <div className="relative h-48 bg-gray-50 p-4">
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />

          {firstVariant?.stock > 0 && (
            <span className="absolute right-3 top-3 rounded bg-cyan-500 px-2 py-1 text-[10px] font-semibold text-white">
              IN STOCK
            </span>
          )}

          {firstVariant?.stock === 0 && (
            <span className="absolute right-3 top-3 rounded bg-red-500 px-2 py-1 text-[10px] font-semibold text-white">
              OUT OF STOCK
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="mb-1 text-xs text-gray-400">
          {product.brand || product.category}
        </p>

        <Link to={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-gray-800 hover:text-cyan-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-gray-900">
              ₹{price.toLocaleString()}
            </p>

            <p className="text-xs text-green-600">Free Delivery</p>
          </div>

          <Link
            to={`/products/${product.slug}`}
            className="rounded-full bg-cyan-50 p-2 text-cyan-600 transition hover:bg-cyan-600 hover:text-white"
          >
            <ShoppingCart size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
