 
/* eslint-disable @typescript-eslint/no-unused-vars */
 

'use client';

// import { useSidebar } from "@/context/SidebarContext";
// import { useSession } from "next-auth/react";
import Image from 'next/image';
// import { type UserInterface } from "otz-types";
import {
  ReactNode, useCallback, useEffect, useState,
} from 'react';
// import { UserProfile } from "../users/UserProfile";
import { Loader2, Locate } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { useToast } from "../ui/use-toast";
// import { useUpdateHospitalLocationMutation } from "@/api/hospital/hospital.api";
// import { BellIcon } from 'lucide-react'
export function Sidebar({
  children,
  isSearchable = true,
}: {
  children: ReactNode;
  isSearchable?: boolean;
}) {
//   const { isSidebarOpen } = useSidebar();
//   const { data: session } = useSession();
//   const [user, setUser] = useState<Partial<UserInterface>>();
  // const { setHospitalID } = useUserContext()
  // const { data: hData } = useGetAllSearchedHospitalQuery({
  //   searchQuery: search?.label as string
  // })

  // useEffect(() => {
  //   if (search?.id) {
  //     setHospitalID(search?.id)
  //   }
  // }, [search?.id, setHospitalID])

  // const hospitalOptions = useCallback(() => {
  //   return hData?.map(item => ({
  //     id: item?.id,
  //     label: item?.hospitalName
  //   }))
  // }, [hData])

  //   useEffect(() => {
  //     if (session) {
  //       const transformedUser: Partial<UserInterface> = {
  //         ...session.user,
  //         email: session.user.email ?? undefined,
  //       };
  //       setUser(transformedUser);
  //     }
  //   }, [session]);
  //   const [updateHospitalLocation, { isLoading, data, error }] =
  //     useUpdateHospitalLocationMutation();

  //   const handleUpdateLocation = useCallback(() => {
  //     navigator.geolocation.getCurrentPosition(async (pos) => {
  //       const authData = {
  //         id: user?.hospitalID,
  //         latitude: pos.coords.latitude,
  //         longitude: pos.coords.longitude,
  //         locationUpdatedAt: new Date(),
  //         locationUpdatedBy: session?.user?.id,
  //       };
  //       await updateHospitalLocation(authData);
  //     });
  //   }, [user?.hospitalID, session?.user?.id, updateHospitalLocation]);

  //   const { toast } = useToast();

  //   const send = useCallback(
  //     () =>
  //       toast({
  //         // variant:'success',
  //         title: "Completed",
  //         description: "Hospital Location updated successfully.",
  //         // action: <ToastAction altText="Saved">Undo</ToastAction>
  //       }),
  //     [toast]
  //   );

  //   useEffect(() => {
  //     if (data) {
  //       send();
  //     }
  //   }, [data, send]);

  return (
    <div
      className={`
        bg-sky-950
        h-screen
        w-52
        overflow-y-auto
        relative

    `}
    >
      <div
        className="p-2 flex flex-row items-center border-b border-slate-200
      justify-center"
      >
        <p className="text-white font-bold text-lg">Mother Angela</p>
        {/* <Image
          src={"/img/logo1.svg"}
          alt="img"
          width={0}
          height={0}
          style={{ width: "90px", height: "auto" }}

          // quality={100}
        /> */}
      </div>
      {/* <SearchInputDropDown
  data={hospitalOptions() ?? []}
  setSearch={setSearch}
  search={search}
  /> */}

      {children}
      {/* <div className="absolute w-full bottom-0 flex flex-col items-center p-2">
        <p className="text-sm text-slate-500">Terms & Conditions Applied</p>
        <div className="flex flex-row text-sm">
          <p className="text-blue-500 text-underline">Powered by Synergy</p>
        </div>
      </div> */}
      <div className="absolute pb-4 pl-4 pr-4  bottom-0  w-full text-center" />
    </div>
  );
}
