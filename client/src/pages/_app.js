import "@styles/bootstrap.css";
import "@styles/style.css";
import "@styles/responsive.css";

import { StoreContextProvider } from "@context/StoreContext";

function MyApp({ Component, pageProps }) {
  return (
    <StoreContextProvider>
      <Component {...pageProps} />
    </StoreContextProvider>
  );
}

export default MyApp;
