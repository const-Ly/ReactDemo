import { useState } from "react";
import AppRouter from "./routes";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
}

export default App;
