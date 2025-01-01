import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm p-4">
        <div>
          <img src={assets.logo} className="mb-2 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            you use the default styles without any breakpoint prefix
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>(+84)968-146-460</li>
            <li>mr.linh1090@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 @ linhshop.com - All Right Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
