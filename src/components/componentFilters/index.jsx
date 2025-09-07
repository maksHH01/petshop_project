import { useState } from "react";
import styles from "./styles.module.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function CategoryFilters() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [sort, setSort] = useState(10);

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleMinChange = (event) => {
    const value = event.target.value;
    setMinPrice(value);
    if (onChange) {
      onChange({ min: value, max: maxPrice });
    }
  };

  const handleMaxChange = (event) => {
    const value = event.target.value;
    setMaxPrice(value);
    if (onChange) {
      onChange({ min: minPrice, max: value });
    }
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.priceFilters}>
        <p className={styles.title}>Price</p>
        <input
          className={styles.priceInputs}
          type="number"
          min="0"
          value={minPrice}
          onChange={handleMinChange}
          placeholder="from"
        />
        <input
          className={styles.priceInputs}
          type="number"
          min="0"
          value={maxPrice}
          onChange={handleMaxChange}
          placeholder="to"
        />
      </div>
      <div className={styles.discountsBox}>
        <p className={styles.title}>Discounted items</p>
        <input className={styles.discountsCheckBox} type="checkbox" />
      </div>
      <div className={styles.sortedBox}>
        <p className={styles.title}>Sorted</p>
        <FormControl sx={{ width: 200, height: 36 }}>
          <Select
            value={sort}
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    padding: "8px 16px",
                    fontSize: "16px",
                    color: "#8B8B8B",
                    minHeight: "auto",
                  },
                  "& .Mui-selected": {
                    color: "#282828",
                    backgroundColor: "transparent",
                  },
                },
              },
            }}
            sx={{
              "& .MuiSelect-select": {
                padding: "8px 36px 8px 16px",
                fontSize: "16px",
                color: "#282828",
                display: "flex",
                alignItems: "center",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #ddd",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #ddd",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #ddd",
              },
              height: "36px",
            }}
          >
            <MenuItem value={10}>by default</MenuItem>
            <MenuItem value={20}>newest</MenuItem>
            <MenuItem value={30}>price: high-low</MenuItem>
            <MenuItem value={40}>price: low-high</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default CategoryFilters;
