import { TodoType } from "../../types/todo"
import TodoItem from "./TodoItem"

interface TodoListProps {
  todoList: TodoType[]
  completeTodo: (value: number) => void
  onDelete: (value: number) => void
  onModify: (value: number) => void
  makeNewTodo: (value: string, id?: number) => void
  onCancel: (value: number) => void
}

const TodoList: React.FC<TodoListProps> = ({
  todoList,
  completeTodo,
  onDelete,
  onModify,
  makeNewTodo,
  onCancel
}) => {
  return (
    <div className="mt-10">
      <ul>
        {todoList.map((item) => (
          <TodoItem 
            key={item.id} 
            item={item} 
            completeTodo={completeTodo}
            onDelete={onDelete}
            onModify={onModify}
            makeNewTodo={makeNewTodo}
            onCancel={onCancel}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList