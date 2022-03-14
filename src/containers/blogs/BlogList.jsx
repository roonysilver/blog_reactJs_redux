import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RoutesUtil } from "../../common";
import {
  blogListSelector,
  blogsTotalPageSelector,
  blogsTotalSelector,
} from "./store";
import { Blog_Delete_Type, Blog_Fetch_List_Type } from "./store/types";

export const BlogList = (props) => {
  const items = useSelector((state) => blogListSelector(state));
  const total = useSelector((state) => blogsTotalSelector(state));
  const totalPage = useSelector((state) => blogsTotalPageSelector(state));
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(["id", "title", "content", "created_at", "updated_at"]);
  const navigate = useNavigate();

  const loadList = () => {
    dispatch({
      type: Blog_Fetch_List_Type,
      payload: {
        page,
        items: limit,
        search,
      },
    });
  };

  useEffect(() => {
    loadList();
  }, [page, search]);


  const handleNew = () => {
    navigate(RoutesUtil.Blog.Create);
  };

  const handleDelete = async (id) => {
    dispatch({
      type: Blog_Delete_Type,
      payload: { id, page, items },
      callback: loadList,
    });
  };

  return (
    <>
      <div className="container">
        <h1>Blog List ({total})</h1>
        <div>
          <div className="d-flex justify-content-end">
            <a
              type="button"
              className="btn btn-primary mb-3"
              onClick={handleNew}
              data-toggle="modal"
              data-target="#exampleModal"
            >
              New Blog
            </a>
          </div>
          <input
            type="text"
            placeholder="...Search content or title..."
            className="form-control mb-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          {items.map((item, index) => {
            const linkDetails = RoutesUtil.Blog.goDetails(item.id);
            const linkEdit = RoutesUtil.Blog.goEdit(item.id)

            return (
              <ul key={index} className="list-unstyled">
                <li className="media">
                  <div
                    className="mr-2"
                    style={{ width: "160px", height: "160px" }}
                  >
                    <img
                      src={item.image.url}
                      className="mr-3"
                      alt="picture"
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </div>

                  <div className="media-body">
                    <div>
                      <h5 className="mt-0 mb-1">{item.title}</h5>
                      <div className="d-flex justify-content-end">
                        <Link to={linkDetails} className="btn btn-info mr-sm-2 btn-sm">
                          Detail
                        </Link>
                        <Link to={linkEdit} className="btn btn-warning mr-sm-2 btn-sm">
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {item.content}
                  </div>
                </li>
              </ul>
            );
          })}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array.from({ length: totalPage }, (_, idx) => idx + 1).map(
                (index) => (
                  <li className="page-item" key={index}>
                    <a className="page-link" onClick={() => setPage(index)}>
                      {index}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
