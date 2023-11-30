"use client";
import Loading from "@/components/common/Loading";
import {
  useDeleteServiceMutation,
  useServicesQuery,
} from "@/redux/api/serviceApi";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { TrashIcon } from "@heroicons/react/20/solid";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import BreadCrumbs from "@/components/common/BreadCrumbs";
const items = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Service",
    link: "",
  },
];
const DashboardService = () => {
  const arg: any = {};
  const { data, isLoading } = useServicesQuery({ ...arg });
  const [deleteService] = useDeleteServiceMutation();

  const handleDelete = (id: string) => {
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
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const res = deleteService(id);
          if (res.arg.track) {
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          } else {
            swalWithBootstrapButtons.fire(
              "Not Deleted!",
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
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="px-5 py-5">
      <BreadCrumbs items={items} />
      <div className="flex justify-between border-b-2 border-slate-300 pb-3">
        <h1 className="text-3xl font-bold">Service List</h1>
        <Link
          href="/dashboard/service/create"
          className="btn btn-sm btn-accent text-slate-50"
        >
          Add Service
        </Link>
      </div>
      <div className="mt-5 overflow-x-auto rounded">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Thumbnail
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Publish Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.services?.map((service: any) => (
              <tr key={service?.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <div className="avatar">
                    <div className="w-8 rounded">
                      <Image
                        alt={service?.title}
                        src={service?.image}
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {service?.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {format(parseISO(service?.createdAt), "PP")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-primary">
                  {service?.price} ৳
                </td>
                <td className="whitespace-nowrap px-4 py-2 space-x-1 flex justify-center">
                  <Link
                    className="btn btn-sm btn-accent text-slate-50"
                    href={`/dashboard/service/edit/${service?.id}`}
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </Link>

                  <Link
                    className="btn btn-sm btn-accent text-slate-50"
                    href={`/service/${service?.id}`}
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(service?.id)}
                    className="btn btn-sm btn-error text-slate-50"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardService;
