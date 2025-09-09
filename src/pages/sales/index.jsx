import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductItem from "../../components/productItem";
import CustomBreadcrumbs from "../../components/breadcrumb";
import CategoryFilters from "../../components/categoryFilters";
import styles from "./styles.module.css";

function Sales() {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    sort: 10,
    discountedOnly: true,
  });

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  const breadcrumbItems = [
    { path: "/", label: "Main Page" },
    { label: "All Sales" },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.discountedOnly) {
      result = result.filter(
        (p) => p.discont_price && p.discont_price < p.price
      );
    }

    if (filters.minPrice)
      result = result.filter(
        (p) => (p.discont_price || p.price) >= Number(filters.minPrice)
      );
    if (filters.maxPrice)
      result = result.filter(
        (p) => (p.discont_price || p.price) <= Number(filters.maxPrice)
      );

    switch (filters.sort) {
      case 20:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 30:
        result.sort(
          (a, b) => (b.discont_price || b.price) - (a.discont_price || a.price)
        );
        break;
      case 40:
        result.sort(
          (a, b) => (a.discont_price || a.price) - (b.discont_price || b.price)
        );
        break;
      default:
        break;
    }

    return result;
  }, [products, filters]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>{error}</p>;

  return (
    <div className={`${styles.container} wrapper`}>
      <CustomBreadcrumbs items={breadcrumbItems} />
      <h2>All Sales</h2>

      <CategoryFilters onChangeFilters={setFilters} />

      {filteredProducts.length > 0 ? (
        <ul className={styles.list}>
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} {...product} from="/sales" />
          ))}
        </ul>
      ) : (
        <p>No discounted products available.</p>
      )}
    </div>
  );
}

export default Sales;
