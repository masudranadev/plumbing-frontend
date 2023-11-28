"use client";

import Link from "next/link";
export type IMenu = {
  label: string;
  link: string;
  active: string;
};

type BannerProps = {
  menu: IMenu[];
  title: string;
};

const Banner = ({ menu, title }: BannerProps) => {
  return (
    <div
      className="hero min-h-[40vh]"
      style={{
        backgroundImage: "url(/assets/images/page-title.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-slate-50">{title}</h1>
          <div className="text-base breadcrumbs flex justify-center">
            <ul>
              {menu?.map((item, i) => (
                <li key={i}>
                  <Link className="text-slate-50" href={item?.link}>
                    {item?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
