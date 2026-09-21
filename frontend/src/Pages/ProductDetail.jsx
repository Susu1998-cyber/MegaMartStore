import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { getProduct } from "../services/api";
import { addItem } from "../Redux/CartSlice";
import Loader from "../Components/Loader";

const fallbackImage =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const response = await getProduct(slug);

        setProduct(response.data);

        if (response.data?.variants?.length) {
          setSelectedVariant(response.data.variants[0]);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    if (!selectedVariant) return;

    try {
      setAdding(true);

      await dispatch(
        addItem({
          productId: product._id,
          variantId: selectedVariant._id,
          quantity,
        }),
      ).unwrap();

      navigate("/cart");
    } catch (err) {
      setError(err);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-red-500">{error || "Product not found"}</p>
      </div>
    );
  }

  const image = product.images?.[0] || fallbackImage;

  const maxStock = selectedVariant?.stock || 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-600"
      >
        <ArrowLeft size={17} />
        Back
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-gray-50 p-8">
          <img
            src={image}
            alt={product.name}
            className="max-h-[450px] w-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="py-3">
          <p className="text-sm text-cyan-600">
            {product.brand || product.category}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="mt-4 leading-7 text-gray-500">{product.description}</p>

          <div className="mt-6">
            <span className="text-3xl font-bold">
              ₹{selectedVariant?.price?.toLocaleString() || 0}
            </span>
          </div>

          {/* Variants */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold">Select Variant</h3>

            <div className="mt-3 flex flex-wrap gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant._id}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setQuantity(1);
                  }}
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    selectedVariant?._id === variant._id
                      ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                      : "border-gray-200"
                  }`}
                >
                  <span>{variant.size || "Standard"}</span>

                  {variant.color && (
                    <span className="ml-2 text-gray-500">
                      / {variant.color}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="mt-5">
            {maxStock > 0 ? (
              <p className="text-sm font-medium text-green-600">
                ✓ {maxStock} items available
              </p>
            ) : (
              <p className="text-sm font-medium text-red-500">Out of stock</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-medium">Quantity</span>

            <div className="flex items-center rounded-lg border">
              <button
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 disabled:opacity-30"
              >
                <Minus size={16} />
              </button>

              <span className="min-w-10 text-center">{quantity}</span>

              <button
                disabled={quantity >= maxStock || maxStock === 0}
                onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                className="p-3 disabled:opacity-30"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add Cart */}
          <button
            disabled={adding || !selectedVariant || maxStock === 0}
            onClick={handleAddToCart}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-4 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <ShoppingCart size={20} />

            {adding
              ? "Adding..."
              : maxStock === 0
                ? "Out of Stock"
                : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
