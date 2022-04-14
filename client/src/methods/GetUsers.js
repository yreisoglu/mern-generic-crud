import axios from "axios";
import useStore from "../store";

const labURL = "http://47.168.155.32:5000";
const devURL = "https://mern-generic-crud.herokuapp.com";

const HTTP = axios.create({
  baseURL: labURL,
});

export const GetUsers = async () => {
  return new Promise((resolve, reject) => {
    HTTP.get("/api/user", { headers: { "x-access-token": localStorage.getItem("jwt") } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const GetUsersByDepartment = async (selectedDepartment) => {
  return new Promise((resolve, reject) => {
    HTTP.get("/api/user/get-users-by-department", {
      headers: { "x-access-token": localStorage.getItem("jwt") },
      data: { department: selectedDepartment },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const GetUserById = async (id) => {
  return new Promise((resolve, reject) => {
    HTTP.get("/api/user/get-user-by-id", {
      params: { id: id },
      headers: { "x-access-token": localStorage.getItem("jwt") },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const UpdateUser = async (body) => {
  await HTTP.put("/api/user", body, { headers: { "x-access-token": localStorage.getItem("jwt") } })

    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export const DeleteUsersByIds = async (ids) => {
  let payload = {
    ids: ids,
    token: localStorage.getItem("jwt"),
  };
  return new Promise((resolve, reject) => {
    HTTP.delete("/api/user/delete-multiple", { data: payload })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
