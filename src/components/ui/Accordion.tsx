"use client";

import { useFaqsQuery } from "@/redux/api/faqApi";

const Accordion = () => {
  const arg: any = {};
  const { data } = useFaqsQuery({ ...arg });

  return (
    <div className="w-full lg:w-[1020px] mx-auto px-3 py-24">
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
              Do you want to know!
            </h2>
            <p className="text-base text-body-color">
              It is a long established fact that a reader will be distracted
              content of a page when looking.
            </p>
          </div>
        </div>
      </div>
      {data?.faqs?.map((faq) => (
        <div key={faq?.id} className="collapse collapse-arrow bg-base-200 my-1">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            {faq?.question}
          </div>
          <div className="collapse-content">
            <p>{faq?.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
