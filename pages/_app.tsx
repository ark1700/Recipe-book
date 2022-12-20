import React, {FC} from 'react';
import {AppProps} from 'next/app';

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    <Component {...pageProps} />
);

export default WrappedApp;
