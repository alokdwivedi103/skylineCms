import Image from "next/image";

import HomeTabs from "@/components/Home/HomeTabs";

export default function Home() {
  return (
    <main>
      <Image alt='Home Banner' className="w-full lg:h-96 lg:object-fill object-contain" height={360} src='/images/Home/homeBanner.webp' width={864}/>
      <div className="container">
      <HomeTabs />
      </div>
    </main>
  );
}
