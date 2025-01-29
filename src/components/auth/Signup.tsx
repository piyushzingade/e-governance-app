"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [requiredError, setRequiredError] = useState({
    usernameReq: false,
    emailReq: false,
    passReq: false,
  });
  const [loading, setLoading] = useState(false); // State to manage loading spinner

  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");
  const usernameRef = useRef<string>("");

  const router = useRouter(); 

  const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    // Basic validation
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      setRequiredError({
        emailReq: !emailRef.current,
        passReq: !passwordRef.current,
        usernameReq: !usernameRef.current,
      });
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true); 
      toast.loading("Signing up...");

      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current,
          email: emailRef.current,
          password: passwordRef.current,
        }),
      });

      if (response.ok) {
        toast.dismiss();
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => {
          router.push("/home"); 
        }, 1500);
      } else {
        const errorData = await response.json();
        toast.dismiss();
        toast.error(errorData.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.dismiss();
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <section className="wrapper relative flex min-h-screen items-center justify-center overflow-hidden antialiased">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          damping: 10,
        }}
        className="flex w-full flex-col justify-between gap-12 rounded-2xl bg-primary/5 p-8 sm:max-w-[26rem]"
      >
        <div className="flex flex-col text-center">
          <h2 className="text-3xl font-semibold tracking-tighter xl:text-4xl">
            Welcome to <br />
            <span className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">
              E-Governance
            </span>
          </h2>
          <p className="text-lg font-medium tracking-tighter text-primary/75 md:text-xl">
            Create an account to get started!
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="grid w-full items-center gap-4">
            <div className="relative flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                id="username"
                className="focus:ring-none border-none bg-primary/5 focus:outline-none"
                placeholder="Piyush..."
                onChange={(e) => {
                  usernameRef.current = e.target.value;
                  setRequiredError((prevState) => ({
                    ...prevState,
                    usernameReq: false,
                  }));
                }}
              />
              {requiredError.usernameReq && (
                <span className="text-red-500">Email is required</span>
              )}
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                className="focus:ring-none border-none bg-primary/5 focus:outline-none"
                placeholder="name@email.com"
                onChange={(e) => {
                  emailRef.current = e.target.value;
                  setRequiredError((prevState) => ({
                    ...prevState,
                    emailReq: false,
                  }));
                }}
              />
              {requiredError.emailReq && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex">
                <Input
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  className="focus:ring-none border-none bg-primary/5 focus:outline-none"
                  placeholder="••••••••"
                  onChange={(e) => {
                    passwordRef.current = e.target.value;
                    setRequiredError((prevState) => ({
                      ...prevState,
                      passReq: false,
                    }));
                  }}
                />
                <button
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-neutral-500"
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {requiredError.passReq && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
            {/* <div className="relative flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="flex">
                <Input
                  name="confirmPassword"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="focus:ring-none border-none bg-primary/5 focus:outline-none"
                  onChange={(e) => {
                    confirmPasswordRef.current = e.target.value;
                    setRequiredError((prevState) => ({
                      ...prevState,
                      confirmPassReq: false,
                    }));
                  }}
                />
                <button
                  onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                  className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-neutral-500"
                >
                  {isConfirmPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {requiredError.confirmPassReq && (
                <span className="text-red-500">Passwords do not match</span>
              )}
            </div> */}
            <div className="text-center text-sm text-white">
              Already have an account?{" "}
              <Link className="hover:underline " href="/signin">
                Sign in
              </Link>
            </div>
          </div>
          <Button
            size={"lg"}
            variant={"outline"}
            disabled={
              loading || !emailRef.current || !passwordRef.current
              // !confirmPasswordRef.current
            }
            onClick={handleSubmit}
            className="hover:cursor-pointer"
          >
            {loading ? "Signing up..." : "Signup"}
          </Button>
        </div>
      </motion.div>
      <div className="absolute -bottom-[16rem] -z-[20] size-[24rem] overflow-hidden rounded-full bg-gradient-to-t from-blue-400 to-blue-700 blur-[16em]" />
    </section>
  );
};

export default Signup;
