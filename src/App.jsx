import React from "react";
import AppRouter from "./routes";
import Layout from "./components/Layout";
import { AppProvider } from "./context";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <Layout>
        <AppRouter />
      </Layout>
    </AppProvider>
  );
}

export default App;
