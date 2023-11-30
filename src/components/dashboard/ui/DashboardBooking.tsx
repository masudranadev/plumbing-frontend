"use client";
import Loading from "@/components/common/Loading";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import Swal from "sweetalert2";
import {
  useAcceptBookingMutation,
  useDeleteBookingMutation,
  useGetBookingsQuery,
} from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { ENUM_USER_ROLE } from "@/enums/user";
import { ENUM_STATUS } from "@/enums/status";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import { useState } from "react";
import { IBookingData } from "@/types";
const items = [
  {
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    label: "Booking",
    link: "",
  },
];

const tabs = [
  {
    label: "All",
    status: "All",
  },
  {
    label: "Pending",
    status: "pending",
  },
  {
    label: "Approved",
    status: "Approved",
  },
  {
    label: "Rejected",
    status: "Rejected",
  },
];

const DashboardBooking = () => {
  const [status, setStatus] = useState<string>("All");
  const arg: any = {};
  const { data, isLoading } = useGetBookingsQuery({ ...arg });
  const [deleteBooking] = useDeleteBookingMutation();
  const [acceptBooking] = useAcceptBookingMutation();
  const { role } = getUserInfo() as any;

  //this function for deleted
  const handleCancel = (id: string) => {
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
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Cancel it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const res = deleteBooking(id);
          if (res.arg.track) {
            swalWithBootstrapButtons.fire(
              "Cancel!",
              "Your booking service has been cancel!.",
              "success"
            );
          } else {
            swalWithBootstrapButtons.fire(
              "Not Cancel!",
              "Something is wrong!!!",
              "error"
            );
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary service is safe :)",
            "error"
          );
        }
      });
  };
  const handleAccept = (id: string) => {
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
        text: "Make a confirm then accept!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Accept it!",
        cancelButtonText: "No, Accept!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const res = acceptBooking({ id, body: { status: "Approved" } });
          if (res.arg.track) {
            swalWithBootstrapButtons.fire(
              "Confirm!",
              "Client booking service has been confirm!.",
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
            "Not Confirm",
            "Please confirm then accept :)",
            "error"
          );
        }
      });
  };
  const handleReject = (id: string) => {
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
        text: "Do you want to reject booking?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Reject it!",
        cancelButtonText: "No, Reject!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const res = deleteBooking(id);
          if (res.arg.track) {
            swalWithBootstrapButtons.fire(
              "Rejected!",
              "This Booking is Rejected.",
              "success"
            );
          } else {
            swalWithBootstrapButtons.fire(
              "Not Rejected!",
              "Something is wrong!!!",
              "error"
            );
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Not Rejected",
            "Please confirm then rejected :)",
            "error"
          );
        }
      });
  };

  let bookings: IBookingData[] | undefined = [];

  if (status === "pending") {
    bookings = data?.bookings?.filter((book) => book.status === status);
  } else if (status === "Approved") {
    bookings = data?.bookings?.filter((book) => book.status === status);
  } else if (status === "Rejected") {
    bookings = data?.bookings?.filter((book) => book.status === status);
  } else {
    bookings = data?.bookings;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-5 py-2">
      <BreadCrumbs items={items} />
      <div className="flex justify-between border-b-2 border-slate-300 pb-2 mb-2">
        <h1 className="text-4xl font-bold">Booking List</h1>
      </div>
      <div role="tablist" className="tabs tabs-boxed">
        {tabs?.map((tab, i) => (
          <a
            key={i}
            role="tab"
            onClick={()=> setStatus(tab?.status)}
            className={`tab ${tab?.status === status && "tab-active"}`}
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
                UserName
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Booking Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Status
              </th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {bookings?.map((booking) => (
              <tr key={booking?.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {booking?.user?.fullName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {booking?.service?.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {format(parseISO(booking?.createdAt), "PP")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-primary">
                  <span
                    className={`border px-3 py-1 rounded-full ${
                      booking?.status === "pending"
                        ? "border-yellow-500 bg-yellow-600 text-yellow-200"
                        : booking?.status === "Approved"
                        ? "border-green-500 bg-green-600 text-green-200"
                        : "border-red-500 bg-red-600 text-red-200"
                    }`}
                  >
                    {booking?.status}
                  </span>
                </td>
                <td className="whitespace-nowrap flex justify-center py-2 gap-1">
                  {role !== ENUM_USER_ROLE.USER ? (
                    <>
                      <button
                        onClick={() => handleAccept(booking?.id)}
                        className="btn btn-sm btn-accent font-medium"
                      >
                        accept
                      </button>
                      <button
                        onClick={() => handleReject(booking?.id)}
                        disabled={booking?.status === ENUM_STATUS.APPROVED}
                        className="btn btn-sm btn-error font-medium"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleCancel(booking?.id)}
                      disabled={booking?.status === ENUM_STATUS.APPROVED}
                      className="btn btn-sm btn-error font-medium"
                    >
                      Cancel
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

export default DashboardBooking;
