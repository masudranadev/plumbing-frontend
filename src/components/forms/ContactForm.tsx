"use client";
import FormInput from "./FormInput";
import Form from "./Form";
import SelectFormField, { SelectOptions } from "./SelectFormField";
import FormTextArea from "./FormTextArea";
import { useServicesQuery } from "@/redux/api/serviceApi";

const ContactForm = () => {
  const arg = {};
  const { data } = useServicesQuery({ ...arg });
  const services = data?.services?.map((service: any) => {
    return {
      label: service?.title,
      value: service?.id,
    };
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="bg-white w-full md:max-w-[1020px] mx-auto my-5 md:my-24">
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
              Have any Question
            </h2>
            <p className="text-base text-body-color">
              It is a long established fact that a reader will be distracted
              content of a page when looking.
            </p>
          </div>
        </div>
      </div>
      <Form submitHandler={onSubmit}>
        <div className="px-2 md:p-10 shadow-md pb-5">
          <div className="flex flex-col md:flex-row gap-x-3 pt-5">
            <div className="w-full md:w-1/2 lg:mb-6 md:mb-0">
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
          <div className="flex flex-col md:flex-row gap-x-3">
            <div className="w-full md:w-1/2 lg:mb-6 md:mb-0">
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
                options={services as SelectOptions[]}
                name="serviceId"
                label="Select service"
                id="service"
                className="select select-none border border-gray-500"
              />
            </div>
          </div>

          <FormTextArea
            name="message"
            placeholder="message"
            id="message"
            rows={3}
            label="Message"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none"
          />
          <button type="submit" className="btn btn-accent text-white">
            Request Service
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;
