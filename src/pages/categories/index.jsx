import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchProducts } from "../../redux/slices/productSlice";
import SkeletonLoader from "../../components/skeleton";
import CategoriesItem from "../../components/categoriesItem";
import ProductItem from "../../components/productItem";
import CategoryFilters from "../../components/categoryFilters";
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

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    sort: 10,
    discountedOnly: false,
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!id) return [];

    let result = products.filter((p) => p.categoryId === Number(id));

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
  }, [products, id, filters]);

  const category = useMemo(
    () => categories.find((c) => c.id === Number(id)),
    [categories, id]
  );

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
        <CategoryFilters onChangeFilters={setFilters} />
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
