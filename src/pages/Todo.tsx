import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoInsert from "../components/todo/TodoInsert";
import TodoList from "../components/todo/TodoList";
import { TodosContext } from './../hooks/context';
import { getTodos } from "../api/todo";
import { TodoType } from "../types/todo";

const Todo = () => {
  const [todos, setTodos] = useState<TodoType[] | null>([])
  const newTodos = async () => {
    const todos = await getTodos()
    setTodos(todos)
  }
  const navigate = useNavigate()

  //로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트
  useEffect(() => {
    if(!localStorage.getItem("accessToken")) {
      navigate("/signin")
    }
    newTodos()
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <div className="bg-cyan-700 py-16 px-56 h-screen">
      <div className="border rounded-3xl bg-neutral-200 py-16 px-10 h-full w-full">
        <TodosContext.Provider value={todos}>
            <TodoInsert />
            <TodoList />
        </TodosContext.Provider>
      </div>
    </div>
  )
}

export default Todo