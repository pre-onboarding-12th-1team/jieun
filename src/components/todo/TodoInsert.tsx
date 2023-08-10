import { useState } from "react"
import { createTodo } from "../../api/todo"
import { useNavigate } from "react-router-dom"

interface TodoInsertProps {}

const TodoInsert: React.FC<TodoInsertProps> = () => {
  const [text, setText] = useState<string>("")
  const navigate = useNavigate()

  const handleAdd = async (text: string) => {
    const createTodoResult = await createTodo({ todo: text })
    if(createTodoResult === "success") {
      setText("")
    }
  }

  return (
    <div>
      <h1 className="text-5xl flex justify-center">TODO LIST</h1>
      <div className="mx-36 px-10 py-5 rounded-full flex justify-center items-center">
        <input 
          data-testid="new-todo-input" 
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          className="border rounded-2xl outline-none w-[600px] h-12 px-5"
        />
        <button 
          data-testid="new-todo-add-button"
          onClick={() => handleAdd(text)}
          className="ml-2 border rounded-full p-3 bg-cyan-700 text-white text-xl"
        >
          추가
        </button>
      </div>
    </div>
  )
}

export default TodoInsert