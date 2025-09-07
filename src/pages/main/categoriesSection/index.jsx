import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import TitlePlusBtn from "../../../components/titlePlusBtn";
import CategoriesItem from "../../../components/categoriesItem";
import styles from "./styles.module.css";
import { Box, IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../../../components/skeleton";

function CategoriesSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state) => state.categories);
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:3333/${imagePath}`;
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth / 4;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <section className={`${styles.categoriesContainer} `}>
      <div className="wrapper">
        <TitlePlusBtn
          title="Categories"
          buttonText="All Categories"
          buttonLink="/categories"
        />
      </div>
      <Box className={styles.carouselWrapper}>
        <IconButton
          onClick={() => scroll("left")}
          className={`${styles.scrollButton} ${styles.left}`}
        >
          <ArrowBackIos />
        </IconButton>

        {status === "loading" ? (
          <Box sx={{ position: "relative" }}>
            <SkeletonLoader
              count={items.length || 4}
              width={316}
              height={350}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </Box>
          </Box>
        ) : (
          <Box className={styles.carousel} ref={scrollRef}>
            {items.map((item) => (
              <CategoriesItem
                onClick={() => navigate(`/categories/${item.id}`)}
                key={item.id}
                image={getImageUrl(item.image)}
                title={item.title}
              />
            ))}
          </Box>
        )}
        <IconButton
          onClick={() => scroll("right")}
          className={`${styles.scrollButton} ${styles.right}`}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </section>
  );
}

export default CategoriesSection;
