import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { PRODUCTS_URL } from "../../redux/slices/productSlice";
import ProductInfo from "./productInfo";
import CustomBreadcrumbs from "../../components/breadcrumb";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${PRODUCTS_URL}/${id}`);

        const productData = data[0];
        setProduct(productData);

        if (productData.categoryId) {
          const { data: categoryData } = await axios.get(
            `http://localhost:3333/categories/${productData.categoryId}`
          );
          setCategory(categoryData.category || categoryData);
        }
      } catch (err) {
        setError("Error failed");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  const breadcrumbsItems = [
    { path: "/", label: "Main Page" },
    { path: "/categories", label: "Categories" },
  ];

  if (category) {
    breadcrumbsItems.push({
      path: `/categories/${category.id}`,
      label: category.title,
    });
  }

  breadcrumbsItems.push({ label: product.title });

  return (
    <div className="wrapper">
      <CustomBreadcrumbs items={breadcrumbsItems} />
      <ProductInfo
        title={product.title}
        image={product.image}
        price={product.price}
        discont_price={product.discont_price}
        description={product.description}
      />
    </div>
  );
}

export default ProductPage;
