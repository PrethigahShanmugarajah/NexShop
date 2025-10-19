import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets, products } from "../assets/assets";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const {
    // products,
    currency,
    cartItems,
    updateQuanity,
    navigate,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
    // console.log(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"Cart"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image[0]}
                  alt=""
                  className="w-16 sm:w-20"
                />

                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency} {productData.price}
                    </p>

                    <p className="px-2 sm:px-3 sm:py-1 border border-borderColor   bg-gray-100">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuanity(item._id, item.size, Number(e.target.value))
                }
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border border-borderColor max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />

              {/* <img onClick={() => updateQuanity(item._id, item.size, 0)} src={assets.bin_icon} alt="Delete" className="w-4 mr-4 sm:w-5 cursor-pointer"/> */}
              <Trash2
                onClick={() => updateQuanity(item._id, item.size, 0)}
                className="w-5 h-5 mr-4 sm:w-6 sm:h-6 cursor-pointer text-red-500 hover:text-red-600 transition-colors"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-primary hover:bg-primary-dull text-white text-sm my-8 px-8 py-3 cursor-pointer uppercase"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
