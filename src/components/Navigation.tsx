import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

export default async function Navigation() {
  const { userId } = await auth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <div className="flex space-x-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        {userId && (
          <>
            <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <Link href="/profile" className="hover:text-blue-600">Profile</Link>
          </>
        )}
      </div>
      <div>
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div className="space-x-2">
            <Link 
              href="/login" 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}