import { Outlet, useParams, useLocation } from "react-router-dom";
import CustomBreadcrumbs from "../breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/slices/categorySlice";
import styles from "./styles.module.css";

const PageLayout = ({ dynamicBreadcrumbs }) => {
  const dispatch = useDispatch();
  const { items: categories, status } = useSelector(
    (state) => state.categories
  );
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (status === "idle") dispatch(fetchCategories());
  }, [dispatch, status]);

  let breadcrumbsItems = [{ path: "/", label: "Main Page" }];

  if (location.pathname.startsWith("/categories")) {
    breadcrumbsItems.push({ path: "/categories", label: "Categories" });
  }

  if (id && categories.length > 0) {
    const category = categories.find((c) => c.id === Number(id));
    if (category) breadcrumbsItems.push({ label: category.title });
  }

  if (dynamicBreadcrumbs) {
    breadcrumbsItems = [...breadcrumbsItems, ...dynamicBreadcrumbs];
  }

  return (
    <div className={`${styles.container} wrapper`}>
      <CustomBreadcrumbs items={breadcrumbsItems} />
      <Outlet />
    </div>
  );
};

export default PageLayout;
