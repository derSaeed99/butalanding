import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

import { QuantitySelector } from "../Components/QuantitySelector";
import { TotalPriceCard } from "../Components/TotalPriceCard";
import theme from "../Theme/Theme";
import { CaCartItem } from "../Types/interfaces";

export const Cart = () => {
  const [cart, setCart] = useLocalStorageState("cart", {});
  const location = useLocation();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, cart]);

  const handleRemoveProduct = (productId: string): void => {
    setCart((prevCart: any) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const handleUpdateQuantity = (productId: string): void => {
    setCart((prevCart: any) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        updatedCart[productId] = {
          ...updatedCart[productId],
          quantity: updatedCart[productId].quantity,
        };
      }
      return updatedCart;
    });
  };
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
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {product.price.toFixed(2)} €
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    <QuantitySelector
                      product={product}
                      value={product.quantity}
                      productId={product.id}
                      onDelete={() => handleRemoveProduct(product.id)}
                      onChange={() => handleUpdateQuantity(product.id)}
                      options={[
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                      ]}
                    />
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {product.tax} %
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
