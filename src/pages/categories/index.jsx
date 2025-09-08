import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchProducts } from "../../redux/slices/productSlice";
import SkeletonLoader from "../../components/skeleton";
import CategoriesItem from "../../components/categoriesItem";
import ProductItem from "../../components/productItem";
import CategoryFilters from "../../components/componentFilters";
import styles from "./styles.module.css";

function CategoriesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    items: categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const {
    items: products,
    status: productsStatus,
    error: productsError,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!id) return [];
    return products.filter((p) => p.categoryId === Number(id));
  }, [products, id]);

  const category = useMemo(() => {
    return categories.find((c) => c.id === Number(id));
  }, [categories, id]);

  if (categoriesStatus === "loading" || productsStatus === "loading") {
    return <SkeletonLoader count={4} width={316} />;
  }

  if (categoriesStatus === "failed" || productsStatus === "failed") {
    return <h2>{categoriesError || productsError}</h2>;
  }

  if (id && category) {
    return (
      <div className={styles.container}>
        <h2>{category.title}</h2>
        <CategoryFilters />
        {filteredProducts.length > 0 ? (
          <ul className={styles.list}>
            {filteredProducts.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))}
          </ul>
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <ul className={styles.list}>
        {categories.map((cat) => (
          <CategoriesItem
            key={cat.id}
            title={cat.title}
            image={
              cat.image?.startsWith("http")
                ? cat.image
                : `http://localhost:3333/${cat.image}`
            }
            className={styles.categoryItem}
            onClick={() => navigate(`/categories/${cat.id}`)}
          />
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
