import { useEffect } from "react"
import { useTodosContext } from "../../hooks/context"
import TodoItem from "./TodoItem"

const TodoList = () => {
  const todos = useTodosContext()

  return (
    <div className="mx-9 px-10 py-5 rounded-3xl h-[510px] relative">
      {todos.length === 0 && 
        <p className="text-center m-20">등록된 TODO가 없습니다.</p>}
      {todos.map((item) => (
        <TodoItem
          key={item.id} 
          item={item} 
        />
      ))}
    </div>
  )
}

export default TodoList