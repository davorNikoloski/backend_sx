import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

type UserMessageStatus = "fulfilled" | "pending" | "error";

interface UserMessage {
  status: UserMessageStatus;
}

const Register: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [userMessage, setUserMessage] = useState<UserMessage>({ status: "fulfilled" });

  useEffect(() => {
    setSubmitted(false);
  }, []);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/registerReact", user)
      .then((response) => {
        // Handle the success response here (e.g., show a success message, redirect to another page)
        console.log("Registration successful!", response.data);
        setUserMessage({ status: "fulfilled" });
        setSubmitted(true);
        // setRedirectToProfile(true); // No need for this, as it's already done in the 'then' block
      })
      .catch((error) => {
        // Handle the error response here (e.g., show an error message)
        console.error("Registration failed.", error.response?.data);
        setUserMessage({ status: "error" });
        setSubmitted(true);
        // Set any error messages or handle the error as needed
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-no-repeat bg-cover bg-center relative">
      <div className="min-h-screen md:flex sm:flex-row mx-auto justify-center w-full md:max-w-[90%] shadow">
        <form onSubmit={handleCreate} className="flex justify-center self-center z-10 w-full md:w-auto">
          {/* Rest of the JSX code for the registration form */}
          <button
            type="submit" // Use type="submit" to handle form submission
            className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
          >
            Креирај
          </button>
          {submitted === true ? (
            userMessage.status === "fulfilled" ? (
              <h1 className="text-emerald-500 p-2">Успешно ја креиравте вашата корисничка сметка!</h1>
            ) : userMessage.status === "pending" ? (
              <h1 className="text-emerald-500 p-2">Корисничката сметка се креира..</h1>
            ) : (
              <h1 className="text-red-500 p-2">Обидете се подоцна.</h1>
            )
          ) : (
            <span className="p-2"></span>
          )}
          {/* Rest of the JSX code for the registration form */}
        </form>
      </div>
    </div>
  );
};

export default Register;
