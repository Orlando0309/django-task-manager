import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = () => (
    <>
        <Navbar lock />
        <Outlet />  {/* This renders the matched child route */}
    </>
);

export default Layout;