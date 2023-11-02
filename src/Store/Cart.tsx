import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

import { CartItem } from "../Types/interfaces";

export const Cart = () => {
  const [cartItems] = useState<CartItem[]>([]);

  const renderCartItems = () => {
    return cartItems.map((item: CartItem) => {
      return (
        <Box key={item.id}>
          <Typography variant="h3">{item.title}</Typography>
          <Typography variant="body1">Price: ${item.price}</Typography>
          <Typography variant="body1">Quantity: {item.quantity}</Typography>
        </Box>
      );
    });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item: CartItem) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  return (
    <Box>
      <Typography variant="h2">Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Box>
          {renderCartItems()}
          <Typography variant="h3">
            Total Price: ${calculateTotalPrice()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
