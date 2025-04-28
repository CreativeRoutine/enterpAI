// "use client";

import React from "react";
import { auth, signOut } from "@/auth";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  // XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   TransitionChild,
// } from "@headlessui/react";
import { LogOut } from "lucide-react";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

const Sidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  // console.log("userId====>", userId);

  // const [sidebarOpen, setSidebarOpen] = useState(false);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200  px-6">
          {/* LOGO */}
          <div className="flex h-16 shrink-0 items-center">
            <Image
              alt="Your Company"
              width={36}
              height={36}
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.current
                              ? "text-indigo-600"
                              : "text-gray-400 group-hover:text-indigo-600",
                            "size-6 shrink-0"
                          )}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs/6 font-semibold text-gray-400">
                  Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams.map((team) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className={classNames(
                          team.current
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        )}
                      >
                        <span
                          className={classNames(
                            team.current
                              ? "border-indigo-600 text-indigo-600"
                              : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                            "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                          )}
                        >
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              {userId ? (
                <form
                  className="px-10 pt-[100px] -mx-6 mt-auto"
                  action={async () => {
                    "use server";

                    await signOut();
                    // { redirectTo: ROUTES.SIGN_IN }
                  }}
                >
                  <Button
                    type="submit"
                    className="border border-white rounded-xl px-6 py-4 cursor-pointer"
                  >
                    <LogOut className="size-5 text-white" />
                    <span className="max-lg:hidden text-white">Log out</span>
                  </Button>
                </form>
              ) : (
                <li className="-mx-6 mt-auto">
                  <div className="flex flex-col gap-3">
                    <Button
                      className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                      asChild
                    >
                      <Link href={ROUTES.SIGN_IN}>
                        <Image
                          src="/icons/account.svg"
                          alt="Account"
                          width={20}
                          height={20}
                          className="invert-colors lg:hidden"
                        />
                        <span className="primary-text-gradient max-lg:hidden">
                          Log In
                        </span>
                      </Link>
                    </Button>

                    <Button
                      className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
                      asChild
                    >
                      <Link href={ROUTES.SIGN_UP}>
                        <Image
                          src="/icons/sign-up.svg"
                          alt="Account"
                          width={20}
                          height={20}
                          className="invert-colors lg:hidden"
                        />
                        <span className="max-lg:hidden">Sign Up</span>
                      </Link>
                    </Button>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile top bar: visible on mobiles only */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-6 lg:hidden">
        <button
          type="button"
          // onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-sm/6 font-semibold text-gray-900">
          Dashboard
        </div>
        <a href="#">
          <span className="sr-only">Your profile</span>
          <Image
            alt=""
            width={36}
            height={36}
            src="/"
            className="size-8 rounded-full bg-gray-50"
          />
        </a>
      </div>
    </>
  );
};

export default Sidebar;
