import { Box } from '@mui/material';
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AppBar } from './Components/AppBar';
import theme from './Theme/Theme';
import withRoot from './Theme/withRoot';
import { AboutUs } from './Views/AboutUs';
import { Contact } from './Views/Contact';
import { HeroView } from './Views/HeroView';
import { Ratings } from './Views/Ratings';

const Main = () => {
    return (
        <>
            <Box sx={{
                backgroundColor: theme.palette.primary.main
            }}>
                <AppBar />
                <Routes>
                    <Route path="/" element={<><HeroView /><Ratings /></>} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Box>
        </>
    )
}

export default withRoot(Main);
