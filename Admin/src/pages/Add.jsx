import React, { useState } from "react";
import { ImagePlus } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App";
import { notify } from "../components/ToastProvider";
import Title from "../components/Title";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState("");
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!image1) {
        return notify.warning("Please upload at least one image.");
      }

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // console.log("Token being sent:", token);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token: token } }
      );

      // console.log(response.data);

      if (response.data.success) {
        notify.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes("");
        setBestSeller("");
      } else {
        notify.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      notify.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <Title className="mb-2" text1={"Add"} text2={"Products"} />

        <p className="mb-2 text-black">Upload Image</p>

        <div className="flex gap-2 ">
          <label htmlFor="image1">
            {!image1 ? (
              <ImagePlus className="w-20 h-20 text-gray-400 cursor-pointer" />
            ) : (
              <img
                className="w-20 h-20 object-cover rounded-md"
                src={URL.createObjectURL(image1)}
                alt="Preview"
              />
            )}
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              name=""
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            {!image2 ? (
              <ImagePlus className="w-20 h-20 text-gray-400 cursor-pointer" />
            ) : (
              <img
                className="w-20 h-20 object-cover rounded-md"
                src={URL.createObjectURL(image2)}
                alt="Preview"
              />
            )}
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              name=""
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            {!image3 ? (
              <ImagePlus className="w-20 h-20 text-gray-400 cursor-pointer" />
            ) : (
              <img
                className="w-20 h-20 object-cover rounded-md"
                src={URL.createObjectURL(image3)}
                alt="Preview"
              />
            )}
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              name=""
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            {!image4 ? (
              <ImagePlus className="w-20 h-20 text-gray-400 cursor-pointer" />
            ) : (
              <img
                className="w-20 h-20 object-cover rounded-md"
                src={URL.createObjectURL(image4)}
                alt="Preview"
              />
            )}
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              name=""
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 text-black">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Product Name"
          className="w-full max-w-[500px] px-3 py-2 border border-gray-200  rounded-md outline-none focus:border-borderColor transition  text-black placeholder-gray-300"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-black">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          rows={5}
          placeholder="Product Description"
          className="w-full max-w-[500px] px-3 py-2 border border-gray-200 rounded-md outline-none focus:border-borderColor transition text-black placeholder-gray-300"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 text-black">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none focus:border-borderColor transition text-black placeholder-gray-300"
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-black">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none focus:border-borderColor transition text-black placeholder-gray-300"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-black">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="LKR 100"
            className="w-full px-3 py-2 sm:w-[120px] border border-gray-200 rounded-md outline-none focus:border-borderColor transition text-black placeholder-gray-300"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-black">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXS")
                  ? prev.filter((item) => item !== "XXS")
                  : [...prev, "XXS"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXS") ? "bg-light" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXS
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XS")
                  ? prev.filter((item) => item !== "XS")
                  : [...prev, "XS"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XS") ? "bg-light" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XS
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-light" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-light" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-light" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-light" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-light" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
          type="checkbox"
          id="bestSeller"
          className="cursor-pointer"
        />
        <label className="cursor-pointer text-black" htmlFor="bestSeller">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="bg-primary hover:bg-primary-dull  w-28 py-3 mt-4 text-white cursor-pointer rounded-md hover:rounded-full"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
