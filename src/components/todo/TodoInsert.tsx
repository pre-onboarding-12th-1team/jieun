import { useState } from "react"

interface TodoInsertProps {
  insertTodo: (text: string) => void
}

const TodoInsert: React.FC<TodoInsertProps> = ({insertTodo}) => {
  const [text, setText] = useState("")
  
  return (
    <div>
      <h1>TODO LIST</h1>
      <div>
        <input 
          data-testid="new-todo-input" 
          value={text}
          onChange={e => setText(e.currentTarget.value)}
        />
        <button 
          data-testid="new-todo-add-button"
          onClick={() => {
            insertTodo(text)
            setText("")
          }}
        >추가</button>
      </div>
    </div>
  )
}

export default TodoInsert