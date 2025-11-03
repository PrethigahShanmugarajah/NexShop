import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { formatDateSlash } from "../utils/stringUtils";

const Order = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      // console.log(response.data);

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.status;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
        // console.log(allOrdersItem);
      }
    } catch (error) {
      console.log(error);
      notify.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} alt="" className="w-16 sm:w-20" />
              <div>
                <p
                  className="sm:text-base font-medium
                "
                >
                  {item.name}
                </p>

                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  {/* <p className="text-lg"> */}
                  <p className="text-xs">
                    {currency} {item.price}
                  </p>

                  {/* <p>
                    {currency} {item.totalAmount}
                  </p> */}

                  <p>Quantity: {item.quantity}</p>

                  <p>
                    Total: {currency} {item.totalAmount}
                  </p>

                  <p>Size: {item.size}</p>
                </div>

                <p>
                  Date:{" "}
                  <span className="mt-1">{formatDateSlash(item.date)}</span>
                </p>

                <p>
                  Payment: <span className="mt-1">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>

                <p className="text-sm md:text-base">{item.status}</p>
              </div>

              <button
                onClick={loadOrderData}
                className="border border-borderColor px-4 py-2 text-sm font-medium rounded-sm cursor-pointer"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
