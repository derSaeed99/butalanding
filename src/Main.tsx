import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { AppBar } from "./Components/AppBar";
import { Cart } from "./Store/Cart";
import { ProductDetails } from "./Store/ProductDetails";
import { Store } from "./Store/Store";
import theme from "./Theme/Theme";
import withRoot from "./Theme/withRoot";
import { BottomBar } from "./utils/BottomBar";
import { AboutUs } from "./Views/AboutUs";
import { Contact } from "./Views/Contact";
import { HeroView } from "./Views/HeroView";
import { Ratings } from "./Views/Ratings";

const Main = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
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
          <Route path="/products" element={<Store />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Box>
    </>
  );
};

export default withRoot(Main);
