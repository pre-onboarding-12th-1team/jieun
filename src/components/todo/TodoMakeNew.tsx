import { useState } from "react"

interface TodoMakeNewProps {
  makeNewTodo: (value: string) => void
}

const TodoMakeNew: React.FC<TodoMakeNewProps> = ({
  makeNewTodo,
}) => {
  const [value, setValue] = useState<string>("") 

  /* Assignment 6: 새로운 TODO를 입력할 수 있는 input과 추가 button */
  return (
    <div className="grid grid-cols-6 gap-2 h-16">
      <input 
        data-testid="new-todo-input" 
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        className="col-span-5 border rounded-full lg:px-5 bg-indigo-100 outline-none"
      />
      <button 
        data-testid="new-todo-add-button"
        onClick={() => makeNewTodo(value)}
        className="col-span-1 border rounded-full lg:p-2 bg-indigo-500 text-white"
      >
        추가
      </button>
    </div>
  )
}

export default TodoMakeNew