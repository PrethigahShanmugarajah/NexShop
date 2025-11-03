import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { notify } from "../components/ToastProvider";
import { formatDateSlash } from "../utils/stringUtils";
import { Package } from "lucide-react";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(response.data);

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        notify.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      notify.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      notify.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <Title className="mb-2" text1={"Order"} text2={"Products"} />
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-borderColor p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-black"
            key={index}
          >
            <Package className="w-12 h-12 text-primary" />

            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quanity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quanity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>

              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div>
                <p>{order.address.addressLine1 + ","}</p>
                <p>{order.address.addressLine2 + ","}</p>
                <p>{order.address.addressLine3 + ","}</p>
                <p>{order.address.postalCode + ","}</p>
                <p>{order.address.district + "."}</p>
              </div>

              <p>{order.address.phone}</p>
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>

              <p className="mt-3">Method: {order.items.paymentMethod}</p>

              <p>Payment: {order.payment ? "Done" : "Pending"}</p>

              <p>Date: {formatDateSlash(order.date)}</p>
            </div>

            <p className="text-sm sm:text-[15px]">
              {currency} {order.totalAmount}
            </p>

            <select
              onChange={(event) => statusHandler(event, order.id || order._id)}
              value={order.status}
              className="p-2 font-semibold border border-borderColor bg-white"
            >
              <option value="Order Placed">Order Placed</option>
              <option value=" Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out of Delivery">Out of Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
