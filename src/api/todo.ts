import { TodoType } from "../types/todo"
import { BASE_URL } from "./const"

export const createTodo = async (
  data: { todo: string }
): Promise<"success" | "fail">  => {
  const access_token = localStorage.getItem("accessToken")
  const createTodoRes = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`
    },
    body: JSON.stringify(data)
  })
  
  return createTodoRes.ok ? "success" : "fail"
}

export const getTodos = async (): Promise<TodoType[] | null> => {
  const access_token = localStorage.getItem("accessToken")
  const getTodosRes = await fetch(`${BASE_URL}/todos`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  
  if(getTodosRes.ok) {
    return getTodosRes.json()
  }

  return null
}

export const updateTodo = async (
  id: number,
  data: { todo: string, isCompleted: boolean }
): Promise<"success" | "fail"> => {
  const access_token = localStorage.getItem("accessToken")
  const updateTodoRes = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`  
    },
    body: JSON.stringify(data)
  })

  return updateTodoRes.ok ? "success" : "fail"
}

export const deleteTodo = async (
  id: number
): Promise<"success" | "fail"> => {
  const access_token = localStorage.getItem("accessToken")
  const deleteTodoRes = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${access_token}`  
    }
  })

  return deleteTodoRes.ok ? "success" : "fail"
}