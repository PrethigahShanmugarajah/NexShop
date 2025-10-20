import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"Contact"} text2={"Us"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.Contact} alt="" className="w-full md:max-w-[480px]" />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>

          <p className="text-gray-500">
            No 123, Galle Road <br /> Colombo 03, Sri Lanka
          </p>

          <p className="text-gray-500">
            Tel:+94 111 222 3333 <br />
            nexshop@nexshop.com
          </p>

          <p className="font-semibold text-xl text-gray-600">
            Careers at NexShop
          </p>

          <p className="text-gray-500">
            Learn more about ore teams and job openings.
          </p>

          <button className="border border-borderColor px-8 py-4 text-sm hover:bg-primary-dull hover:text-white transition-all duration-500 cursor-pointer">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default Contact;
