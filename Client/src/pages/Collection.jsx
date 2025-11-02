// Client/src/pages/Collection
import React, { useContext, useEffect, useState } from "react";
import {
  assets,
  // products
} from "../assets/assets";
import { ChevronRight } from "lucide-react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fbCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fbCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fbCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // useEffect(() => {
  //   setFilterProducts(products);
  // }, []);

  // useEffect(() => {
  //   console.log(category);
  // }, [category]);

  // useEffect(() => {
  //   console.log(subCategory);
  // }, [subCategory]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* ---------------- LEFT:FILTER OPTIONS ---------------- */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 uppercase "
        >
          Filters{" "}
          {/* <img src={assets.dropdown_icon}  alt="Dropdown" className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}/> */}
          <ChevronRight
            className={`h-4 w-4 text-black sm:hidden transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </p>

        {/* -------- CATEGORY FILTER  -------- */}
        <div
          className={`border border-borderColor pl-5 py-3 mt-6 uppercase ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">Categories</p>

          <div className="flex flex-col gap-2 text-sm font-light text-black">
            <p className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>

            <p className="flex gap-2 ">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* -------- SUBCATEGORY FILTER -------- */}
        <div
          className={`border border-borderColor pl-5 py-3 my-5 uppercase ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-3 uppercase"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-3 r"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- RIGHT ---------------- */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collections"} />

          {/* -------- PRODUCT SORT -------- */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-none text-sm px-2"
          >
            <option value="relavent"> Relavent</option>
            <option value="low-high"> Low to High</option>
            <option value="high-low"> High to Low</option>
          </select>
        </div>

        {/* -------- MAP PRODUCTS -------- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
