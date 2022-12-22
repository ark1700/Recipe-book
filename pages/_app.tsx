import React, {FC} from 'react';
import {AppProps} from 'next/app';
import { theme } from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    </>
);

export default WrappedApp;
