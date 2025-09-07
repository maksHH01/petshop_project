import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CategoriesItem from "../../components/categoriesItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import SkeletonLoader from "../../components/skeleton";
import CustomBreadcrumbs from "../../components/breadcrumb";
import styles from "./styles.module.css";
import ProductItem from "../../components/productItem";

export const BASE_URL = "http://localhost:3333/categories";
export const PRODUCTS_URL = "http://localhost:3333/products/all";

function CategoriesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    items: categories,
    status,
    error,
  } = useSelector((state) => state.categories);
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const fetchCategory = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const { data } = await axios.get(`${BASE_URL}/${id}`);
        if (isMounted) setCategory(data.category);
      } catch {
        if (isMounted) setFetchError("Error loading category...");
        setCategory(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCategory();
    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const { data } = await axios.get(PRODUCTS_URL);
        if (isMounted) {
          const filtered = data.filter((p) => p.categoryId === Number(id));
          setProducts(filtered);
        }
      } catch {
        if (isMounted) setFetchError("Error loading products...");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const breadcrumbsItems = useMemo(() => {
    const base = [{ path: "/", label: "Main Page" }];
    base.push({ path: "/categories", label: "Categories" });
    if (category) base.push({ label: category.title });
    return base;
  }, [category]);

  if (status === "loading" || loading)
    return <SkeletonLoader count={4} width={316} />;
  if (status === "failed" || fetchError) return <h2>{error || fetchError}</h2>;
  if (!categories || categories.length === 0)
    return <h2>Categories not found</h2>;

  if (id && category) {
    return (
      <div className={styles.container}>
        <h2>{category.title}</h2>
        <ul className={styles.list}>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              discont_price={product.discont_price}
            />
          ))}
        </ul>
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
