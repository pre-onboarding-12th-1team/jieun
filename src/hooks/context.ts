import { createContext, useContext } from "react";
import { TodoType } from "../types/todo";

export const TodoListContext = createContext<TodoType[] | undefined>(undefined)

export const useTodoListContext = () => {
  const todoList = useContext(TodoListContext)

  if(todoList === undefined) {
    throw new Error("useUserContext쓰려면 TodoListContext도 같이 써야함")
  }

  return todoList
}