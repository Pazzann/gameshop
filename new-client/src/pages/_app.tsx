import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthProvider from "../context/AuthContext";
import { Header } from "../components/Header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <div className="app">
      <Header />
      <Component {...pageProps} />
    </div>
  </AuthProvider>;
}

export default MyApp;
