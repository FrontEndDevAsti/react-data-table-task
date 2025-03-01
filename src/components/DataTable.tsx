import { useState } from "react";
import { useLocation } from "react-router-dom"; // For detecting route
import { Search } from "lucide-react";
import { FaSortDown } from "react-icons/fa";

interface Column {
  key: string;
  label: string;
  filterable?: boolean;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  loading: boolean;
  onFilterChange?: (key: string, value: string) => void;
}

const DataTable = ({
  data,
  columns,
  pageSize,
  onPageSizeChange,
  searchTerm,
  onSearchChange,
  loading,
  onFilterChange,
}: DataTableProps) => {
  const location = useLocation(); // Get the current route
  const [showSearch, setShowSearch] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [showPageSize, setShowPageSize] = useState(false);
  const pageSizeOptions = [5, 10, 20, 50];

  // Detect if the current route is /products
  const isProductsPage = location.pathname === "/products";

  // Filters based on route
  const filters = isProductsPage
    ? [
        { key: "title", label: "Title" },
        { key: "brand", label: "Brand" },
        { key: "category", label: "Category" },
      ]
    : [
        { key: "firstName", label: "Name" },
        { key: "email", label: "Email" },
        { key: "birthDate", label: "Birth Date" },
        { key: "gender", label: "Gender" },
      ];

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { [key]: value };
    setActiveFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(key, value);
    }
  };

  const toggleFilter = (key: string) => {
    if (openFilter !== key) {
      setActiveFilters({});
      if (onFilterChange) {
        onFilterChange("", "");
      }
    }

    if (openFilter === key) {
      setOpenFilter(null);
    } else {
      setOpenFilter(key);
    }
  };

  const handleSearchBlur = () => {
    if (!searchTerm) {
      onSearchChange("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 flex flex-wrap justify-between items-center border-b">
        <div className="flex flex-wrap items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowPageSize(!showPageSize)}
              className="flex items-center cursor-pointer space-x-1 px-3 py-2 rounded hover:bg-gray-50"
            >
              <span className="text-sm font-medium">
                {pageSize} entries
              </span>
              <FaSortDown className="mb-1" />
            </button>
            {showPageSize && (
              <div className="absolute z-10 mt-1 bg-white border rounded shadow-lg w-30">
                {pageSizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      onPageSizeChange(size);
                      setShowPageSize(false);
                    }}
                    className="text-center w-full px-3 py-1 hover:bg-gray-100 rounded"
                  >
                    {size} entries
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-secondary rounded-full cursor-pointer"
            >
              <Search size={20} />
            </button>
            {showSearch && (
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search"
                className="border rounded px-2 py-1 text-sm w-32 sm:w-48"
                onBlur={handleSearchBlur}
              />
            )}
          </div>

          {/* Dropdown filters */}
          <div className="flex flex-wrap space-x-4 sm:space-x-6 mt-2 sm:mt-0">
            {filters.map((filter) => (
              <div key={filter.key} className="relative">
                <button
                  onClick={() => toggleFilter(filter.key)}
                  className="flex items-center cursor-pointer space-x-1 px-3 py-2 rounded hover:bg-gray-50"
                >
                  <span className="text-sm font-medium">{filter.label}</span>
                  <FaSortDown className="mb-1" />
                </button>
                {openFilter === filter.key && (
                  <div className="absolute z-10 mt-1 bg-white border rounded shadow-lg p-3 w-48">
                    {filter.key === "gender" ? (
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => handleFilterChange("gender", "male")}
                          className="text-left px-3 py-1 hover:bg-gray-100 rounded"
                        >
                          Male
                        </button>
                        <button
                          onClick={() => handleFilterChange("gender", "female")}
                          className="text-left px-3 py-1 hover:bg-gray-100 rounded"
                        >
                          Female
                        </button>
                        {activeFilters["gender"] && (
                          <button
                            onClick={() => handleFilterChange("gender", "")}
                            className="text-left px-3 py-1 text-red-500 hover:bg-gray-100 rounded"
                          >
                            Clear filter
                          </button>
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={activeFilters[filter.key] || ""}
                        onChange={(e) =>
                          handleFilterChange(filter.key, e.target.value)
                        }
                        placeholder={`Filter by ${filter.label.toLowerCase()}`}
                        className="border rounded px-3 py-1 text-sm w-40"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-tableHeader border-b border-gray-400">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-bold text-primary uppercase border border-gray-300"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center border border-gray-300"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center border border-gray-300"
                >
                  No data found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {columns.map((column) => (
                    <td
                      key={`${item.id}-${column.key}`}
                      className="px-6 py-4 text-sm border border-gray-300"
                    >
                      {item[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
