"use client"

import { MyuserContextProvider } from "@/hooks/useUser"

interface Props {
  children: React.ReactNode
}

function UserProvider({ children }: Props) {
  return <MyuserContextProvider>{children}</MyuserContextProvider>
}

export default UserProvider
