"use client";
import Loading from "@/components/common/Loading";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { useDeleteFaqMutation, useFaqsQuery } from "@/redux/api/faqApi";
import BreadCrumbs from "@/components/common/BreadCrumbs";
const items = [
  {
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    label: "Faq",
    link: "",
  },
];
const DashboardFaq = () => {
  const arg: any = {};
  const { data, isLoading } = useFaqsQuery({ ...arg });
  const [deleteFaq] = useDeleteFaqMutation();

  //this function for deleted
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
          const res = deleteFaq(id);
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
    <div className="p-5">
      <BreadCrumbs items={items} />
      <div className="flex justify-between border-b-2 border-slate-300 pb-2">
        <h1 className="text-3xl font-bold">Faq List</h1>
        <Link
          href="/dashboard/faq/create"
          className="btn btn-sm btn-accent text-slate-50"
        >
          Add Faq
        </Link>
      </div>
      <div className="overflow-x-auto mt-5 rounded">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Question
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Publish Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Updated Date
              </th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.faqs?.map((faq: any) => (
              <tr key={faq?.id}>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {faq?.question}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {format(parseISO(faq?.createdAt), "PP")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {format(parseISO(faq?.updatedAt), "PP")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 space-x-1">
                  <Link
                    className="btn btn-sm btn-accent text-slate-50"
                    href={`/dashboard/faq/edit/${faq?.id}`}
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(faq?.id)}
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

export default DashboardFaq;
