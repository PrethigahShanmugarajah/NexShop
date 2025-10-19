import React from "react";

const NewsLetter = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>

      <p className="text-gray-400 mt-3">
        Subscribe to our newsletter and stay updated with the latest products,
        exclusive deals, and special offers delivered straight to your inbox.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 border-borderColor"
      >
        <input
          type="email"
          placeholder="Enter you email"
          className="w-full sm:flex-1 outline-none"
          required
        />

        <button
          type="submit"
          className="bg-primary text-white text-xs px-10 py-4 uppercase"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
