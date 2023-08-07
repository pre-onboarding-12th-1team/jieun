import { BASE_URL } from "./const"

interface loginDataProps {
  email: string
  password: string
}

/* 회원가입 api 호출 */
export const signUp = async (data: loginDataProps) => {
  const signUpResponse = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return signUpResponse.ok ? "success" : "fail"
}

/* 로그인 api 호출, 응답받은 JWT 로컬 스토리지에 저장 */
export const signIn = async (data: loginDataProps) => {
  const signInResponse = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if(signInResponse.ok) {
    const signInResponseData = await signInResponse.json()
    localStorage.setItem("accessToken", signInResponseData.access_token)
    
    return "success"
  }
  return "fail"
}

