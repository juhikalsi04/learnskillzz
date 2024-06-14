import React from "react";
import { Link } from "react-router-dom";

const Card = ({ gifUrl, heading, linkTo }) => {

  return (
    <Link to={linkTo} className="rounded-lg shadow-md bg-slate-50 flex md:w-full">
      <div className="p-4 w-80">
        <img src={gifUrl} alt="GIF" className="w-full h-auto" />
        <p className="text-lg font-bold mt-2 mb-4 text-center">{heading}</p>

      </div>
    </Link>
  );
};


export default Card;



