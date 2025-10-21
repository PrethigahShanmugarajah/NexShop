import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { notify } from "../components/ToastProvider";
import Title from "../components/Title";
import { Trash2 } from "lucide-react";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list", {
        headers: { token: token },
      });
      if (response.data.success) {
        setList(response.data.products);
        console.log(response.data);
      } else {
        notify.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      notify.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        notify.success(response.data.message);
        await fetchList();
      } else {
        notify.error(response.data.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <Title className="mb-2" text1={"All Products"} text2={"List"} />
      {/* <p className="mb-2">All Products List</p> */}
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* ---------------- PRODUCT LIST ---------------- */}

        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.images[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p onClick={() => removeProduct(item.id)}>
              <Trash2 className="text-right md:text-center w-5 h-5 text-red-500 cursor-pointer" />
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
