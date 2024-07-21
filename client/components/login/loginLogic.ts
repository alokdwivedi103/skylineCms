import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
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

  const handleSubmit = async () => {
    const { email, password } = formData;
    if (email === "alok@gmail.com" && password === "alokaa") {      
      const { data, status } = await axios.post("http://localhost:9001/login", formData);
      localStorage.setItem("userData", JSON.stringify(formData));
      status === 200 ? push("/") : console.log(data.message);
    }
  };
  return {
    formData,
    handleChange,
    handleSubmit,
    setFormData,
  };
}
