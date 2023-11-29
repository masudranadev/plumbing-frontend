import React from "react";

const Modal = () => {
  return (
    <div>
      {/* The button to open modal */}
      {/* <label htmlFor="my_modal_6" className="btn">
        open modal
      </label> */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="open-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Do not share any one Email or Password
          </h3>
          <div className="border px-2 py-4 mt-3 rounded">
            <p className="">For Admin</p>
            <p className="">
              email: admin@gmail.com <br /> Password: 123456
            </p>
          </div>
          <div className="border px-2 py-4 mt-3 rounded">
            <p className="">For Super-Admin</p>
            <p className="">
              email: super-admin@gmail.com <br /> Password: 123456
            </p>
          </div>
          <div className="modal-action">
            <label htmlFor="open-modal" className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
