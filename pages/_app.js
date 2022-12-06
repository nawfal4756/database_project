import { SessionProvider } from "next-auth/react";
import AppBarComp from "../Components/AppBarComp";
import styles from "../styles/Global.module.css";
function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <SessionProvider session={pageProps.session}>
        <AppBarComp />
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
