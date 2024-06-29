import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";

export interface LoginFormValues {
  email: string;
  password: string;
}

export default function loginLogic() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { push } = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { email, password } = formData;
    if (email === "alok@gmail.com" && password === "alokaa") {
      push("/");
    }
  };
  return {
    formData,
    handleChange,
    handleSubmit,
    setFormData,
  };
}
