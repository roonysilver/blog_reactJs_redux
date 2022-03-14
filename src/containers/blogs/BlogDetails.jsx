import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { blogDetailsSelector } from "./store";
import { Blog_Fetch_Item_Type } from './store/types'

export const BlogDetails = () => {
    const params = useParams();
    const items = useSelector((state) => blogDetailsSelector(state, params.id));
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: Blog_Fetch_Item_Type,
            payload: {
                id: params.id
            }
        })
    }, [])

    return <>
        <div className="container">
            <h2>{items.title}</h2>
            <img
                src={items.image.url}
                className=""
                alt="picture"
                width="200px"
                height="200px"
            />

            <div>{items.content}</div>
        </div>
    </>
}