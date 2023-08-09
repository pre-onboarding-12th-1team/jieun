import { useTodoListContext } from "../../hooks/context"
import TodoItem from "./TodoItem"

const TodoList = () => {
  const todoList = useTodoListContext()

  const checkComplete = (value: string) => {
    console.log(value)
  }

  return (
    <div>
      {todoList.length === 0 && <p>등록된 TODO가 없습니다.</p>}
      {todoList.map((item) => (
        <TodoItem 
          key={item.id} 
          item={item} 
          checkComplete={checkComplete}
        />
      ))}
    </div>
  )
}

export default TodoList