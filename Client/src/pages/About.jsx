import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.About} alt="" className="w-full md:max-w-[450px]" />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At <b>NexShop</b>, we believe online shopping should be simple,
            reliable, and enjoyable. Our platform brings together a wide range
            of trusted brands, ensuring that customers can find everything they
            need—from everyday essentials to exclusive products—all in one
            place.
          </p>

          <p>
            We are passionate about building a shopping experience that combines
            technology with convenience. From seamless navigation to secure
            checkout and quick delivery, every feature is designed to make your
            shopping journey smooth and satisfying.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to deliver quality, affordability, and trust through
            technology. We aim to empower both customers and sellers by
            providing a transparent and user-friendly digital marketplace that
            connects communities and simplifies commerce.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Every product listed on NexShop is carefully verified by our team to
            ensure it meets our quality standards. We partner only with trusted
            brands and sellers to guarantee that our customers receive authentic
            and durable products.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            From intuitive product filters to fast shipping and easy returns,
            we’ve built NexShop around the idea of saving your time and effort.
            Shop anytime, anywhere—with just a few clicks.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our support team is available to assist you every step of the way.
            Whether it’s tracking an order, handling a return, or answering a
            question, we’re committed to providing quick and friendly help to
            make sure you’re always satisfied.
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;
