import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const Service = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Right Section (Image) */}
      <div className="h-auto bg-[#F5F5F5]">
        <Image
          src="https://img.freepik.com/free-photo/chic-modern-luxury-aesthetics-style-living-room-blue-tone_53876-125839.jpg?t=st=1740570401~exp=1740574001~hmac=46d6bdaaa71de3e934032550c37a28b387726a2ced7a0d45b1f3c4970dc6620e&w=1060"
          alt="Artisan Craftsmanship Workshop"
          width={720}
          height={600}
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={80}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left Section (Text) */}
      <div className="px-8 md:px-16 py-16">
        <div className="max-w-xl">
          <h2 style={{ fontFamily: 'ClashDisplay' }} className="text-2xl font-normal text-[#2A254B] mb-6">
            Our service isn&apos;t just personal, it&apos;s actually
            hyper personally exquisite
          </h2>
          <p className="text-base text-[#505977] mb-8">
            When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. 
            <br />
            <br />
            <br />
            Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become 
            the hotbed for the London interior design community.
          </p>
          <Link href="/ContactUs">
            <button className="mt-[125px] px-8 py-4 border border-[#2A254B] text-[#2A254B] hover:bg-gray-100">
              Get in touch
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(Service);