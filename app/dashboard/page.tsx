"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  if (!session) {
    return <div>Please sign in to view your dashboard.</div>
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Handle profile update logic here

    setIsLoading(false)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Welcome, {session.user?.name || session.user?.email}</h1>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={session.user?.name || ""} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={session.user?.email || ""} disabled />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Update Profile
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="orders">
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Your Orders</h2>
            {/* Add order history list here */}
            <p>No orders found.</p>
          </div>
        </TabsContent>
        <TabsContent value="wishlist">
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Your Wishlist</h2>
            {/* Add wishlist items here */}
            <p>Your wishlist is empty.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

