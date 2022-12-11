import { Box } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import AppBarComp from "../Components/AppBarComp";
function MyApp({ Component, pageProps }) {
  return (
    <Box sx={{ mt: 10 }}>
      <SessionProvider session={pageProps.session}>
        <AppBarComp />
        <Component {...pageProps} />
      </SessionProvider>
    </Box>
  );
}

export default MyApp;
