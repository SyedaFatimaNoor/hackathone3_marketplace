"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, 
  Heart, 
  Settings, 
  CreditCard, 
  MapPin, 
  Bell, 
  LogOut 
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-2xl text-gray-600">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Profile Header */}
        <div 
          className="bg-gradient-to-r from-[#2A254B] to-[#3A355B] p-8 text-white flex items-center space-x-6"
        >
          <Image 
            src={user.imageUrl} 
            alt="Profile Picture" 
            width={120} 
            height={120} 
            className="rounded-full border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.fullName}</h1>
            <p className="text-gray-300">{user.emailAddresses[0].emailAddress}</p>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="p-8 grid md:grid-cols-2 gap-6">
          <ProfileActionCard 
            icon={<ShoppingBag className="w-6 h-6 text-[#2A254B]" />} 
            title="My Orders" 
            description="View and track your recent purchases"
            href="/orders"
          />
          <ProfileActionCard 
            icon={<Heart className="w-6 h-6 text-[#2A254B]" />} 
            title="Wishlist" 
            description="Manage your favorite items"
            href="/wishlist"
          />
          <ProfileActionCard 
            icon={<Settings className="w-6 h-6 text-[#2A254B]" />} 
            title="Account Settings" 
            description="Manage your profile and preferences"
            href="/account-settings"
          />
          <ProfileActionCard 
            icon={<CreditCard className="w-6 h-6 text-[#2A254B]" />} 
            title="Payment Methods" 
            description="Add or remove payment options"
            href="/payment-methods"
          />
          <ProfileActionCard 
            icon={<MapPin className="w-6 h-6 text-[#2A254B]" />} 
            title="Addresses" 
            description="Manage shipping addresses"
            href="/addresses"
          />
          <ProfileActionCard 
            icon={<Bell className="w-6 h-6 text-[#2A254B]" />} 
            title="Notifications" 
            description="Control your notification preferences"
            href="/notifications"
          />
        </div>

        {/* Logout Button */}
        <div className="p-8 border-t text-center">
          <SignOutButton>
            <button className="bg-red-50 text-red-600 hover:bg-red-100 px-6 py-3 rounded-lg flex items-center mx-auto space-x-2">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}

// Reusable Profile Action Card Component
function ProfileActionCard({ 
  icon, 
  title, 
  description, 
  href 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  href: string 
}) {
  return (
    <Link 
      href={href} 
      className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition-all duration-300 flex items-center space-x-4 group"
    >
      <div className="bg-white p-3 rounded-full shadow-md">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#2A254B] group-hover:text-[#3A355B]">
          {title}
        </h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </Link>
  );
}