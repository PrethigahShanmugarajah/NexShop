import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-primary uppercase text-2xl">
        {text1} <span className="text-black font-medium text-2xl">{text2}</span>
      </p>

      <p className="w-8 sm:w-12 h-px sm:h-0.5 bg-primary "></p>
    </div>
  );
};

export default Title;
