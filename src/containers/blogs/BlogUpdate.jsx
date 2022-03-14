import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { blogDetailsSelector } from ".";
import { RoutesUtil } from "../../common";
import { Blog_Fetch_Item_Type, Blog_Update_Type } from "./store/types";
export const BlogUpdate = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams()
  const items = useSelector((state) => blogDetailsSelector(state, params.id))
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
    image: '',
  });


  useEffect(() => {
    dispatch({
      type: Blog_Fetch_Item_Type,
      payload: {
        id: params.id
      }
    });
  }, [])

  useEffect(() => {
    initialForm(items)
  }, [items]);


  const initialForm = (formData) => {
    formData = {
      ...form,
      title: items?.title,
      content: items?.content,
      image: items?.image?.url
    }

    setForm(formData);
    setTitle(formData.title);
    setContent(formData.content);
    setFile(formData.image);
  }

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

  const handleUpdate = () => {
    const payload = {
      "id": params.id,
      "blog[title]": title,
      "blog[content]": content,
      "blog[image]": file,
    };
    dispatch({
      type: Blog_Update_Type,
      payload
    });
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
            <h3 className="title">Edit Blog</h3>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="...Blog title..."
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              placeholder="...Blog content..."
              className="form-control"
              rows="3"
              value={content || ''}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label className="mr-2">Image</label>
            <img className="mr-2" name="img" src={imgFile ? imgFile : file} alt="image blogs" width={150} height={150} />
            <button type="button" className="btn btn-success" onClick={() => document.getElementById("choose-file").click()}>Choose file</button>
            <input
              id="choose-file"
              type="file"
              className="form-control-file btn btn-success"
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
              onClick={() => handleUpdate()}
            >
              Edit Blog
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
