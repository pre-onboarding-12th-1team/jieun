import { TodoType } from "../types/todo"
import { BASE_URL } from "./const"

//새로운 TODO 등록하는 API 호출
export const createTodo = async (
  data: { todo: string }
): Promise<TodoType | null>  => {
  const access_token = localStorage.getItem("accessToken")
  const createTodoRes = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`
    },
    body: JSON.stringify(data)
  })
  
  if(createTodoRes.ok) {
    return createTodoRes.json()
  }

  return null
}

//TODO LIST 조회하는 API 호출
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

//TODO 수정하는 API 호출
export const updateTodo = async (
  id: number,
  data: { todo: string, isCompleted: boolean }
): Promise<TodoType | null> => {
  const access_token = localStorage.getItem("accessToken")
  const updateTodoRes = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`  
    },
    body: JSON.stringify(data)
  })

  if(updateTodoRes.ok) {
    return updateTodoRes.json()
  }

  return null
}

//TODO 삭제하는 API 호출
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