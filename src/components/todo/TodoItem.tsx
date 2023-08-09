import { TodoType } from "../../types/todo"

interface TodoItemProps {
  item: TodoType
  checkComplete: (value: string) => void
}
const TodoItem: React.FC<TodoItemProps> = ({
  item,
  checkComplete
}) => {
  return (
    <li>
      <label>
        <input 
          type="checkbox" 
          checked={item.isCompleted}
          value={item.id}
          onChange={(e) => checkComplete(e.currentTarget.value)}
        />
        <span>{item.todoText}</span>
      </label>
    </li>
  )
}

export default TodoItem