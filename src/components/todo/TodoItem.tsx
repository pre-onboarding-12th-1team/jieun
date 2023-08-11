import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TodoType } from "../../types/todo"
import { deleteTodo, updateTodo } from "../../api/todo"

interface TodoItemProps {
  item: TodoType
}
const TodoItem: React.FC<TodoItemProps> = ({
  item
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(item.isCompleted)
  const [text, setText] = useState<string>(item.todo)
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false)

  const navigate = useNavigate()

  //체크박스 클릭해서 isChecked 상태 업데이트될때도 TODO 수정 함수 호출
  useEffect(() => {
    handleModify(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]) 

  /* TODO 수정 제출 함수
    수정 실패시 함수종료
    수정 성공시 isChecked,isText,isUpdateMode 상태 업데이트 */
  const handleModify = async (checkClick: boolean) => {
    const updateTodoResult = await updateTodo(
      item.id, { todo: text, isCompleted: isChecked }
    )

    if(updateTodoResult === null) {
      console.log("TODO수정에 실패했습니다")
      return
    }
    
    setIsChecked(updateTodoResult.isCompleted)
    setText(updateTodoResult.todo)
    if(!checkClick) { //체크박스 클릭한 경우는 수정모드 변화없음
      setIsUpdateMode(false)
    }
  }

  /* TODO 삭제 함수 
    삭제 실패시 함수종료, 삭제 성공시 새로고침 */
  const handleDelete = async () => {
    const deleteTodoResult = await deleteTodo(item.id)

    if(deleteTodoResult === null) {
      console.log("TODO삭제에 실패했습니다")
      return
    }
    navigate(0)
  }

  return (
    <li className="list-none mb-2 bg-white px-5 py-1 rounded-2xl border-4 border-blue-600">
      <label className="text-xl font-semibold">
        <input 
          type="checkbox" 
          checked={isChecked}
          value={item.id}
          onChange={() => setIsChecked(!isChecked)}
          className="w-6 h-6 mr-2 align-middle"
        />
        {/* 수정모드에서는 내용이 input창 안에 입력된 형태 */}
        {!isUpdateMode 
          ? <span className="px-2">{text}</span>
          : <input 
              data-testid="modify-input" 
              value={text} 
              onChange={(e) => setText(e.currentTarget.value)}
              className="border-2 border-blue-600 px-2"
            />
        }
      </label>
      
      {/* 수정모드아닐때는 수정,삭제버튼 표시. 수정모드에서는 제출,취소버튼 표시 */}
      {!isUpdateMode ? 
        (<>
          <button 
            data-testid="modify-button" 
            onClick={() => setIsUpdateMode(true)}
            className="ml-2 rounded-lg px-3 py-2 bg-blue-600 text-white font-semibold"
          >
            수정
          </button>
          <button 
            data-testid="delete-button" 
            onClick={handleDelete}
            className="ml-1 rounded-lg px-3 py-2 bg-pink-500 text-white font-semibold"
          >
            삭제
          </button>
        </>) : (<>
          <button 
            data-testid="submit-button" 
            onClick={() => handleModify(false)}
            className="ml-2 rounded-lg px-3 py-2 bg-blue-600 text-white font-semibold"
          >
            제출
          </button>
          <button 
            data-testid="cancel-button" 
            onClick={() => { 
              setText(item.todo)
              setIsUpdateMode(false)
            }}
            className="ml-1 rounded-lg px-3 py-2 bg-neutral-800 text-white font-semibold"
          >
            취소
          </button>
        </>)
      }
    </li>
  )
}

export default TodoItem