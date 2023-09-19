import App from "App";
import "./App.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "reportWebVitals";
import { GlobalStyles } from "twin.macro";
import { Helmet, HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <StrictMode>
        <HelmetProvider>
            <Helmet prioritizeSeoTags>
                <title>Blendon Barber Shop</title>
                <meta
                    name="description"
                    content="Blendon Barber Shop è un barbiere di Rivoli, (To) gestito da Luca Frasca"
                />
                <link
                    rel="apple-touch-icon"
                    href="https://blendon-barber-shop.it/favicon.svg"
                />
                <link
                    rel="manifest"
                    href="https://blendon-barber-shop.it/manifest.json"
                />
                <meta name="robots" content="index, follow" />
                <meta
                    property="og:url"
                    content="https://blendon-barber-shop.it"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Blendon Barber Shop" />
                <meta
                    property="og:description"
                    content="Blendon Barber Shop è un barbiere di Rivoli, (To) gestito da Luca Frasca"
                />
                <meta
                    property="og:image"
                    content="https://blendon-barber-shop.it/favicon.svg"
                />
            </Helmet>
            <App />
            <GlobalStyles />
        </HelmetProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
