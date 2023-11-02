import { ShoppingCartOutlined } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export const BottomBar = () => {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}
      >
        <IconButton onClick={() => navigate("/cart")}>
          <ShoppingCartOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
};
