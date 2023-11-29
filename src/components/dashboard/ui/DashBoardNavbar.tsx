const DashBoardNavbar = () => {
  return (
    <div className="navbar bg-slate-50 shadow-lg shadow-slate-900">
      <div className="flex-none">
        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Plumbing</a>
      </div>
    </div>
  );
};

export default DashBoardNavbar;
