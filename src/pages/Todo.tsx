import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodosContext } from './../hooks/context';
import TodoInsert from "../components/todo/TodoInsert";
import TodoList from "../components/todo/TodoList";
import { getTodos } from "../api/todo";
import { TodoType } from "../types/todo";

const Todo = () => {
  const [todos, setTodos] = useState<TodoType[] | null>([])

  const navigate = useNavigate()

  //로컬스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트
  useEffect(() => {
    if(!localStorage.getItem("accessToken")) {
      navigate("/signin")
    }

    /* TODO LIST 조회 함수
      조회 실패시 함수종료, 조회 성공시 todos 상태 업데이트 */
    const newTodos = async () => {
      const getTodosResult = await getTodos()

      if(getTodosResult === null) {
        console.log("Todos조회에 실패했습니다")
        return
      }
      setTodos(getTodosResult)
    }

    newTodos()
  }, [])

  return (
    <div className="bg-blue-600 py-16 px-56 h-screen">
      <div className="rounded-3xl bg-white py-16 px-10 h-full w-full">
        <TodosContext.Provider value={todos}>
          <TodoInsert />
          <TodoList />
        </TodosContext.Provider>
      </div>
    </div>
  )
}

export default Todo