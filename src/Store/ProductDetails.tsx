import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

import { Product } from "../Types/interfaces";
import { products } from "./Store";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product: Product | undefined = products.find((p) => id && p.id === id);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card sx={{ maxWidth: "lg", width: 300 }}>
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="success" sx={{ borderRadius: 50 }}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
