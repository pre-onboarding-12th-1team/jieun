import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTodo } from "../../api/todo"

const TodoInsert = () => {
  const [text, setText] = useState<string>("")

  const navigate = useNavigate()
  
  /* 새로운 TODO 등록 함수
    입력된 TODO 없을시 함수종료
    등록 실패시 함수종료, 등록 성공시 새로고침 */
  const handleAdd = async (text: string) => {
    if(!text) {
      alert("텍스트를 입력한 후 추가버튼을 눌러주세요")
      return
    }
    const createTodoResult = await createTodo({ todo: text })

    if(createTodoResult === null) {
      console.log("TODO등록에 실패했습니다")
      return
    }

    navigate(0)
  }

  return (
    <div>
      <h1 className="text-5xl font-bold flex justify-center">TODO LIST</h1>
      <div className="mx-36 px-10 py-5 rounded-full flex justify-center items-center">
        <input 
          data-testid="new-todo-input" 
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          className="border-4 rounded-2xl outline-none w-[600px] h-12 px-5 border-blue-600"
        />
        <button 
          data-testid="new-todo-add-button"
          onClick={() => handleAdd(text)}
          className="ml-2 rounded-full py-3 px-5 bg-blue-600 text-white font-semibold"
        >
          추가
        </button>
      </div>
    </div>
  )
}

export default TodoInsert