import axios from "axios";

export interface LoginFormValues {
  email: string;
  password: string;
}
export const loginLogic = () => {

  const handleSubmit = async (data: LoginFormValues) => {
    const { email, password } = data;
    if (email === "alok@gmail.com" && password === "alokaa") {
      try {
        const { data: responseData, status } = await axios.post("http://localhost:9001/login", data);
        localStorage.setItem("userData", JSON.stringify(data));
        status === 200 ? window.location.href = "/" : console.log(responseData.message);
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
