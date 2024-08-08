import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import PersonalAssitanceMain from "./personalAssistance/PersonalAssitanceMain";

const Product = () => {
  const { token } = useAuth();
  const [tripdata, setTripData] = useState([]);

  useEffect(() => {
    // async function fetchPrivateRoute() {
    //   try {
    //     const response = await fetch(
    //       "https://wonderon-backend.vercel.app/products",
    //       {
    //         method: "GET",

    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );

    //     const data = await response.json();
    //     if (data && data.product.length > 0) {
    //       setTripData(data.product);
    //     }
    //   } catch (error) {
    //     console.error("Error submitting form:", error);
    //   }
    // }
    // fetchPrivateRoute();
  }, []);

  return (
    <div className="mt-20">
      <div className="privateRoute   items-center space-x-4 p-4">
        <PersonalAssitanceMain/>
      </div>
    </div>
  );
};

export default Product;
