import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import questTheme from '../src/designTheme/MyDesignSystemLightTheme';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <HelmetProvider>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={questTheme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </StyledEngineProvider>
            </HelmetProvider>
        </>
    );
}