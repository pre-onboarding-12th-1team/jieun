import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signIn, signUp } from "../api/login";

const Login = ({type}: {type: string}) => {
  const [pageType, setPageType] = useState(type)
  const isSignInPage = pageType === "signin"
  const isSignUpPage = pageType === "signup"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    setEmail("")
    setPassword("")
    isLoggedIn()
  }, [])

  useEffect(() => {
    /* 이메일, 비밀번호 유효성 검사 
    입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 
    button에 disabled 속성을 부여하기위해서 loading state 사용함 */
    const checkValidation = () => {
      const checkEmail = /\@+/.test(email)
      const checkPassword = password.length >= 8
      
      if((checkEmail && checkPassword)) {
        setLoading(false) 
        return
      }
      setLoading(true)
    }

    checkValidation()
  }, [email, password])

  /* 로컬스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트 */
  const isLoggedIn = () => {
    if(localStorage.getItem("accessToken"))  {
      navigate("/todo")
    }
  }

  //로그인or회원가입 버튼 클릭 함수
  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    /* 회원가입 페이지에서 버튼을 클릭 시, 회원가입을 진행하고 
    회원가입이 정상적으로 완료되었을 시 /signin 경로로 이동 */
    if(isSignUpPage) {
      const signUpResult = await signUp({email, password})
      if(signUpResult === "success") {
        navigate("/signin")
        navigate(0)
      }
    }

    /* 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 
    로그인이 정상적으로 완료되었을 시 /todo 경로로 이동*/
    if(isSignInPage) {
      const signUpResult = await signIn({email, password})
      if(signUpResult === "success") {
        navigate("/todo")
      }
    }
  }


  return (
    <div className="bg-neutral-300 py-48 flex justify-center h-screen ">
      <div className="bg-white border rounded-2xl py-20 px-10">
        <h1 className="text-5xl font-bold text-center pb-16">
          {isSignInPage? "SIGN-IN" : "SIGN-UP"}
        </h1>
        <form 
          onSubmit={handleLoginSubmit}
          className="flex flex-col items-center justify-between gap-4"
        >
          <label>
            이메일:
            <input 
              data-testid="email-input" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.currentTarget.value)} 
              className="ml-2 pl-2 border rounded-lg"
            />
          </label>
          <label>
            비밀번호:
            <input 
              data-testid="password-input"
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.currentTarget.value)} 
              className="ml-2 pl-2 border rounded-lg"
            />
          </label>
          <button 
            data-testid={isSignInPage ? "signin-button" : "signup-button"}
            type="submit"
            disabled={loading}
            onClick={() => setPageType(isSignInPage ? "signin" : "signup")} 
            className="border rounded-full w-full mt-5 py-1 bg-blue-600 text-white text-lg disabled:bg-black"
          >
            {isSignInPage ? "로그인" : "회원가입"}
          </button>

          <p 
            onClick={() => {
              if(isSignInPage) {
                navigate("/signup") 
                navigate(0)
              }else {
                navigate("/signin") 
                navigate(0)
              }
            }}
            className="text-xs text-neutral-500 cursor-pointer underline"
          >
            {isSignInPage ? "계정이 없다면? 회원 가입하러GO~" : "로그인하러 GO~"}
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;