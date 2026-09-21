import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getProducts } from "../services/api";
import ProductFilters from "../Components/ProductFilters";
import ProductCard from "../Components/ProductCard";
import Loader from "../Components/Loader";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search comes from Navbar
  const q = searchParams.get("q") || "";

  const location = useLocation();

  // Filters come from ProductFilters
  const category = searchParams.get("category") || "";

  const minPrice = searchParams.get("minPrice") || "";

  const maxPrice = searchParams.get("maxPrice") || "";

  const sort = searchParams.get("sort") || "";

  const page = Number(searchParams.get("page")) || 1;

  // Only filter values passed to ProductFilters
  const filters = {
    category,
    minPrice,
    maxPrice,
    sort,
    page,
  };

  // Update filters in URL
  const setFilters = (updater) => {
    const currentFilters = {
      category,
      minPrice,
      maxPrice,
      sort,
      page,
    };

    const updatedFilters =
      typeof updater === "function" ? updater(currentFilters) : updater;

    const params = new URLSearchParams(searchParams);

    // Category
    if (updatedFilters.category) {
      params.set("category", updatedFilters.category);
    } else {
      params.delete("category");
    }

    // Min price
    if (updatedFilters.minPrice) {
      params.set("minPrice", updatedFilters.minPrice);
    } else {
      params.delete("minPrice");
    }

    // Max price
    if (updatedFilters.maxPrice) {
      params.set("maxPrice", updatedFilters.maxPrice);
    } else {
      params.delete("maxPrice");
    }

    // Sort
    if (updatedFilters.sort) {
      params.set("sort", updatedFilters.sort);
    } else {
      params.delete("sort");
    }

    // Page
    if (updatedFilters.page > 1) {
      params.set("page", String(updatedFilters.page));
    } else {
      params.delete("page");
    }

    setSearchParams(params);
  };

  // Get products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts({
          q,
          category,
          minPrice,
          maxPrice,
          sort,
          page,
          limit: 12,
        });

        setProducts(response.data || []);
        setPagination(response.pagination || {});
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [q, category, minPrice, maxPrice, sort, page]);

  const changePage = (newPage) => {
    const params = new URLSearchParams(searchParams);

    if (newPage > 1) {
      params.set("page", String(newPage));
    } else {
      params.delete("page");
    }

    setSearchParams(params);
  };

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      {/* FILTERS */}
      <ProductFilters filters={filters} setFilters={setFilters} />
      <div className="mb-5 flex items-end justify-between">
        <div className="inline-block">
          <h2 className="text-lg font-semibold">
            Grab the best deal on{" "}
            <span className="text-cyan-600">{category || "All Products"}</span>
            {/* <span className="text-cyan-600">MegaMart Products</span> */}
          </h2>

          <div className="mt-2 h-1 w-full rounded-full bg-cyan-600" />
        </div>

        <div className="flex items-center gap-4">
          {location.pathname !== "/" && (
            <Link
              to="/"
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-cyan-600"
            >
              <ArrowLeft size={15} />
              Back
            </Link>
          )}

          <Link
            to="/products"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-cyan-600"
          >
            View All
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Loading */}
      {loading && <Loader />}

      {/* Error */}
      {!loading && error && (
        <div className="my-10 rounded-lg bg-red-50 p-6 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && products.length === 0 && (
        <div className="my-10 rounded-xl border border-dashed p-12 text-center">
          <h2 className="font-semibold">No products found</h2>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* Products */}
      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from(
                {
                  length: pagination.totalPages,
                },
                (_, index) => index + 1,
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => changePage(pageNumber)}
                  className={`h-9 w-9 rounded-lg text-sm ${
                    page === pageNumber
                      ? "bg-cyan-600 text-white"
                      : "border bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default ProductList;
