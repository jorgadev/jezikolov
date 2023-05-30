import { ChakraProvider } from "@chakra-ui/react";

import { StoreContextProvider } from "@context/StoreContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <StoreContextProvider>
        <Component {...pageProps} />
      </StoreContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
