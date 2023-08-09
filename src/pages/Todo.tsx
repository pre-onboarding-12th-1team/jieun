import { useEffect, useReducer, useRef } from "react";
import TodoInsert from "../components/todo/TodoInsert";
import TodoList from "../components/todo/TodoList";
import { TodoListContext } from "../hooks/context";
import { TodoType } from "../types/todo";
import { useNavigate } from "react-router-dom";

interface TodoProps {

}


/* todoList는 useReducer로 상태관리하기위한 reducer함수 선언 */
const todoListReducer = (
  state: TodoType[], 
  action: { type: string, payload: TodoType }
): TodoType[] => {
  let array
  switch(action.type) {
    case "INSERT": 
      array = [...state]
      array.push(action.payload)
      return array
    default:
      throw new Error('Unhandled action')
  }
}


const Todo: React.FC<TodoProps> = () => {
  //todoList 초기값
  const initialTodoList = JSON.parse(localStorage.getItem("todoList")!) === null
    ? []
    : JSON.parse(localStorage.getItem("todoList")!)

  //todoList는 useReducer로 상태관리
  const [todoList, dispatch] = useReducer(todoListReducer, initialTodoList)

  const navigate = useNavigate()
  const nextId = useRef(0)

  //로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트
  useEffect(() => {
    if(!localStorage.getItem("accessToken")) {
      navigate("/signin")
    }
  }, [])

  //새로고침해도 todoList 보이도록 로컬스토리지에 저장
  /* dispatch하면 리렌더링되기때문에 dispatch로 todoList 변경해주고 
  그 다음에 로컬스토리지에 set하기위해서 이렇게 해줌 */
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList))
  }, [todoList])

  
  //새로운 todo추가 함수
  const insertTodo = (text: string) => {
    dispatch({
      type: "INSERT", 
      payload: { id: nextId.current, todoText: text, isCompleted: false }
    })
    nextId.current++
  }

  return (
    <TodoListContext.Provider value={todoList}>
      <TodoInsert insertTodo={insertTodo} />
      <TodoList />
    </TodoListContext.Provider>
  )
}

export default Todo