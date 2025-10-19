import React from "react";
import { assets } from "../assets/assets";
import { BadgeCheck, Headphones, Repeat } from "lucide-react";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        {/* <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" /> */}
        <Repeat className="w-12 h-12 m-auto mb-5 text-black" />

        <p className="font-semibold">Easy Exchange Policy</p>

        <p className="text-gray-400">
          Exchange your products effortlessly within 30 days if they don’t meet
          your expectations. Hassle-free and fast process.
        </p>
      </div>

      <div>
        {/* <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" /> */}
        <BadgeCheck className="w-12 h-12 m-auto mb-5 text-black" />

        <p className="font-semibold">7 Days Return Policy</p>

        <p className="text-gray-400">
          Return any product within 7 days of delivery for a full refund. Quick,
          simple, and reliable.
        </p>
      </div>

      <div>
        {/* <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" /> */}
        <Headphones className="w-12 h-12 m-auto mb-5 text-black" />

        <p className="font-semibold">Best Customer Support</p>

        <p className="text-gray-400">
          Our support team is available 24/7 to help you with any queries,
          ensuring a smooth and satisfying shopping experience.
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
