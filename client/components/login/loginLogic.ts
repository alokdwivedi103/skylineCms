import axios from "axios";
import { useRouter } from "next/navigation";

export interface LoginFormValues {
  email: string;
  password: string;
}
export const loginLogic = () => {
  const { push } = useRouter();

  const handleSubmit = async (data: LoginFormValues) => {
    console.log('HERE');
    const { email, password } = data;
    if (email === "alok@gmail.com" && password === "alokaa") {
      try {
        const { data: responseData, status } = await axios.post("http://localhost:9001/login", data);
        localStorage.setItem("userData", JSON.stringify(data));
        status === 200 ? push("/") : console.log(responseData.message);
      } catch (error) {
        console.error("Error during login:", error);
      }
    } else {
      console.log("Invalid credentials");
    }
  };

  return {
    handleSubmit,
  };
};
