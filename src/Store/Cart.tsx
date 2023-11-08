import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Avatar,
  Box,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

import { TotalPriceCard } from "../Components/TotalPriceCard";
import theme from "../Theme/Theme";
import { CaCartItem } from "../Types/interfaces";

export const Cart = () => {
  const [, setCount] = useState<number>(1);
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [cart, setCart] = useLocalStorageState("cart", {});
  const location = useLocation();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, cart]);

  const handleChange = (value: number, product: CaCartItem) => {
    setCount(value);
    const productId = product.id;
    setCart((prevCart: CaCartItem) => ({
      ...prevCart,
      [productId]: {
        ...product,
        quantity: value,
        tax: 0.19,
        price: product.price,
        totalPrice: product.price * value * 1.19,
        createdAt: new Date(),
        id: productId ?? "",
      },
    }));
  };
  const handleRemoveProduct = (productId: string): void => {
    setCart((prevCart: any) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };
  const isInCart = (productId: string): boolean =>
    Object.keys(cart || {}).includes(productId.toString());

  const getProducts = () => Object.values(cart || {});
  const subTotal = getProducts().reduce(
    (accumulator: number, product) =>
      accumulator + product.price * product.quantity,
    0
  );
  const grandTotal = getProducts().reduce(
    (accumulator: number, product) => accumulator + product.totalPrice,
    0
  );
  const totalTax = grandTotal - subTotal;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: xs ? "column" : "row",
        mt: 2,
      }}
    >
      <Box width={xs ? "100%" : "60%"}>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ backgroundColor: theme.palette.primary.light }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Item</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Anzahl</TableCell>
                <TableCell align="right">Tax</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getProducts().map((product: CaCartItem) => (
                <TableRow key={product.id}>
                  <TableCell align="left" component="th" scope="row">
                    <Avatar
                      src={product.imageUrl}
                      sx={{ width: 50, height: 50, mb: 1 }}
                    />
                    {product.title}
                    <Typography sx={{ ml: 1 }} variant="caption">
                      {product.quantity}x
                    </Typography>
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {product.price.toFixed(2)} €
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    <Box sx={{ display: "flex", mr: -1 }}>
                      <Select
                        sx={{ borderRadius: 50 }}
                        fullWidth
                        label={product.quantity}
                        onChange={(e) =>
                          handleChange(e.target.value as number, product)
                        }
                      >
                        {options.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {isInCart(product.id) && (
                        <IconButton
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    19 %
                  </TableCell>
                  <TableCell align="right">
                    {product.totalPrice?.toFixed(2)} €
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ ml: 8, mt: { xs: 2, sm: 0 } }}>
        <TotalPriceCard
          subTotal={Number(toFixedWithoutRounding(subTotal, 2))}
          tax={Number(toFixedWithoutRounding(totalTax, 2))}
          total={Number(toFixedWithoutRounding(grandTotal, 2))}
        />
      </Box>
    </Box>
  );
};

function toFixedWithoutRounding(value: number, precision: number): string {
  const multiplier = Math.pow(10, precision || 0);
  return (Math.floor(value * multiplier) / multiplier).toFixed(precision);
}
