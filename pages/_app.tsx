import React, {FC} from 'react';
import {AppProps} from 'next/app';
import { theme } from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SessionProvider } from 'next-auth/react'

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    <>
        <SessionProvider session={pageProps.session}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    </>
);

export default WrappedApp;
