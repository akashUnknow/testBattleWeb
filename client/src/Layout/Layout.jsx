import { NavLink, Outlet } from "react-router-dom";

import NavBar from "../component/NavBar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <NavBar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
