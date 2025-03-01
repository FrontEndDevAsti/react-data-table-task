import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  fetchProducts,
  setSearchTerm,
  setPageSize,
  setCurrentPage,
  setActiveTab
} from '../store/productsSlice';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import { Product } from '../types/types';

const columns = [
  { key: 'id', label: 'ID', filterable: true },
  { key: 'title', label: 'Title', filterable: true },
  { key: 'brand', label: 'Brand', filterable: true },
  { key: 'category', label: 'Category', filterable: true },
  { key: 'price', label: 'Price' },
  { key: 'rating', label: 'Rating' },
  { key: 'stock', label: 'Stock' },
  { key: 'discountPercentage', label: 'Discount' },
  { key: 'sku', label: 'Sku' },
  { key: 'weight', label: 'Weight' },
  { key: 'availabilityStatus', label: 'Availability' },
  { key: 'minimumOrderQuantity', label: 'Min Order' },
];

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    items, 
    total, 
    loading, 
    searchTerm, 
    pageSize, 
    currentPage,
    activeTab 
  } = useSelector((state: RootState) => state.products);

  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    dispatch(fetchProducts({ 
      limit: pageSize, 
      skip: (currentPage - 1) * pageSize,
      category: activeTab === 'LAPTOPS' ? 'laptops' : ''
    }));
  }, [dispatch, pageSize, currentPage, activeTab]);

  const handleFilterChange = (key: string, value: string) => {
    // Reset other filters when one is used (as per requirement)
    setFilters({ [key]: value });
  };

  const filteredData = items.filter((product) => {
    // First apply global search if present
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      const productValues = Object.values(product).map(val =>
        val ? val.toString().toLowerCase() : ''
      );
      if (!productValues.some(val => val.includes(searchTermLower))) {
        return false;
      }
    }
  
    // Then apply specific filters
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
  
      // TypeScript now knows that key is a valid key of Product
      const typedKey = key as keyof Product;
  
      // Special case for product's title filter
      if (typedKey === 'title' && value) {
        return product.title && product.title.toLowerCase().includes(value.toLowerCase());
      }
  
      // Special case for product's brand filter
      if (typedKey === 'brand' && value) {
        return product.brand && product.brand.toLowerCase().includes(value.toLowerCase());
      }
  
      // Special case for product's category filter
      if (typedKey === 'category' && value) {
        return product.category && product.category.toLowerCase().includes(value.toLowerCase());
      }
  
      // For other filters (like price, stock, etc.)
      return product[typedKey] && product[typedKey].toString().toLowerCase().includes(value.toLowerCase());
    });
  });
  

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="space-x-2">
          <button
            onClick={() => dispatch(setActiveTab('ALL'))}
            className={`px-4 py-2 cursor-pointer rounded ${
              activeTab === 'ALL' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => dispatch(setActiveTab('LAPTOPS'))}
            className={`px-4 py-2 cursor-pointer  rounded ${
              activeTab === 'LAPTOPS' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            Laptops
          </button>
        </div>
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(size) => dispatch(setPageSize(size))}
        searchTerm={searchTerm}
        onSearchChange={(term) => dispatch(setSearchTerm(term))}
        loading={loading}
        onFilterChange={handleFilterChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
};

export default Products;
