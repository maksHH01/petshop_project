import { useDispatch, useSelector } from "react-redux";
import TitlePlusBtn from "../../../components/titlePlusBtn";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../../../redux/slices/productSlice";
import ProductItem from "../../../components/productItem";

function SaleSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className={`${styles.salesContainer} wrapper`}>
      <TitlePlusBtn
        title={"Sale"}
        buttonText={"All sales"}
        buttonLink={"/sales"}
      />
      <ul className={styles.list}>
        {items
          .filter((item) => item.discont_price && item.discont_price !== 0)
          .slice(0, 4)
          .map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              discont_price={item.discont_price}
            />
          ))}
      </ul>
    </section>
  );
}

export default SaleSection;
