import Link from "next/link";
import React from "react";

const BreadCrumbs = ({
  items,
}: {
  items: {
    label: string;
    link: string;
  }[];
}) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {items?.length > 0 &&
          items?.map((item, i) => (
            <li key={i}>
              <Link href={item?.link}>{item?.label}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
