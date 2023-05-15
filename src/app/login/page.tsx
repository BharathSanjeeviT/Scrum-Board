"use client";
import { useEffect, useState } from "react";
import "./../globals.css";
import Notification from "@/components/Notification";
import axios from "axios";
import { useRouter } from "next/navigation";

const login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [notify, setNotify] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (notify) {
      const timer = setTimeout(() => {
        setNotify(false);
        if (status == "sucess") {
           router.push('/') 
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [notify]);

  const validate = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!!!name) {
      setError("Username is required");
      setStatus("error");
      setNotify(true);
      setSubmitted(false);
    } else if (!!!password) {
      setError("Password is required");
      setStatus("error");
      setNotify(true);
      setSubmitted(false);
    } else {
      const data = await axios.post("/api/login", {
        name,
        password,
      });
      if (data.data === null) {
        setError("No such user");
        setStatus("error");
        setNotify(true);
        setSubmitted(false);
      } else if (!(password == data.data.password)) {
        setError("Wrong Password");
        setStatus("error");
        setNotify(true);
        setSubmitted(false);
      } else {
        setError("Logged In");
        setStatus("sucess");
        setNotify(true);
      }
    }
  };

  return (
    <>
      {notify && <Notification data={error} status={status} />}

      <div className="flex items-center justify-center h-screen">
        <div className="bg-white bg-opacity-[15%] grad text-[#574949] rounded-md backdrop-blur-md w-4/12 h-96">
          <div className="flex justify-center text-6xl font-medium p-7">
            Scrum Board
          </div>
          <form
            onSubmit={(e) => {
              validate(e);
            }}
          >
            <div className="flex justify-center">
              <input
                className="w-3/4 h-12 p-5 text-xl rounded-md focus:outline-white"
                placeholder="Username"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center py-7">
              <input
                className="w-3/4 h-12 p-5 text-xl rounded-md focus:outline-white"
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            {submitted ? (
              <div className="flex items-center justify-center h-12">
                <div className="animate-spin inline-block w-6 h-6 border-[6px] border-current border-t-transparent text-white rounded-full">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-center pt-2">
                <button
                  className="h-10 text-lg bg-white rounded-md w-28"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
          <div className="flex justify-center pt-5 text-xl font-medium">
            Not a user? Sign Up!
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
