import { createContext, useState, useEffect, useContext } from "react"
import {
  useSessionContext,
  useUser as useSupaUser,
  User,
} from "@supabase/auth-helpers-react"
import { Subscription, UserDetails } from "@/types"

interface UserContextType {
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null
  isLoading: boolean
  subscription: Subscription | null
}

export const UserContext = createContext<UserContextType | null>(null)

export interface Props {
  [propName: string]: any
}

export const MyuserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext()
  const user = useSupaUser()
  const accessToken = session?.access_token ?? null
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  const getUserDetails = () => supabase.from("users").select().single()
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single()

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true)

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const [userDetailPromise, subscriptionlPromise] = results
          if (userDetailPromise.status === "fulfilled") {
            setUserDetails(userDetailPromise.value.data as UserDetails)
          }
          if (subscriptionlPromise.status === "fulfilled") {
            setSubscription(subscriptionlPromise.value.data as Subscription)
          }

          setIsLoadingData(false)
        }
      )
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
      setSubscription(null)
    }
  }, [user, isLoadingUser])

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a MyUserContextProvider")
  }

  return context
}
