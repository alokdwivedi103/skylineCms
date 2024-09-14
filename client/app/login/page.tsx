import Image from "next/image";
import LoginForm from "@/components/login/LoginForm";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const OFFERINGS = [
  {
    image: "/login/login.webp",
    message:
      "Login to our website to get updated about all the new releases and publishes",
  },
  {
    image: "/login/login.webp",
    message:
      "We have A-Z all the books you need from your practices to case studies",
  },
  {
    image: "/login/login.webp",
    message:
      "We do business in all of the North-East and operate from Prayagraj",
  },
];

export default function page() {
  return (
    <section className="lg:w-screen h-screen">
      <div className="lg:container px-2 flex flex-col lg:flex-row lg:items-center justify-center lg:justify-start h-full">
        <div className="lg:w-1/2 h-auto hidden lg:block">
          <Carousel className="w-full flex items-center relative">
            <CarouselPrevious className="absolute left-5 z-[1]" />
            <CarouselContent className="w-full">
              {OFFERINGS.map((offering) => (
                <CarouselItem key={offering.message}>
                  <div className="p-1 relative">
                    <div className="absolute rounded-lg flex justify-center items-center top-0 w-full h-full bg-black/50">
                      <p className="text-white w-2/3 text-3xl leading-10 font-semibold">
                        {offering.message}
                      </p>
                    </div>
                    <Image
                      alt="login"
                      className="w-full h-[412px] object-contain bg-transparent"
                      height={412}
                      priority
                      src={offering.image}
                      width={412}
                    />{" "}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="absolute right-6 z-[1]" />
          </Carousel>
        </div>
        <div className="lg:w-1/2 text-primaryColor text-center">
          <div className="text-2xl font-semibold flex items-center justify-center">
            <Image alt="Logo" height={50} src="/logo.webp" width={50} />
            Skyline Publications
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
