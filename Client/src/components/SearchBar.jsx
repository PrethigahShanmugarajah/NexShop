import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Search, X } from "lucide-react";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    // console.log(location.pathname);
  }, [location]);

  return showSearch && visible ? (
    <div className="border-flex border-b bg-white text-center">
      <div className="inline-flex items-center justify-center border border-borderColor px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm placeholder-gray-300"
        />

        <Search className="w-4 h-4 text-black" />
      </div>

      <X
        onClick={() => setShowSearch(false)}
        className="inline w-4 cursor-pointer text-black"
      />
    </div>
  ) : null;
};

export default SearchBar;
