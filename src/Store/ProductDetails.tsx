import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

import theme from "../Theme/Theme";
import { CaCartItem, CaProduct } from "../Types/interfaces";

export const ProductDetails = ({ products }: { products: CaProduct[] }) => {
  const { id } = useParams<{ id: string }>();
  const [count, setCount] = useState<number>(1);
  const [cart, setCart] = useLocalStorageState("cart", {});
  const product: CaProduct | undefined = products.find(
    (p) => id && p.id === id
  );
  if (!product) {
    return <div>Product not found</div>;
  }
  const addToCart = (product: CaCartItem): void => {
    const productId = product.id;
    setCart((prevCart: CaCartItem) => ({
      ...prevCart,
      [productId]: {
        ...product,
        quantity: count,
        tax: 0.19,
        price: product.price,
        totalPrice: product.price * Number(product.quantity) * 1.19,
        createdAt: new Date(),
        id: productId ?? "",
      },
    }));
  };
  const handleChange = (value: number) => {
    setCount(value);
  };
  const isInCart = (productId: string): boolean =>
    Object.keys(cart || {}).includes(productId.toString());

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card
        variant="outlined"
        sx={{
          width: 500,
          m: 2,
          borderRadius: 5,
          backgroundColor: "transparent",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={product.imageUrl}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Price: ${product.price}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Box>
            <Button
              variant="outlined"
              sx={{
                color: theme.palette.primary.main,
                borderRadius: 50,
                ml: 1,
                mb: 1,
              }}
              disabled={isInCart(product.id)}
              onClick={() => {
                const cartItem: CaCartItem = {
                  ...product,
                  tax: 0.19 * Number(count), // 19% tax
                  quantity: count,
                };
                addToCart(cartItem);
              }}
            >
              Add to Cart
            </Button>
          </Box>
          <Box>
            <Select
              disabled={isInCart(product.id)}
              sx={{ borderRadius: 50 }}
              fullWidth
              label="Count"
              onChange={(e) => handleChange(e.target.value as number)}
            >
              {[...Array(10)].map((_, index) => (
                <MenuItem key={index} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
