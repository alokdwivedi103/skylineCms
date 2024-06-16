import LoginForm from "@/components/login/LoginForm";
import Image from "next/image";

export default function page() {
  return (
    <section className="flex justify-center items-center w-screen h-screen">
      <div className="w-2/3 h-2/3 flex rounded-xl border shadow-xl bg-white p-4">
        <Image
          alt="login"
          className="w-1/2 h-full"
          height={412}
          src="/login/login.webp"
          width={412}
        />
        <div className="w-1/2 h-full rounded-xl shadow-lg shadow-primaryColor bg-primaryColor/10 p-4 text-gray-600 text-center">
          <span className="text-2xl font-semibold">
            Skyline Publications:
            <br /> Empowering Legal Minds
          </span>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
