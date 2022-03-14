import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoutesUtil } from "../../common";
import { Blog_Create_Type } from "./store/types";
export const BlogUpsert = (props) => {
  useEffect(() => { }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const handleSelectFile = (files) => {
    if (files && files.length > 0) {
      setFile(files[0]);
      processShowFile(files[0])
    }
  };

  const processShowFile = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImgFile(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleCreate = () => {
    const payload = {
      "blog[title]": title,
      "blog[content]": content,
      "blog[image]": file,
    };

    dispatch({
      type: Blog_Create_Type,
      payload,
    });
    setTitle("");
    setContent("");
    setFile(null)
  };

  const cancelChange = () => {
    setTitle("");
    setContent("");
    setFile(null)
    navigate(RoutesUtil.Blog.List);
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="">
            <h3 className="title">Create New Blog</h3>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Blog title"
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              className="form-control"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Image</label>
            {imgFile && <img className="mr-2" name="img" src={imgFile} alt="image blogs" width={150} height={150} />}
            <button type="button" className="btn btn-success" onClick={() => document.getElementById("choose-file").click()}>Choose file</button>
            <input
              id="choose-file"
              type="file"
              className="form-control-file"
              onChange={(e) => handleSelectFile(e.target.files)}
              style={{ display: "none" }}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => cancelChange()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleCreate()}
            >
              Save Blogs
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
