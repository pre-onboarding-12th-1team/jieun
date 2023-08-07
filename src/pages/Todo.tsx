import { useCallback, useEffect, useRef, useState } from "react"
import TodoList from "../components/todo/TodoList"
import TodoMakeNew from "../components/todo/TodoMakeNew"
import { TodoType } from "../types/todo"
import { useNavigate } from "react-router-dom"

const Todo = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    /* Assignment 4-1: 로그인 여부에 따른 리다이렉트 처리 
    로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트 */
    if(!localStorage.getItem("accessToken"))  {
      navigate("/signin")
    }
    if(localStorage.getItem("todoList")) {
      setTodoList(JSON.parse(localStorage.getItem("todoList") || ""))
    }
  }, [])


  const nextId = useRef(0)


  const makeNewTodo = useCallback((value: string, id?: number) => {
    if(id) {
      const modifiedItem = todoList.filter((item) => item.id === id)
      todoList[id] = modifiedItem
      console.log(modifiedItem, )
      /* if(modifiedItem) {
        const modifyTodo = {
          id: nextId.current, todoText: modifiedItem, isCompleted: false
        }
      } */
    }
    
    
    const newArray = [...todoList]
    const newTodo = {
      id: nextId.current, todoText: value, isCompleted: false
    }
    newArray.push(newTodo)

    setTodoList(newArray)
    localStorage.setItem("todoList", JSON.stringify(newArray))
    
    nextId.current++
  }, [todoList])


  /* Assignment 7: TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 */
  const completeTodo = useCallback((value: number) => {
    const newArray = todoList.map((item) => {
      return item.id === value
        ? { ...item, isCompleted: !item.isCompleted } 
        : item
    })

    setTodoList(newArray)
    localStorage.setItem("todoList", JSON.stringify(newArray))
  }, [todoList])


  /* Assignment 9: 투두 리스트의 삭제 기능 */
  const onDelete = (value: number) => {
    const newArray = todoList.filter((item) => (
      item.id !== value
    ))

    setTodoList(newArray)
    localStorage.setItem("todoList", JSON.stringify(newArray))
  }

  /* Assignment 10: 투두 리스트의 수정 기능 */
  const onModify = (value: number) => {
   /*  const newArray = todoList.filter((item) => (
      item.id !== value
    ))

    setTodoList(newArray)
    localStorage.setItem("todoList", JSON.stringify(newArray)) */
  }
  const onCancel = (value: number) => {

  }

  return (
    <div className="bg-neutral-300 py-24 px-48 flex justify-center h-screen">
      <div className="bg-white rounded-2xl p-10 w-full">
        <h1 className="text-5xl font-bold text-center pb-16">
          TODO LIST
        </h1>
        <TodoMakeNew 
          makeNewTodo={makeNewTodo} 
        />
        <TodoList 
          todoList={todoList} 
          completeTodo={completeTodo} 
          onDelete={onDelete}
          onModify={onModify}
          makeNewTodo={makeNewTodo}
          onCancel={onCancel}
        />
      </div>
    </div>
  )
}

export default Todo