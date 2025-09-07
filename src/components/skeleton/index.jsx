import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonLoader({
  count = 3,
  width = "100%",
  height = 316,
}) {
  return (
    <Box sx={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} sx={{ width: width }}>
          <Skeleton
            variant="rectangular"
            width={width}
            height={height}
            animation="wave"
          />
          <Skeleton width="60%" animation="wave" sx={{ mt: 1 }} />
        </Box>
      ))}
    </Box>
  );
}
