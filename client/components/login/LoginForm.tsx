"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormValues, loginLogic } from "./loginLogic";
import { loginSchema } from "../../validations/login";

import Input from "../custom/Input";
import { Button } from "../ui/button";

const LoginForm: React.FC = () => {
  const { handleSubmit: loginLogicSubmit } = loginLogic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="px-10 py-9">
      <p className="text-left flex flex-col">
        <span className="font-semibold text-xl">Login to your account</span>
        <span className="text-sm text-gray-600">
          see what new we have to offer!
        </span>
      </p>
      <form onSubmit={handleSubmit(loginLogicSubmit)} className="w-full my-6">
        <Input
          label="Email"
          {...register("email")}
          placeholder="Email"
        />
        {errors.email && <div className="text-red-600 text-left">{errors.email.message}</div>}

        <Input
          label="Password"
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && <div className="text-red-600 text-left">{errors.password.message}</div>}

        <Button className="mt-4 w-full" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
