import CustomBreadcrumbs from "../../components/breadcrumb/index";

function Sales() {
  const itemsBreadcrumb = [
    { path: "/", label: "Main Page" },
    { label: "All Sales" },
  ];
  return (
    <>
      <CustomBreadcrumbs items={itemsBreadcrumb} />
      <h1>Sales Container</h1>
    </>
  );
}

export default Sales;
