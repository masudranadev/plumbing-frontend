"use client";
import FormInput from "./FormInput";
import Form from "./Form";
import SelectFormField from "./SelectFormField";

const ContactForm = () => {
  const services = [
    {
      label: "Kitchen Plumbing",
      value: "Kitchen Plumbing",
    },
    {
      label: "Gas Line Services",
      value: "Gas Line Services",
    },
    {
      label: "Water Line Repair",
      value: "Water Line Repair",
    },
    {
      label: "Bathroom Plumbing",
      value: "Bathroom Plumbing",
    },
    {
      label: "Basement Plumbing",
      value: "Basement Plumbing",
    },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <Form submitHandler={onSubmit}>
        <div className="px-[20%] py-10 shadow-md">
          <div className="flex gap-3 pt-5">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <FormInput
                name="fullName"
                label="Your Name"
                type="text"
                placeholder="Enter your name"
                id="username"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="w-full md:w-1/2">
              <FormInput
                name="email"
                label="Your Email"
                type="email"
                placeholder="Enter your email"
                id="email"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-5">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <FormInput
                name="contactNo"
                label="Phone Number"
                type="text"
                placeholder="Enter your number"
                id="contactno"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            <div className="w-full md:w-1/2">
              <SelectFormField
                options={services}
                name="service"
                label="Select service"
                id="service"
              />
            </div>
          </div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2 pt-5"
            htmlFor="type-of-service"
          >
            You need what type of service?
          </label>
          <textarea
            name="service"
            id="type-of-service"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none"
            rows={2}
            placeholder="example: I want to shifting my office"
          ></textarea>
        </div>
        <div className="w-full flex justify-center py-2">
          <button type="submit" className="btn">
            Request Service
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;
