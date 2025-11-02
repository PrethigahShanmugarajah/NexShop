import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-black cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        {image && image.length > 0 ? (
          <img
            className="hover:scale-110 transition ease-in-out w-full h-48 object-cover"
            src={image[0]}
            alt={name || "Product image"}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      <p className="pt-3 pb-1 text-sm">{name}</p>

      <p className="text-sm font-medium">
        {currency} {price}
      </p>
    </Link>
  );
};

export default ProductItem;
