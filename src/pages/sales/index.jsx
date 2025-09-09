import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductItem from "../../components/productItem";
import CustomBreadcrumbs from "../../components/breadcrumb";
import styles from "./styles.module.css";
import CategoryFilters from "../../components/componentFilters";

function Sales() {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const itemsBreadcrumb = [
    { path: "/", label: "Main Page" },
    { label: "All Sales" },
  ];

  const discountedProducts = products.filter(
    (product) => product.discont_price && product.discont_price < product.price
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
    <div className={`${styles.container} wrapper`}>
      <CustomBreadcrumbs items={itemsBreadcrumb} />
      <h2>All Sales</h2>
      <CategoryFilters />
      {discountedProducts.length > 0 ? (
        <ul className={styles.list}>
          {discountedProducts.map((product) => (
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
