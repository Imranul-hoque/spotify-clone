"use client"

import { createContext, useContext, useEffect, useState } from "react";

import {
  User,
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

import { Subscription, UserDetails } from "@/user_types";

type UserContextType = {
  accessToken: string | null;
  isLoading: boolean;
  user: User | null;
  userDetails: UserDetails | null;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").single();

  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*,prices(*, products(*))")
      .in("status", ["trialing", "active"])
            .single();
    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsloadingData(true);
            Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
                const userDetailsResult = results[0];
                const userSubscriptionResult = results[1];

                if (userDetailsResult.status === "fulfilled") {
                    setUserDetails(userDetailsResult.value.data as UserDetails)
                }
                if (userSubscriptionResult.status === "fulfilled") {
                    setSubscription(userSubscriptionResult.value.data as Subscription)
                }
                setIsloadingData(false)
            })
        } else if (!user && !isLoadingData && !isLoadingData) {
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isLoadingData]);

    const value = {
      accessToken,
      user,
      userDetails,
      isLoading: isLoadingUser || isLoadingData,
      subscription,
    };

    return <UserContext.Provider value={value} {...props} />;
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
