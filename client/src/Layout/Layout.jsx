import { NavLink, Outlet } from "react-router-dom";

import NaviBar from "../component/NaviBar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <NaviBar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
