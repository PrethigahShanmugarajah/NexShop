import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  //  products
} from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { Star } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState([]);
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const product = products.find((item) => item.id === parseInt(productId));
    // console.log("Selected product:", product);
    if (product) {
      setProductData(product);
      setImage(product.images[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);
  // console.log(productId);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ---------------- PRODUCT DATA ---------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* -------- PRODUCT IMAGES -------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images &&
              productData.images.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  alt=""
                  className="w-[24%] sm:w-full sm:mb-3 flex shrink-0 cursor-pointer"
                />
              ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* -------- PRODUCT INFO -------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {/* <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" /> */}
            <Star className="w-4 h-4 text-primary fill-current" />
            <Star className="w-4 h-4 text-primary fill-current" />
            <Star className="w-4 h-4 text-primary fill-current" />
            <Star className="w-4 h-4 text-primary fill-current" />{" "}
            <Star className="w-4 h-4 text-light fill-current" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5 text-justify">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border-none py-2 px-4 bg-gray-100 cursor-pointer ${
                    item === size ? "bg-light" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData.id, size)}
            className="bg-primary hover:bg-primary-dull text-white px-8 py-3 text-sm active:bg-light cursor-pointer uppercase"
          >
            Add to cart
          </button>

          <hr className="mt-8 sm:w-4/5 text-gray-100" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100%Original products. </p>
            <p>Cash on Delivery available on this products.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------------- DESCRIPTION & REVIEW SECTION ---------------- */}
      <div className="mt-20">
        <div className="flex uppercase">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 text-justify ">
          <p>
            This product is crafted with high-quality materials to ensure
            durability and comfort. Designed to meet everyday needs, it combines
            style with practicality, making it a perfect addition to your
            collection.
          </p>

          <p>
            Enjoy a seamless experience with easy maintenance and versatile use.
            Ideal for both casual and formal occasions, this product delivers
            reliability and value, ensuring customer satisfaction every time.
          </p>
        </div>
      </div>

      {/* ---------------- DISPLAY RELATED PRODUCTS ---------------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
