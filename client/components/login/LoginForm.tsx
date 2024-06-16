"use client";

import { useState } from "react";
import Input from "../custom/Input";
import Button from "../custom/Button";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="px-10 py-9">
      {" "}
      <p className="text-left flex flex-col">
        <span className="font-semibold text-xl">Login to your account</span>
        <span className="text-sm text-gray-600">
          see what new we have to offer!
        </span>
      </p>
      <form className="w-full my-6">
        <Input
          label="Email"
          name="email"
          value={formData.email}
          placeholder="Email"
        />
        <Input
          className="w-full"
          label="Password"
          name="password"
          placeholder="Password"
          value={formData.password}
        />
        <Button className="mt-4" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
