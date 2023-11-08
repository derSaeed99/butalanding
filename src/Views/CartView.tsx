import { Box, Typography } from "@mui/material";
import React from "react";
import useLocalStorageState from "use-local-storage-state";

import { Cart } from "../Store/Cart";

export const CartView = () => {
  const [cart] = useLocalStorageState("cart", {});
  const emptyCart = Object.entries(cart || {}).length === 0;
  return emptyCart ? (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>Der Warenkorb ist noch leer</Typography>
    </Box>
  ) : (
    <Cart />
  );
};
