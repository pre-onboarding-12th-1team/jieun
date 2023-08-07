import { useState } from "react"
import { TodoType } from "../../types/todo"

interface TodoItemProps {
  item: TodoType
  completeTodo: (value: number) => void
  onDelete: (value: number) => void
  onModify: (value: number) => void
  makeNewTodo: (value: string, id?: number) => void
  onCancel: (value: number) => void
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  completeTodo,
  onDelete,
  onModify,
  makeNewTodo,
  onCancel
}) => {
  /* Assignment 10: 수정기능 */
  const [ismodifyMode, setIsModifyMode] = useState<boolean>(false)
  const [modifyValue, setModifyValue] = useState<string>("")

  /* Assignment 5: 투두 리스트의 목록. 내용과 완료 여부가 표시 */
  return (
    <li className="flex border-b-4 my-5 justify-between px-10">
      <label className="flex items-center mx-5">
        <input 
          type="checkbox" 
          checked={item.isCompleted}
          onChange={() => completeTodo(item.id)}
          className="w-6 h-6 mr-3"
        />
        {/* 수정모드에서는 TODO의 내용이 input창 안에 입력된 형태로 변경 */}
        {!ismodifyMode 
          ? <span className="text-xl">{item.todoText}</span>
          : <input
              data-testid="modify-input" 
              defaultValue={item.todoText} 
              onChange={(e) => setModifyValue(e.currentTarget.value)}
            />
        }
      </label>

      {!ismodifyMode ?
        <div>
          {/* Assignment 8: 수정버튼과 삭제 버튼 */}
          <button 
            data-testid="modify-button"
            onClick={() => {
              setIsModifyMode(true)
              onModify(item.id)
            }}
            className="rounded-lg p-3 bg-rose-300 text-white mr-2"
          >
            수정
          </button>

          <button 
            data-testid="delete-button"
            onClick={() => onDelete(item.id)}
            className="rounded-lg p-3 bg-rose-500 text-white"
          >
            삭제
          </button>
        </div>
        :
        <div>
          {/* 수정모드에서는 TODO의 우측에 제출버튼과 취소버튼이 표시 */}
          <button 
            data-testid="submit-button"
            onClick={() => makeNewTodo(modifyValue, item.id)}
            className="rounded-lg p-3 bg-indigo-300 text-white mr-2"
          >
            제출
          </button>

          <button 
            data-testid="cancel-button"
            onClick={() => onCancel(item.id)}
            className="rounded-lg p-3 bg-indigo-300 text-white mr-2"
          >
            취소
          </button>

        </div>
      }
    </li>
  )
}

export default TodoItem