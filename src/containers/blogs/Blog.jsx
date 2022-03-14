import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { BlogDetails } from '.';
import { BlogList } from "./BlogList";
import { BlogUpdate } from './BlogUpdate';
import { BlogUpsert } from "./BlogUpsert";

export const Blog = () => {
  return (
    <>
      <Routes>
        <Route path="create" element={<BlogUpsert />} />
        <Route path={"/:id"} element={<BlogDetails/>} />
        <Route path={":id/edit"} element = {<BlogUpdate/>}/>
        <Route path="" element={<BlogList />} />
      </Routes>
    </>
  );
};
