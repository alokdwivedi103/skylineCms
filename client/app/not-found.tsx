import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <Image alt='404 Illustration' height={150} src='/images/common/404.webp' width={230}/>
      <div className='flex flex-col gap-2 items-center mt-5'>
      <h1 className='font-bold'>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link className='highlight' href="/">Return Home</Link>
      </div>
    </div>
  )
}