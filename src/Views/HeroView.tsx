import { Grid, Typography } from '@mui/material'
import React from 'react'

import ButaBox from '../buta_box.png'
import { ValuationForm } from '../Forms/ValuationForm'
import theme from '../Theme/Theme'
export const HeroView = () => {
  return (
    <>
      <Grid container display="flex" alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
        <Grid item sm={6} xs={12} sx={{
          display: "flex", alignItems: "center", justifyContent: "space-around", flexDirection: "column"
        }}>
          <Grid item>
            <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.dark }}>Wie finden Sie unser Product?</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.dark }}>Lassen Sie es uns doch wissen!</Typography>
          </Grid>
          <ValuationForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <img width="100%" height="auto" alt="buta-product-box" src={ButaBox} />
        </Grid>
      </Grid>
    </>
  )
}
