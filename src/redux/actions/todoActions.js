import axios from "axios";

export async function getAllTodos() {
  try {
    const response = await axios.get("/api/");
    return response.data.allTodos;
  } catch (e) {
    return e;
  }
}

export async function createTodo(data) {
  const { todo, importance } = data;
  try {
    const response = await axios.post("/api/", { todo, importance });
    return response.data;
  } catch (e) {
    return e;
  }
}

export async function deleteTodo(id) {
  try {
    const response = await axios.delete(`/api/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
}

export async function editTodo(payload) {
  const { id, body } = payload;
  try {
    const response = await axios.put(`/api/${id}`, body);
    return response.data;
  } catch (e) {
    return e;
  }
}
