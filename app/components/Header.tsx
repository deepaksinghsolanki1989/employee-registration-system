import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  const signOutUser = () => {};

  return (
    <header className="header">
      <div className="header-wrapper">
        <form
          action={async () => {
            // "use server";

            await signOutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};
export default Header;
