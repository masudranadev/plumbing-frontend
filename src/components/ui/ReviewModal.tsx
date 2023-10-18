"use client";

import { StarIcon } from "@heroicons/react/24/outline";
import Form from "../forms/Form";
import React, { useState } from "react";
import LoadingButton from "../common/LoadingButton";
import SmallSpinner from "../common/SmallSpinner";
import { useAddReviewMutation } from "@/redux/api/reviewApi";
import { getUserInfo } from "@/services/auth.service";
import FormTextArea from "../forms/FormTextArea";
import { ENUM_USER_ROLE } from "@/enums/user";

const ReviewModal = ({
  serviceId,
  setOpenModal,
}: {
  serviceId: string;
  setOpenModal: (isOpen: boolean | null) => void;
}) => {
  const [rating, setRating] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const { userId, role } = getUserInfo() as any;
  const [addReview, { isLoading: loading }] = useAddReviewMutation();

  const handleSubmit = async (data: any) => {
    if (!rating) {
      setError("Must be give rating!");
      return;
    } else if (data.review === undefined) {
      setError("Must write your review");
      return;
    } else {
      setError("");
    }
    if (!!serviceId && !!userId && !!rating) {
      data["serviceId"] = serviceId;
      data["userId"] = userId;
      data["rating"] = rating;
    }
    if (role === ENUM_USER_ROLE.USER) {
      const res = await addReview(data);
      console.log(res);
    }
    setOpenModal(null);
  };
  return (
    <div>
      <input type="checkbox" id="review_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex flex-col dark:text-gray-900">
            <div className="flex flex-col items-center w-full">
              <h2 className="text-3xl font-semibold text-center">
                Your opinion matters!
              </h2>
              <div className="flex flex-col items-center py-6 space-y-3">
                <span className="text-center">How was your experience?</span>
                <div className="flex space-x-3">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <StarIcon
                      key={index}
                      className={`w-6 h-6 ${
                        index <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onMouseEnter={() => setRating(index)}
                      onMouseLeave={() => setRating(index)}
                    />
                  ))}
                </div>
                {rating < 1 && <small className="text-red-500">{error}</small>}
              </div>
              <div className="flex flex-col w-full">
                <Form submitHandler={handleSubmit}>
                  <FormTextArea
                    name="review"
                    placeholder="Wrire your review..."
                    id="review"
                    rows={3}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none"
                  />
                  <div className="mt-4">
                    <LoadingButton
                      type="submit"
                      className="btn btn-accent mt-3 w-full"
                      value="Login"
                    >
                      {loading ? <SmallSpinner /> : "leave review"}
                    </LoadingButton>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="review_modal" className="btn">
              Maybe later
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
