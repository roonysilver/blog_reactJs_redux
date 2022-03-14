import * as axios from "axios";

export const AxiosClient = axios.create({
  baseURL: "https://api-placeholder.herokuapp.com/api/v2/",
  timeout: 10 * 1000,
});

export const AxiosMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
}