import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../Components/ProductCard";
import ProductFilters from "../Components/ProductFilters";
import Loader from "../Components/Loader";

const categories = [
  "Mobile",
  "Electronics",
  "Fashion",
  "Grocery",
  "Watches",
  "Furniture",
  "Beauty",
];

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "",
    q: searchParams.get("q") || "",
    page: Number(searchParams.get("page")) || 1,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts(filters);

        setProducts(response.data || []);
        setPagination(response.pagination || {});

        setSearchParams({
          ...Object.fromEntries(
            Object.entries(filters).filter(([, value]) => value !== ""),
          ),
        });
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, setSearchParams]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="my-10 rounded-lg bg-red-50 p-6 text-center text-sm text-red-600">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="my-10 rounded-xl border border-dashed p-12 text-center">
          <h2 className="font-semibold">No products found</h2>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-5 mt-8 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Grab the best deal on{" "}
              <span className="text-cyan-600">Smart Phones</span>
            </h2>
            <p className="text-sm text-gray-500">
              Page {pagination.page || 1} of {pagination.totalPages || 1}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center gap-2">
            {Array.from(
              {
                length: pagination.totalPages || 1,
              },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page,
                  }))
                }
                className={`h-9 w-9 rounded-lg text-sm ${
                  filters.page === page
                    ? "bg-cyan-600 text-white"
                    : "border bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default ProductList;
