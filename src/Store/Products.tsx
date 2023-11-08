import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router";
import useLocalStorageState from "use-local-storage-state";

import theme from "../Theme/Theme";
import { CaCartItem } from "../Types/interfaces";

export const products = [
  {
    id: "1",
    title: "Product 1",
    description: "This is the first product",
    price: 10,
    imageUrl: "https://picsum.photos/200/300",
    category: "Category 1",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Product 2",
    description: "This is the second product",
    price: 20,
    imageUrl: "https://picsum.photos/200/300",
    category: "Category 1",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Product 3",
    description: "This is the third product",
    price: 30,
    imageUrl: "https://picsum.photos/200/300",
    category: "Category 1",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Product 4",
    description: "This is the fourth product",
    price: 40,
    imageUrl: "https://picsum.photos/200/300",
    category: "Category 1",
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Product 5",
    description: "This is the fifth product",
    price: 50,
    imageUrl: "https://picsum.photos/200/300",
    category: "Category 1",
    createdAt: new Date(),
  },
  {
    id: "6",
    title: "Product 6",
    description: "This is the sixth product",
    price: 60,
    imageUrl: "https://picsum.photos/200/300",
    category: "Category 1",
    createdAt: new Date(),
  },
];

export const Products = () => {
  const [count, setCount] = useState<string>("1");
  const [cart, setCart] = useLocalStorageState("cart", {});
  const navigate = useNavigate();
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
  const handleChange = (value: string) => {
    setCount(value);
  };
  const isInCart = (productId: string): boolean =>
    Object.keys(cart || {}).includes(productId.toString());

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {products.map((product) => (
        <React.Fragment key={product.id}>
          <Card variant="outlined" sx={{ width: 500, m: 2, borderRadius: 5 }}>
            <CardContent>
              <CardMedia
                component="img"
                src={product.imageUrl}
                alt={product.title}
                height="194"
              />
              <Typography
                component={"div"}
                sx={{
                  mt: 1,
                  ml: 1,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                variant="h5"
                onClick={() => navigate(`${product.id}`)}
              >
                {product.title}
              </Typography>
              <Typography sx={{ mt: 1, ml: 1 }} variant="caption">
                {product.description}
              </Typography>
              <Typography gutterBottom sx={{ mt: 3, ml: 1 }} variant="h6">
                Price: {product.price} €
              </Typography>
              <Select
                disabled={isInCart(product.id)}
                sx={{ borderRadius: 50 }}
                fullWidth
                label="Count"
                onChange={(e) => handleChange(e.target.value as string)}
              >
                {[...Array(10)].map((_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </CardContent>
            <CardActions>
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
            </CardActions>
          </Card>
        </React.Fragment>
      ))}
    </Box>
  );
};
