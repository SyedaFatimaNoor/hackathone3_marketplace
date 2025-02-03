import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div 
          style={{ fontFamily: "ClashDisplay" }} 
          className="bg-[#2A254B] p-6"
        >
          <h1 className="text-3xl font-bold text-center text-white">
            User Profile
          </h1>
        </div>

        <div className="p-8 space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <Image 
              src={user.imageUrl} 
              alt="Profile Picture" 
              width={150} 
              height={150} 
              className="rounded-full border-4 border-[#2A254B] shadow-lg"
            />
            <button 
              className="px-4 py-2 bg-[#2A254B] text-white rounded-full 
              hover:bg-[#3A355B] transition"
            >
              Change Profile Picture
            </button>
          </div>

          {/* User Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                First Name
              </label>
              <input 
                type="text" 
                defaultValue={user.firstName || ''} 
                className="w-full px-4 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Last Name
              </label>
              <input 
                type="text" 
                defaultValue={user.lastName || ''} 
                className="w-full px-4 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              value={user.emailAddresses[0]?.emailAddress || ''} 
              disabled 
              className="w-full px-4 py-2 border rounded-lg 
              bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button 
              className="w-full px-6 py-3 bg-[#2A254B] text-white 
              rounded-full hover:bg-[#3A355B] transition"
            >
              Save Changes
            </button>

            <div className="grid md:grid-cols-2 gap-4">
              <button 
                className="px-6 py-3 bg-red-500 text-white 
                rounded-full hover:bg-red-600 transition"
              >
                Delete Account
              </button>
              <button 
                className="px-6 py-3 border border-[#2A254B] 
                text-[#2A254B] rounded-full hover:bg-gray-100 transition"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}