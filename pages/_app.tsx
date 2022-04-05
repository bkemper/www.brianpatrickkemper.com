import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ChakraProvider } from '@chakra-ui/react';
import TagManager from 'react-gtm-module';
import theme from '../theme';

// yuck!
import '@fontsource/raleway/100.css';
import '@fontsource/raleway/100-italic.css';
import '@fontsource/raleway/200.css';
import '@fontsource/raleway/200-italic.css';
import '@fontsource/raleway/300.css';
import '@fontsource/raleway/300-italic.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/400-italic.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/500-italic.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/600-italic.css';
import '@fontsource/raleway/700.css';
import '@fontsource/raleway/700-italic.css';
import '@fontsource/raleway/800.css';
import '@fontsource/raleway/800-italic.css';
import '@fontsource/raleway/900.css';
import '@fontsource/raleway/900-italic.css';

const gtmId = process.env.GOOGLE_TAG_MANAGER_ID;

if (typeof window !== 'undefined' && gtmId) {
  TagManager.initialize({ gtmId });
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
