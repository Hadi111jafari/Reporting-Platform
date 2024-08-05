"use client";
import LogoComponent from "@/app/_components/Logo";
import { db } from "@/config/firebase";
import {
  OrganizationSwitcher,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect } from "react";

const HeaderComponent = () => {
  const { user } = useUser();
  const saveUserData = useCallback(async () => {
    try {
      if (user) {
        const docId = user.primaryEmailAddress!.emailAddress;
        await setDoc(doc(db, "Users", docId), {
          name: user?.fullName,
          avatar: user?.imageUrl,
          email: user?.primaryEmailAddress?.emailAddress,
        });
      }
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  }, [user]);

  useEffect(() => {
    saveUserData();
  }, [saveUserData]);
  return (
    <div className="flex justify-between items-center p-3 shadow-sm">
      <LogoComponent />
      <OrganizationSwitcher
        afterCreateOrganizationUrl={"/dashboard"}
        afterLeaveOrganizationUrl="/dashboard"
      />
      <UserButton />
    </div>
  );
};

export default HeaderComponent;
