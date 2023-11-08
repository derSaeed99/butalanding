import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { AppBar } from "./Components/AppBar";
import { ProductDetails } from "./Store/ProductDetails";
import { Products, products } from "./Store/Products";
import theme from "./Theme/Theme";
import withRoot from "./Theme/withRoot";
import { BottomBar } from "./utils/BottomBar";
import { AboutUs } from "./Views/AboutUs";
import { CartView } from "./Views/CartView";
import { Contact } from "./Views/Contact";
import { HeroView } from "./Views/HeroView";
import { Ratings } from "./Views/Ratings";

const Main = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <AppBar />
        <BottomBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroView />
                <Ratings />
              </>
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:id"
            element={<ProductDetails products={products} />}
          />
          <Route path="/cart" element={<CartView />} />
        </Routes>
      </Box>
    </>
  );
};

export default withRoot(Main);
