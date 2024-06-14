// import React from "react";
// import { Link } from "react-router-dom";

// const Placement = () => {
//   const companies = [
//     { id: 1, name: "TCS", imageUrl: "https://companieslogo.com/img/orig/TCS.NS_BIG-89c50e39.png?t=1631949260", detailsUrl: "/companies/tcs" },
//     { id: 2, name: "Hexaware Technologies", imageUrl: "https://seeklogo.com/images/H/hexaware-technologies-logo-7B0FA8DDA8-seeklogo.com.png", detailsUrl: "/companies/hexaware" },
//     { id: 3, name: "Capegemini", imageUrl: "https://1000logos.net/wp-content/uploads/2021/08/Capgemini-Logo-1996.png", detailsUrl: "/companies/tcs" },
//     { id: 4, name: "cognizant", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg", detailsUrl: "/companies/tcs" },
//     { id: 5, name: "Yash Technologies", imageUrl: "https://seeklogo.com/images/H/hexaware-technologies-logo-7B0FA8DDA8-seeklogo.com.png", detailsUrl: "/companies/tcs" },
//     { id: 2, name: "Wipro", imageUrl: `${process.env.PUBLIC_URL}/images/wipro.png`, detailsUrl: "/companies/tcs" },
//     { id: 2, name: "Accenture", imageUrl: `${process.env.PUBLIC_URL}/images/pngegg.png`, detailsUrl: "/companies/tcs" },
//   ];

//   return (
//     <div className="font-poppins">
//       <div className="mx-4">
//         <h1 className="text-3xl font-bold px-4 mt-3 ">Placements</h1>
//         <hr className="h-px bg-black border-0 m-4"></hr>
//         <div className="grid grid-cols-4 gap-6 mt-4 sm:grid-cols-1 md:grid-cols-3 justify-center">
//           {companies.map(company => (
//             <Link to={company.detailsUrl} key={company.id}>
//               <div className="rounded-lg shadow-md bg-slate-50 flex items-center justify-center md:w-full">
//                 <div className="p-2">
//                   <img src={company.imageUrl} alt={company.name} className="w-32 h-32 object-contain" />
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default Placement;

import React from "react";
import { Link } from "react-router-dom";

const Placement = () => {
  const companies = [
    { id: 1, name: "TCS", imageUrl: "https://companieslogo.com/img/orig/TCS.NS_BIG-89c50e39.png?t=1631949260", detailsUrl: "/companies/tcs" },
    { id: 2, name: "Hexaware-Technologies", imageUrl: "https://seeklogo.com/images/H/hexaware-technologies-logo-7B0FA8DDA8-seeklogo.com.png", detailsUrl: "/companies/hexaware-technologies" },
    { id: 3, name: "capgemini", imageUrl: "https://1000logos.net/wp-content/uploads/2021/08/Capgemini-Logo-1996.png", detailsUrl: "/companies/capgemini" },
    { id: 4, name: "Cognizant", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg", detailsUrl: "/companies/cognizant" },
    { id: 5, name: "Rapidops", imageUrl: `${process.env.PUBLIC_URL}/images/rapidops.png`, detailsUrl: "/companies/rapidops" },
    { id: 6, name: "Wipro", imageUrl: `${process.env.PUBLIC_URL}/images/wipro.png`, detailsUrl: "/companies/wipro" },
    { id: 7, name: "Accenture", imageUrl: `${process.env.PUBLIC_URL}/images/pngegg.png`, detailsUrl: "/companies/accenture" },
    { id: 7, name: "yash-technologies", imageUrl: `${process.env.PUBLIC_URL}/images/yash-logo.png`, detailsUrl: "/companies/yash-technologies" },
  ];

  return (
    <div className="font-poppins">
      <div className="mx-4">
        <h1 className="text-3xl font-bold px-4 mt-3">Placements</h1>
        <hr className="h-px bg-black border-0 m-4"></hr>
        <div className="grid grid-cols-4 gap-6 mt-4 sm:grid-cols-1 md:grid-cols-3 justify-center">
          {companies.map(company => (
            <Link to={company.detailsUrl} key={company.id}>
              <div className="rounded-lg shadow-md bg-slate-50 flex items-center justify-center md:w-full">
                <div className="p-2">
                  <img src={company.imageUrl} alt={company.name} className="w-32 h-32 object-contain" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Placement;


