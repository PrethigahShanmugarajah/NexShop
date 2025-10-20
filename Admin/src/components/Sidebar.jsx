// import React from "react";
// import { NavLink } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { List, PlusCircle, ShoppingCart } from "lucide-react";

// const Sidebar = () => {
//   return (
//     <div className="w-[18%] min-h-screen border-r-1 border-r-borderColor">
//       <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
//         <NavLink
//           to="/add"
//           className="flex items-center gap-3 border border-borderColor border-r-0 px-3 py-2 rounded-l"
//         >
//           {/* <img src={assets.add_icon} alt="" className="w-5 h-5" />
//            */}
//           <PlusCircle className="w-5 h-5 text-primary" />

//           <p className="hidden md:block">Add Items</p>
//         </NavLink>

//         <NavLink
//           to="/list"
//           className="flex items-center gap-3 border border-borderColor border-r-0 px-3 py-2 rounded-l"
//         >
//           {/* <img src={assets.order_icon} alt="" className="w-5 h-5" /> */}
//           <List className="w-5 h-5 text-primary" />

//           <p className="hidden md:block">List Items</p>
//         </NavLink>

//         <NavLink
//           to="/orders"
//           className="flex items-center gap-3 border border-borderColor border-r-0 px-3 py-2 rounded-l"
//         >
//           {/* <img src={assets.order_icon} alt="" className="w-5 h-5" /> */}
//           <ShoppingCart className="w-5 h-5 text-primary" />

//           <p className="hidden md:block">Orders</p>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { List, PlusCircle, ShoppingCart } from "lucide-react";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 border border-borderColor border-r-0 px-3 py-2 rounded-l transition ${
      isActive ? " bg-light" : " hover:bg-primary/20"
    }`;

  return (
    <div className="w-[18%] min-h-screen border-r-1 border-r-borderColor">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink to="/add" className={linkClass}>
          {/* <img src={assets.add_icon} alt="" className="w-5 h-5" />
           */}
          <PlusCircle className="w-5 h-5 text-primary" />

          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink to="/list" className={linkClass}>
          {/* <img src={assets.order_icon} alt="" className="w-5 h-5" /> */}
          <List className="w-5 h-5 text-primary" />

          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink to="/orders" className={linkClass}>
          {/* <img src={assets.order_icon} alt="" className="w-5 h-5" /> */}
          <ShoppingCart className="w-5 h-5 text-primary" />

          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
