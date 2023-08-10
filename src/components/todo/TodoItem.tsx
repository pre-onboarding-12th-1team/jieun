import { useEffect, useState } from "react"
import { TodoType } from "../../types/todo"
import { deleteTodo, updateTodo } from "../../api/todo"
import { useNavigate } from "react-router-dom"

interface TodoItemProps {
  item: TodoType
}
const TodoItem: React.FC<TodoItemProps> = ({
  item
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(item.isCompleted)
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false)
  const [text, setText] = useState<string>(item.todo)
  const navigate = useNavigate()

  useEffect(() => {
    
  }, [isChecked])

  const handleModify = async () => {
    console.log(isChecked)
    const updateTodoResult = await updateTodo(
      item.id, { todo: text, isCompleted: isChecked }
    )
    if(updateTodoResult === "fail") {
      alert("수정실패")
      return
    }
    //navigate(0)
  }

  const handleDelete = async () => {
    const deleteTodoResult = await deleteTodo(item.id)
    if(deleteTodoResult === "fail") {
      alert("삭제실패")
      return
    }
    navigate(0)
  }

  return (
    <li className="list-none mb-2 bg-white px-5 py-2 rounded-full items-center flex">
      <label>
        <input 
          type="checkbox" 
          checked={isChecked}
          value={item.id}
          onChange={() => setIsChecked(!isChecked)}
          className="w-6 h-6 mr-1 align-middle"
        />
        {/* 수정모드에서는 내용이 input창 안에 입력된 형태 */}
        {!isUpdateMode 
          ? <span>{item.todo}</span>
          : <input 
              data-testid="modify-input" 
              value={text} 
              onChange={(e) => setText(e.currentTarget.value)}
            />
        }
      </label>
      
      {/* 수정모드아닐때는 수정,삭제버튼 표시. 수정모드에서는 제출,취소버튼 표시 */}
      {!isUpdateMode ? 
        (<>
          <button 
            data-testid="modify-button" 
            onClick={() => setIsUpdateMode(true)}
            className="ml-2 rounded-full px-3 py-2 bg-neutral-800 text-white"
          >
            수정
          </button>
          <button 
            data-testid="delete-button" 
            onClick={handleDelete}
            className="ml-1 rounded-full px-3 py-2 bg-pink-500 text-white"
          >
            삭제
          </button>
        </>) : (<>
          <button 
            data-testid="submit-button" 
            onClick={handleModify}
            className="ml-2 rounded-full px-3 py-2 bg-cyan-700 text-white"
          >
            제출
          </button>
          <button 
            data-testid="cancel-button" 
            onClick={() => { 
              setText(item.todo)
              setIsUpdateMode(false)
            }}
            className="ml-1 rounded-full px-3 py-2 bg-neutral-800 text-white"
          >
            취소
          </button>
        </>)
      }
    </li>
  )
}

export default TodoItem