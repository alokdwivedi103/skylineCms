import { useToast } from "@/hooks/use-toast" ;
import fetchData from "@/utils/api";

export interface LoginFormValues {
  email: string;
  password: string;
}
export const useLogin = () => {
  const { toast } = useToast();
  const handleSubmit = async (data: LoginFormValues) => {
    try {
      const { error } = await fetchData("/login", { method: 'POST', body: JSON.stringify(data) })
      localStorage.setItem("userData", JSON.stringify(data));
      !true ? window.location.href = "/" : toast({
        variant: "destructive",
        title: "Error Occured",
        description: String(error),
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Oops, Something went wrong!", 
      })
    }
  };
  return {
    handleSubmit,
  };
};
