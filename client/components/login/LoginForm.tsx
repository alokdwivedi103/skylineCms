"use client";

import Input from "../custom/Input";
import Button from "../custom/Button";
import loginLogic from "./loginLogic";

export default function LoginForm() {
  const { formData, handleChange, handleSubmit } = loginLogic();
  return (
    <div className="px-10 py-9">
      {" "}
      <p className="text-left flex flex-col">
        <span className="font-semibold text-xl">Login to your account</span>
        <span className="text-sm text-gray-600">
          see what new we have to offer!
        </span>
      </p>
      <form className="w-full my-6" onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
        />
        <Input
          className="w-full"
          label="Password"
          name="password"
          onChange={handleChange}
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
