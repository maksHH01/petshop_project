import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductItem from "../../components/productItem";
import styles from "./styles.module.css";
import CategoryFilters from "../../components/componentFilters";

function Products() {
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

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h2>All Products</h2>
      <CategoryFilters />
      {products.length > 0 ? (
        <ul className={styles.list}>
          {products.map((product) => (
            <ProductItem key={product.id} {...product} from="/products" />
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default Products;
