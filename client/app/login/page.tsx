import Image from "next/image";

export default function page() {
  return (
    <section className="flex justify-center items-center w-screen h-screen">
      <div className="w-2/3 h-2/3 rounded-xl border shadow-xl bg-white p-4">
        <Image
          alt="login"
          className="w-1/2 h-full"
          height={412}
          src="/login.webp"
          width={412}
        />
      </div>
    </section>
  );
}
