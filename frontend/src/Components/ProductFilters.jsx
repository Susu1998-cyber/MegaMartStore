const categories = [
  "Mobile",
  "Cosmetics",
  "Electronics",
  "Furniture",
  "Watches",
  "Decor",
  "Accessories",
];

const ProductFilters = ({ filters, setFilters }) => {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const clearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      // category: "",
       category: " ",
      minPrice: "",
      maxPrice: "",
      sort: "",
      page: 1,
    }));
  };

  return (
    <div className="mb-8 rounded-xl border bg-white p-4 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Category */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-600">
            Category
          </label>

          <select
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-cyan-500"
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Minimum Price */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-600">
            Min Price
          </label>

          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            placeholder="₹0"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-cyan-500"
          />
        </div>

        {/* Maximum Price */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-600">
            Max Price
          </label>

          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            placeholder="₹100000"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-cyan-500"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-600">
            Sort By
          </label>

          <select
            value={filters.sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-cyan-500"
          >
            <option value="">Latest</option>

            <option value="price_asc">Price: Low to High</option>

            <option value="price_desc">Price: High to Low</option>

            <option value="name_asc">Name: A-Z</option>

            <option value="name_desc">Name: Z-A</option>
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
