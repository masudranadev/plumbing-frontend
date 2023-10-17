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

const DashboardUsers = () => {
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="pr-20 pl-5 py-10">
      <div className="flex justify-between border-b-2 pb-1">
        <h1 className="text-4xl font-bold">Users List</h1>
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Role
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.users?.map((user: any) => (
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
                  {format(parseISO(user?.createdAt), "PP")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-primary">
                  {user?.role}
                </td>
                <td className="whitespace-nowrap px-4 py-2 items-center flex space-x-2">
                  <Link
                    href={`/dashboard/profile/${user?.id}`}
                    className="btn btn-info flex items-center justify-center roundedpx-4 py-2 text-xs font-medium text-white "
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                  {user?.role === ENUM_USER_ROLE.USER && (
                    <button
                      onClick={() =>
                        handleMakeAdmin({ id: user?.id, role: "admin" })
                      }
                      className="btn btn-success inline-block rounded px-4 py-2 text-xs font-medium text-white "
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
                        className="btn btn-error inline-block rounded px-4 py-2 text-xs font-medium text-white "
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
