"use client";
import Loading from "@/components/common/Loading";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import {
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/redux/api/categoryApi";
import BreadCrumbs from "@/components/common/BreadCrumbs";
const items = [
  {
    label: "Dashboard",
    link: "/dashboard",
  },{
    label: "Category",
    link: ""
  }
]
const DashboardCategory = () => {
  const arg: any = {};
  const { data, isLoading } = useCategoriesQuery({ ...arg });
  const [deleteService] = useDeleteCategoryMutation();

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
    <div className="p-5">
      <BreadCrumbs items={items}/>
      <div className="flex justify-between border-b-2 border-slate-300 pb-2 my-3">
        <h1 className="text-3xl font-semibold">Categories List</h1>
        <Link href="/dashboard/category/create" className="btn btn-sm btn-accent text-slate-50">
          Add Category
        </Link>
      </div>
      <div className="overflow-x-auto mt-5 rounded">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Publish Date
              </th>

              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.categories?.map((category: any) => (
              <tr key={category?.id}>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {category?.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {format(parseISO(category?.createdAt), "PP")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 flex justify-center space-x-1">
                    <Link className="btn btn-sm btn-accent text-slate-50 font-medium" href={`/dashboard/category/edit/${category?.id}`}>
                      <PencilSquareIcon className="w-5 h-5" />
                    </Link>
                  <button
                    onClick={() => handleDelete(category?.id)}
                    className="btn btn-sm btn-error text-slate-50 font-medium"
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

export default DashboardCategory;
