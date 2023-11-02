import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

import { Product } from "../Types/interfaces";

export const products: Product[] = [
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

export const Store = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom sx={{ ml: 2 }}>
          Our Products
        </Typography>
      </Grid>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card onClick={() => handleProductClick(product.id)}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
                <Typography variant="h6" component="p">
                  Price: {product.price} €
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
