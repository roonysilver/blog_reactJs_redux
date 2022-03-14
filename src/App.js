import {  Link, Outlet } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RoutesUtil } from "./common";

export const App = () => {
  return (
    <>
        <Link to={RoutesUtil.Blog.List}><h1>Blogs Managerment</h1></Link>
        <hr></hr>
      <Outlet/>
    </>
  );
}
