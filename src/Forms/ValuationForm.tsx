import { Button, FormControl, Grid, InputLabel, MenuItem, Rating, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import React, { useState } from 'react'

import { firebaseAddProductsValuations } from '../firebase';
import theme from '../Theme/Theme';
import { productTypesEnum } from '../Types/enum';
import { ValuationFormValues } from '../Types/interfaces'

export const ValuationForm = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [, setValuation] = useState<ValuationFormValues>()
    const [tasteRatingValue, setTasteRatingValue] = useState<number | null>(0)
    const [cookingExperience, setCookingExperience] = useState<number | null>(0)
    const [packaging, setPackaging] = useState<number | null>(0)
    const [spices, setSpices] = useState<number | null>(0)
    const [total, setTotal] = useState<number | null>(0)
    const [productType, setProductType] = useState("")
    const [reciepe, setReciepe] = React.useState('');


    const handleClose = () => {
        setOpen(false)
    }
    const onClickOpen = () => {
        setOpen(true)
    }

    const initialValues: ValuationFormValues = {
        productType: productType || "",
        productName: "",
        taste: tasteRatingValue || 0,
        spices: spices || 0,
        cookingExperience: cookingExperience || 0,
        receipeChoice: reciepe || "",
        packaging: packaging || 0,
        message: "",
        total: total || 0,
    }

    const labels: { [index: string]: string } = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    function getLabelText (value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    return (
        <>
            <Button onClick={onClickOpen} variant="contained" color="success" sx={{ borderRadius: 50 }}>
                <Typography variant="body2" sx={{ color: theme.palette.primary.light }}>Bewertungabgeben</Typography>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <Formik initialValues={initialValues} onSubmit={async (values: ValuationFormValues) => {
                        setValuation(values)
                        await firebaseAddProductsValuations(initialValues)
                    }}>
                        <Form>
                            <Grid container display="flex"
                                alignItems="flex-start"
                                justifyContent="flex-start"
                                flexDirection="column"
                                rowSpacing={0.5}>
                                <Grid item >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Produkt Art</InputLabel>
                                        <Select
                                            sx={{
                                                [`& fieldset`]: {
                                                    borderRadius: 50,
                                                    width: 220
                                                },
                                                [`& .MuiSelect-select`]: {
                                                    width: 180,
                                                }
                                            }}
                                            type="select"
                                            label="Produkt Art"
                                            value={productType}
                                            onChange={(event: SelectChangeEvent) => setProductType(event.target.value as string)}
                                        >
                                            {Object.values(productTypesEnum).map((type, index) =>
                                                <MenuItem value={type} key={index}>{type}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item >
                                    <Typography>Geschmack</Typography>
                                    <Rating getLabelText={getLabelText} value={tasteRatingValue}
                                        precision={0.5} onChange={(event, value) => setTasteRatingValue(value)}
                                    />
                                </Grid>
                                <Grid item >
                                    <Typography>Kocherfahrung</Typography>
                                    <Rating getLabelText={getLabelText} value={cookingExperience}
                                        precision={0.5} onChange={(event, value) => setCookingExperience(value)}
                                    />
                                </Grid>
                                <Grid item >
                                    <Typography>Würze</Typography>
                                    <Rating getLabelText={getLabelText} value={spices}
                                        precision={0.5} onChange={(event, value) => setSpices(value)}
                                    />
                                </Grid>
                                <Grid item >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Rezeptwahl</InputLabel>
                                        <Select
                                            sx={{
                                                [`& fieldset`]: {
                                                    borderRadius: 50,
                                                },
                                                [`& .MuiSelect-select`]: {
                                                    width: 180,
                                                }
                                            }}
                                            type="select"
                                            label="Rezeptwahl"
                                            autoWidth
                                            value={reciepe}
                                            onChange={(event: SelectChangeEvent) => {
                                                setReciepe(event.target.value as string);
                                            }}
                                        >

                                            <MenuItem value={"Buta-Rezept"}>Buta-Rezept</MenuItem>
                                            <MenuItem value={"Eignes Rezept"}>Eignes Rezept</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item >
                                    <Typography>Verpackung</Typography>
                                    <Rating getLabelText={getLabelText} value={packaging}
                                        precision={0.5} onChange={(event, value) => setPackaging(value)}
                                    />
                                </Grid>
                                <Grid item >
                                    <Field sx={{
                                        [`& fieldset`]: {
                                            borderRadius: 50
                                        }
                                    }} name="message" label="Noch was..?" type="text" component={TextField} />
                                </Grid>
                                <Grid item >
                                    <Typography>Gesamtbewertung</Typography>
                                    <Rating getLabelText={getLabelText} value={total}
                                        precision={0.5} onChange={(event, value) => setTotal(value)}
                                    />
                                </Grid>
                                <DialogActions>
                                    <Grid item>
                                        <Button onClick={handleClose} sx={{ borderRadius: 50, mt: 2, color: theme.palette.primary.dark }}>Abbrechen</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" sx={{ borderRadius: 50, mt: 2 }} color="success" type="submit">
                                            Absenden
                                        </Button>
                                    </Grid>
                                </DialogActions>
                            </Grid>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    )
}
