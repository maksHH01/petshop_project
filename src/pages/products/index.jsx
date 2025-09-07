import CustomBreadcrumbs from "../../components/breadcrumb/index";

function Products() {
  const itemsBreadcrumb = [
    { path: "/", label: "Main Page" },
    { label: "All Products" },
  ];
  return (
    <>
      <CustomBreadcrumbs items={itemsBreadcrumb} />
      <h1>Products Container</h1>
    </>
  );
}

export default Products;
