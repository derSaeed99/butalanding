import { Grid } from "@mui/material";
import React from "react";
import useLocalStorageState from "use-local-storage-state";

import { CartWidget } from "../Components/CartWidget";

export const BottomBar = () => {
  const [cart] = useLocalStorageState("cart", {});

  const productsCount: number = Object.keys(cart || {}).length;
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}
      >
        <CartWidget productsCount={productsCount} />
      </Grid>
    </Grid>
  );
};
