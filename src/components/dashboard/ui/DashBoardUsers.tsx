"use client";
import Loading from "@/components/common/Loading";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { EyeIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { useMakeAdminMutation, useUsersQuery } from "@/redux/api/userApi";
import { ENUM_USER_ROLE } from "@/enums/user";
import { getUserInfo } from "@/services/auth.service";
import { useState } from "react";
import { IUserProfile } from "@/types";
import BreadCrumbs from "@/components/common/BreadCrumbs";
const tabs = [
  {
    label: "All",
    role: "All",
  },
  {
    label: "User",
    role: "user",
  },
  {
    label: "Admin",
    role: "admin",
  },
  {
    label: "Super-Admin",
    role: "super_admin",
  },
];
const items = [
  {
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    label: "Users",
    link: "",
  },
];
const DashboardUsers = () => {
  const [status, setStatus] = useState<string>("All");
  const arg: any = {};
  const { data, isLoading } = useUsersQuery({ ...arg });
  const [makeAdmin] = useMakeAdminMutation();
  const { role } = getUserInfo() as any;

  //this function for deleted
  type IValues = {
    id: string;
    role: string;
  };
  const handleMakeAdmin = (values: IValues) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Be carefull then accept!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Accept it!",
        cancelButtonText: "No, Accept!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const res = makeAdmin({
            id: values?.id,
            body: { role: values?.role },
          });
          if (res.arg.track) {
            swalWithBootstrapButtons.fire(
              "Confirm!",
              "User successfully update role.",
              "success"
            );
          } else {
            swalWithBootstrapButtons.fire(
              "Not Accept!",
              "Something is wrong!!!",
              "error"
            );
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Not Accept",
            "Please confirm then accept :)",
            "error"
          );
        }
      });
  };
  let users: IUserProfile[] | undefined = [];
  if (status === "user") {
    users = data?.users?.filter((user) => user.role === status);
  } else if (status === "admin") {
    users = data?.users?.filter((user) => user.role === status);
  } else if (status === "super_admin") {
    users = data?.users?.filter((user) => user.role === status);
  } else {
    users = data?.users;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-5">
      <BreadCrumbs items={items} />
      <div className="border-b-2 border-slate-300 pb-2 mb-3">
        <h1 className="text-3xl font-semibold">Users List</h1>
      </div>
      <div role="tablist" className="tabs tabs-boxed">
        {tabs?.map((tab, i) => (
          <a
            key={i}
            role="tab"
            onClick={() => setStatus(tab?.role)}
            className={`tab text-slate-900 ${
              tab?.role === status && "tab-active"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <div className="overflow-x-auto mt-5 rounded">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Avater
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                User Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Account Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Role
              </th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users?.map((user: any) => (
              <tr key={user?.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <div className="avatar">
                    <div className="w-8 rounded">
                      <Image
                        alt={user?.fullName}
                        src={user?.profileImg as string}
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user?.fullName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user?.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {format(parseISO(user?.createdAt), "PP")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-primary">
                  <span
                    className={`border px-3 py-1 rounded-full ${
                      user?.role === "user"
                        ? "border-yellow-500 bg-yellow-600 text-yellow-200"
                        : user?.role === "admin"
                        ? "border-green-500 bg-green-600 text-green-200"
                        : "border-red-500 bg-red-600 text-red-200"
                    }`}
                  >
                    {user?.role}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2 flex items-center space-x-2">
                  <Link
                    href={`/dashboard/profile/${user?.id}`}
                    className="btn btn-sm btn-info text-slate-50 font-medium"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                  {user?.role === ENUM_USER_ROLE.USER && (
                    <button
                      onClick={() =>
                        handleMakeAdmin({ id: user?.id, role: "admin" })
                      }
                      className="btn btn-sm btn-success text-slate-50 font-medium "
                    >
                      Make-admin
                    </button>
                  )}
                  {role === ENUM_USER_ROLE.SUPER_ADMIN &&
                    user?.role === ENUM_USER_ROLE.ADMIN && (
                      <button
                        onClick={() =>
                          handleMakeAdmin({ id: user?.id, role: "user" })
                        }
                        className="btn btn-sm btn-error text-slate-50 font-medium"
                      >
                        Make-user
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardUsers;
