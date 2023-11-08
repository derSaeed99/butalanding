import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import { CaCartItem, CaProduct } from "../Types/interfaces";
interface SelectProps {
  product: CaProduct;
  productId: string;
  value: string;
  onChange: (value: string) => void;
  onDelete?: (productId: string) => void;
  options: string[];
}

export const QuantitySelector = ({
  product,
  onChange,
  options,
  productId,
  value,
  onDelete,
}: SelectProps) => {
  const [count, setCount] = useState<string>(value);
  const [, setCart] = useLocalStorageState("cart", {});

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Box>
        <Select
          sx={{ borderRadius: 5 }}
          fullWidth
          label={value}
          value={count}
          onChange={(e) => {
            const productId = product.id;
            setCount(e.target.value as string);
            onChange(e.target.value as string);
            setCart((prevCart: CaCartItem) => ({
              ...prevCart,
              [productId]: {
                ...product,
                quantity: e.target.value,
                tax: 0.19 * Number(count),
                price: product.price,
                totalPrice: product.price * Number(count) * 1.19,
                createdAt: new Date(),
                id: productId ?? "",
              },
            }));
          }}
        >
          {options.map((option: string, index: number) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {onDelete && (
        <Box>
          <IconButton
            sx={{ mr: -1, ml: 1 }}
            onClick={() => onDelete(productId)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
