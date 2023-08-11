import { createContext, useContext } from "react"
import { TodoType } from "../types/todo"

export const TodosContext = createContext<TodoType[] | null>(null)

export const useTodosContext = () => {
  const todos = useContext(TodosContext)

  if(todos === null) {
    throw new Error("useTodosContext()쓰려면 TodosContext.Provider로 컴포넌트 감싸야함.")
  }

  return todos
}