import { Outlet, useParams } from "react-router-dom";
import CustomBreadcrumbs from "../../components/breadcrumb";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

const CategoriesLayout = () => {
  const { items } = useSelector((state) => state.categories);
  const { id } = useParams();

  const breadcrumbsItems = [
    { path: "/", label: "Main Page" },
    { path: "/categories", label: "Categories" },
  ];

  if (id) {
    const category = items.find((c) => c.id === Number(id));
    if (category) breadcrumbsItems.push({ label: category.title });
  }

  return (
    <div className={`${styles.container} wrapper`}>
      <CustomBreadcrumbs items={breadcrumbsItems} />
      <Outlet />
    </div>
  );
};

export default CategoriesLayout;
