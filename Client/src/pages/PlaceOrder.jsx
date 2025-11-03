import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { notify } from "../components/ToastProvider";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    products,
    cartItems,
    setCartItems,
    getCartAmount,
    getDeliveryFee,
    navigate,
    backendUrl,
    token,
  } = useContext(ShopContext);

  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    postalCode: "",
    district: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // console.log("Cart Items:", cartItems);
    // console.log("Available Products:", products);

    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];

          if (quantity > 0) {
            let productInfo = products.find(
              (product) => product.id === productId
            );

            if (!productInfo) {
              productInfo = products.find(
                (product) => product.id === parseInt(productId)
              );
            }

            if (!productInfo) {
              productInfo = products.find(
                (product) => String(product.id) === String(productId)
              );
            }

            if (productInfo) {
              // console.log(
              //   `Found product: ${productInfo.name}, Size: ${size}, Quantity: ${quantity}`
              // );
              orderItems.push({
                ...productInfo,
                size: size,
                quantity: quantity,
              });
            } else {
              // console.log(
              //   `Product not found for ID: ${productId}, Type: ${typeof productId}`
              // );
            }
          }
        }
      }

      // console.log("Order Items:", orderItems);

      if (orderItems.length === 0) {
        notify.error("No valid items found in cart");
        return;
      }

      let orderData = {
        address: formdata,
        items: orderItems,
        amount: getCartAmount() + getDeliveryFee(),
      };

      // console.log("Final order items:", orderItems);
      // console.log("Order data to send:", orderData);

      switch (method) {
        /* -------- API CALL FOR COD -------- */
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            notify.error(response.data.message);
          }
          break;

        /* -------- API CALL FOR STRIPE -------- */

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            notify.error(responseStripe.data.message);
          }
          break;
        /* -------- API CALL FOR COD -------- */

        default:
          notify.warning("Please select a payment method");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      notify.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ---------------- LEFT ---------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information "} />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formdata.firstName}
            type="text"
            placeholder="First Name"
            className="border border-gray-200 focus:border-borderColor focus:outline-none rounded py-1.5 px-3.5 w-full outline-none transition placeholder:text-gray-300"
            required
          />

          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formdata.lastName}
            type="text"
            placeholder="Last Name"
            className="border border-gray-200 focus:border-borderColor focus:outline-none rounded py-1.5 px-3.5 w-full outline-none  transition placeholder:text-gray-300"
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="email"
          value={formdata.email}
          type="email"
          placeholder="Email Address"
          className="border border-gray-200 focus:border-borderColor focus:outline-none rounded py-1.5 px-3.5 w-full outline-none  transition placeholder:text-gray-300"
          required
        />

        <input
          onChange={onChangeHandler}
          name="addressLine1"
          value={formdata.addressLine1}
          type="text"
          placeholder="Address Line 1"
          className="border border-gray-200 focus:border-borderColor focus:outline-none rounded py-1.5 px-3.5 w-full outline-none transition placeholder:text-gray-300"
          required
        />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="addressLine2"
            value={formdata.addressLine2}
            type="text"
            placeholder="Address Line 2"
            className="border border-gray-200 focus:border-borderColor focus:outline-none rounded py-1.5 px-3.5 w-full outline-none transition placeholder:text-gray-300"
            required
          />

          <input
            onChange={onChangeHandler}
            name="addressLine3"
            value={formdata.addressLine3}
            type="text"
            placeholder="Address Line 3"
            className="border border-gray-200 focus:border-borderColor focus:outline-nonerounded py-1.5 px-3.5 w-full outline-none  transition placeholder:text-gray-300"
          />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="postalCode"
            value={formdata.postalCode}
            type="number"
            placeholder="Postal Code"
            className="border border-gray-200 focus:border-borderColor focus:outline-none rounded py-1.5 px-3.5 w-full outline-none transition placeholder:text-gray-300"
            required
          />

          <input
            onChange={onChangeHandler}
            name="district"
            value={formdata.district}
            type="text"
            placeholder="District"
            className="border border-gray-200 focus:border-borderColor focus:outline-none rounded py-1.5 px-3.5 w-full outline-none  transition placeholder:text-gray-300"
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="phone"
          value={formdata.phone}
          type="number"
          placeholder="Phone Number"
          className="border border-gray-200 focus:border-borderColor focus:outline-none py-1.5 px-3.5 w-full outline-none transition placeholder:text-gray-300"
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
              className="flex items-center gap-3 border border-borderColor p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-borderColor rounded-full ${
                  method === "stripe" ? "bg-primary" : ""
                }`}
              ></p>

              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>

            {/* <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border border-borderColor p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-borderColor rounded-full ${
                  method === "razorpay" ? "bg-primary" : ""
                }`}
              ></p>

              <img src={assets.razorpay_logo} alt="" className="h-5 mx-4" />
            </div> */}

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border border-borderColor p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-borderColor rounded-full ${
                  method === "cod" ? "bg-primary" : ""
                }`}
              ></p>

              <p className="text-gray-500 text-sm font-medium mx-4 uppercase">
                Cash On Delivery
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              // onClick={() => navigate("orders")}
              className="bg-primary hover:bg-primary-dull text-white px-16 py-3 text-sm cursor-pointer hover:rounded-full"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
