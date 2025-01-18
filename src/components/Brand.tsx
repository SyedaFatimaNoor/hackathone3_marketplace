import Link from "next/link";

export default function Brand() {
  return(
    <section className="w-full h-[277px] flex items-center justify-between p-16 bg-white">  
      <div className="flex-1">  
        <h2 style={{ fontFamily: 'ClashDisplay' }} className="text-2xl font-normal text-[#2A254B] mb-6">  
          A brand built on the love of craftsmanship, <br /> quality and outstanding customer service  
        </h2>  
      </div>  
      <div className="flex-initial">  
        <Link href="/ProductListing">
            <button  className="bg-[#F9F9F9] text-[#2A254B] px-8 py-4 hover:bg-gray-100 hover:text-black mb-10">
                 View our products
            </button>
        </Link>
      </div>  
    </section>  
  )
}