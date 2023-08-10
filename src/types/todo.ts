export interface TodoType {
  id: number
  todo: string
  isCompleted: boolean
  userId: number
}

export type Action 
  = { type: "INSERT", todo: TodoType }
  | { type: "UPDATE_ISCOMPLETED", id: number }
  | { type: "DELETE", id: number }
  | { type: "UPDATE", id: number, text: string }