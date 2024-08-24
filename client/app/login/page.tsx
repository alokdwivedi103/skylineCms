import LoginForm from "@/components/login/LoginForm";
import Image from "next/image";

export default function page() {
  return (
    <section className="w-screen h-screen">
      <div className="container flex justify-center items-center w-full h-full">
        <div className="w-1/2 h-auto">
          <Image
            alt="login"
            height={412}
            priority
            src="/login/login.webp"
            width={412}
          />
        </div>
        <div className="w-1/2 p-4 text-gray-600 text-center">
          <span className="text-2xl font-semibold">
            Skyline Publications:
            <br /> Educating Legal Minds
          </span>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
