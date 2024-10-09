import Image from "next/image";
import { headers } from "next/headers";

import HomeTabs from "@/components/Home/HomeTabs";
import TopSellingAuthors from "@/components/Home/TopSellingAuthors";
import TopSellingCategories from "@/components/Home/TopSellingCategories";

export default function Home() {
  const isMobile = headers().get('x-mobile');
  return (
    <main>
      <Image alt='Home Banner' className="w-full lg:h-40 lg:object-fill object-contain" height={360} src={isMobile ? '/images/Home/homeBanner.webp' : '/images/Home/homeBannerDesktop.webp'} width={864}/>
      <div className="container">
      <HomeTabs />
      <TopSellingAuthors />
      <TopSellingCategories />
      </div>
    </main>
  );
}
