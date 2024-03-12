import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Button from "../UI/Button";
import Logo from "../UI/Logo";

import validations from "./validations";

export function Form() {
  const { cedula } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState({
    cedula: "",
  });

  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    setErrors(
      validations({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="h-screen flex flex-col px-5 sm:px-10 bg-[#FFCC00] static">
      <Link to="/" className="absolute top-0 mt-5 hover:opacity-80">
        <span className="text-xl sm:text-2xl">⬅️</span>
      </Link>
      <div className="mt-5 w-full flex flex-col items-center">
        <Link
          to="https://grupo-lamar.com/es/"
          target="_blank"
          className="hover:opacity-70"
        >
          <Logo className="w-20 mb-4 sm:w-28" />
        </Link>
        <h1 className="text-xl font-bold text-center">
          Postulación ({cedula})
        </h1>
      </div>
    </div>
  );
}
