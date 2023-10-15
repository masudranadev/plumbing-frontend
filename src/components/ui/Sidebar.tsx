import {
  HomeIcon,
  QuestionMarkCircleIcon,
  UserPlusIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { FaBlogger } from "react-icons/fa";
import { FcFeedback } from "react-icons/fc";
import { RiReservedFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="w-[250px] rounded min-h-screen bg-base-200 px-3 py-5">
      <h1 className="text-xl font-bold text-accent">Plumbing-Dashboard</h1>
      <ul className="menu">
        <li>
          <Link href="/home">
            <HomeIcon className="w-5 h-5 inline-block" />
            Home
          </Link>
        </li>
        <li>
          <Link href="/dashboard/service">
            <WrenchScrewdriverIcon className="w-5 h-5 inline-block" /> Service
          </Link>
        </li>
        <li>
          <Link href="/dashboard/blog">
            <FaBlogger className="w-5 h-5 inline-block" />
            Blog
          </Link>
        </li>
        <li>
          <Link href="/dashboard/faq">
            <QuestionMarkCircleIcon className="w-5 h-5 inline-block" />
            FAQ
          </Link>
        </li>
        <li>
          <Link href="/dashboard/feedback">
            <FcFeedback className="w-5 h-5 inline-block" /> Feedback
          </Link>
        </li>
        <li>
          <Link href="/dashboard/booking">
            <RiReservedFill className="w-5 h-5 inline-block" /> Booking
          </Link>
        </li>
        <li>
          <Link href="/dashboard/booking">
            <UserPlusIcon className="w-5 h-5 inline-block" /> Add Admin
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
