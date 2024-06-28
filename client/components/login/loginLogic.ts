import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";

export default function loginLogic(){
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    const { push } = useRouter();
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if(formData.email === 'alok@gmail.com' && formData.password === 'alok'){
            push('/');
        } else {
            setFormData({ email: '', password: '' });
        }
    }
    return {
        formData,
        handleChange,
        handleSubmit,
        setFormData,
    }
}