import Link from "next/link";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "./ui/button";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <div className="fixed z-50 top-0 inset-x-0 text-white pt-4 bg-bg_primary">
      <header className="relative">
        <div className="w-4/5 mx-auto flex items-center justify-between border-b pb-3">
          <div>
            <Link href={"/"}>
              <h1 className="text-4xl hover:text-primary">Cinécue</h1>
            </Link>
          </div>
          <div>
            <ul className="flex items-center gap-3">
              <li className="hover:text-primary">
                <Link href={"/movies"}>Films</Link>
              </li>
              <li className="hover:text-primary">
                <Link href={"/tv-shows"}>TV Shows</Link>
              </li>
              <li className="hover:text-primary">
                <Link href={"/lists"}>lists</Link>
              </li>
              {user ? (
                <>
                  <li className="hover:text-primary">
                    <Link href={"/watchlist"}>Watch list</Link>
                  </li>
                  <li>
                    <Button variant={"destructive"}>
                      <LogoutLink>Log out</LogoutLink>
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <LoginLink>
                      <Button variant={"ghost"}>Login</Button>
                    </LoginLink>
                  </li>
                  <li>
                    <RegisterLink>
                      <Button>Sign up</Button>
                    </RegisterLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}
