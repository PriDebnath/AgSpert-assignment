import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import { Login } from "./pages/login";
import Registration from "./pages/registration";
import { SaleOrder } from "./pages/sale-order";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="registration" element={<Registration />} />
              <Route path="sale-order" element={<SaleOrder />} />
            </Route>
          </Routes>
        </BrowserRouter>{" "}
      </ChakraProvider>
    </>
  );
}

export default App;
