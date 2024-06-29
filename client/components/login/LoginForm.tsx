"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../custom/Input";
import Button from "../custom/Button";
import loginLogic, { LoginFormValues } from "./loginLogic"; // Assuming you have a type for LoginFormValues

const LoginForm: React.FC = () => {
  const { formData, handleChange, handleSubmit } = loginLogic();

  const validateForm = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if(formData.email !== "alok@gmail.com" || formData.password !== "alokaa"){
      errors.email = "Invalid email or password";
    }

    return errors;
  };

  return (
    <div className="px-10 py-9">
      <p className="text-left flex flex-col">
        <span className="font-semibold text-xl">Login to your account</span>
        <span className="text-sm text-gray-600">
          see what new we have to offer!
        </span>
      </p>
      <Formik
        initialValues={formData}
        validate={validateForm}
        onSubmit={handleSubmit}
        validateOnChange
        validateOnBlur={false}
      >
        <Form className="w-full my-6">
          <Field
            as={Input}
            label="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
          />
          <ErrorMessage name="email" component="div" className="text-red-600 text-left" />

          <Field
            as={Input}
            className="w-full"
            label="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
            type="password"
          />
          <ErrorMessage name="password" component="div" className="text-red-600 text-left" />

          <Button className="mt-4" type="submit">
            Login
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
