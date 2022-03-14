import { Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Blog, Login } from "./containers";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="blogs/*" element={<Blog />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};
