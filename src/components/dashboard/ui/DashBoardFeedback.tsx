"use client";
import Loading from "@/components/common/Loading";
import { format, parseISO } from "date-fns";
import { TrashIcon } from "@heroicons/react/20/solid";
import { EyeIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import {
  useDeleteFeedbackMutation,
  useFeedbacksQuery,
} from "@/redux/api/feedbackApi";
import Link from "next/link";

const DashboardFeedback = () => {
  const arg: any = {};
  const { data, isLoading } = useFeedbacksQuery({ ...arg });
  const [deleteFeedback] = useDeleteFeedbackMutation();

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
          const res = deleteFeedback(id);
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
    <div className="pr-20 pl-5 py-10">
      <div className="flex justify-between border-b-2 pb-1">
        <h1 className="text-4xl font-bold">Feedback List</h1>
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                User
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Service
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Create Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Comments
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.feedbacks?.map((feedback: any) => (
              <tr key={feedback?.id}>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {feedback?.user?.fullName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {feedback?.service?.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {format(parseISO(feedback?.createdAt), "PP")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-primary">
                  {feedback?.comments}
                </td>
                <td className="whitespace-nowrap px-4 py-2 space-x-1">
                  <button className="btn inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                    <Link href={`/dashboard/feedback/${feedback?.id}`}>
                      <EyeIcon className="w-5 h-5" />
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDelete(feedback?.id)}
                    className="btn btn-error inline-block rounded px-4 py-2 text-xs font-medium text-white "
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

export default DashboardFeedback;
