import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

function NaviBar() {
  return (
    <header className="w-full">
      <NavigationMenu className="w-full block bg-primary text-black shadow-md border-2 border-black">
        <ul className="flex gap-4 p-3">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </NavigationMenu>
    </header>
  );
}

export default NaviBar;

