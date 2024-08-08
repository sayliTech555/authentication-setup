// import "./App.css";
import NavBar from "./components/Navbar";
import Login from "./page/Login";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./page/PrivateRoute";

import Product from "./page/Product";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
      </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
