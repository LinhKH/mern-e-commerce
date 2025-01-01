import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    const bestseller = products.filter(
      (product) => product.bestseller === true
    );
    setBestseller(bestseller.slice(0, 5));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="Best" text2="Seller" />
        <p className="w-3/4 text-xs m-auto sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non
          mollitia architecto ratione animi cumque autem consectetur sapiente
          debitis nulla.
        </p>
      </div>
      {/* PRODUCT ITEMS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestseller.map((product) => (
          <ProductItem key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
