"use client";

import {
  useDeleteCartMutation,
  useGetCartsQuery,
} from "@/redux/api/addToCartApi";
import Loading from "../common/Loading";
import Swal from "sweetalert2";
import Link from "next/link";

const Carts = () => {
  const arg: any = {};
  const { data, isLoading } = useGetCartsQuery({ ...arg });
  const [deleteCart, { isSuccess }] = useDeleteCartMutation();

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
          deleteCart(id);
          if (isSuccess) {
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
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
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 container py-10 lg:py-16">
        {data?.carts?.map((cart) => (
          <div key={cart?.id} className="card bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-slate-50">{cart?.service?.title}</h2>
              <h2 className="card-title text-accent text-left">${cart?.service?.price}</h2>
              <p>{cart?.service?.description}</p>
              <div className="card-actions justify-end">
                <Link href={`/booking/${cart?.service?.id}`} className="btn btn-accent btn-outline">Book now</Link>
                <button
                  onClick={() => handleDelete(cart?.id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carts;
