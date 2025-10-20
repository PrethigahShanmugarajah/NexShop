import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContext);

  // const bankAccounts = [
  //   { name: "Bank of Ceylon", account: "123-456-7890" },
  //   { name: "Commercial Bank", account: "234-567-8901" },
  //   { name: "Sampath Bank", account: "345-678-9012" },
  //   { name: "Hatton National Bank", account: "456-789-0123" },
  //   { name: "Peoples Bank", account: "567-890-1234" },
  // ];

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* ---------------- LEFT ---------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information "} />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-borderColor transition"
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-borderColor transition"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-borderColor transition"
          required
        />

        <input
          type="text"
          placeholder="Address Line 1"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-borderColor transition"
          required
        />

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Address Line 2"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-borderColor transition"
            required
          />

          <input
            type="text"
            placeholder="Address Line 3"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-borderColor transition"
          />
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Postal Code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-borderColor transition"
            required
          />

          <input
            type="text"
            placeholder="District"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-borderColor transition"
            required
          />
        </div>

        <input
          type="number"
          placeholder="Phone Number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-borderColor transition"
          required
        />
      </div>

      {/* ---------------- RIGHT ---------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />

          {/* -------- PAYMENT METHOD SELECTION -------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-primary" : ""
                }`}
              ></p>

              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-primary" : ""
                }`}
              ></p>

              <img src={assets.razorpay_logo} alt="" className="h-5 mx-4" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-primary" : ""
                }`}
              ></p>

              <p className="text-gray-500 text-sm font-medium mx-4 uppercase">
                Cash On Delivery
              </p>
            </div>
          </div>

          {/* -------- PAYMENT METHOD SELECTION -------- */}
          {/* <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("bank")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "bank" ? "bg-primary" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4 uppercase">
                  Bank Transfer
                </p>
              </div>

              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-primary" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4 uppercase">
                  Cash On Delivery
                </p>
              </div>
            </div>

            {method === "bank" && (
              <div className="border p-3 mt-2 flex flex-col gap-1 text-gray-600 text-sm">
                {bankAccounts.map((bank, idx) => (
                  <p key={idx}>
                    {bank.name} - A/C: {bank.account}
                  </p>
                ))}
              </div>
            )}

            {method === "cod" && (
              <div className="border p-3 mt-2 text-gray-600">
                <p>Pay with cash upon delivery of your order.</p>
              </div>
            )}
          </div> */}

          <div className="w-full text-end mt-8">
            <button
              onClick={() => navigate("orders")}
              className="bg-primary hover:bg-primary-dull text-white px-16 py-3 text-sm cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
