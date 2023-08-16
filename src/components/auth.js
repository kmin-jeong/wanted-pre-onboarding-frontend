import { useEffect, useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../state/AuthState";

export const Auth = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {}, [emailInputRef, passwordInputRef]);

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url = "https://pre-onboarding-selection-task.shop";
    // let url = "http://localhost:8000";
    if (isLogin) {
      url = `${url}/auth/signin`;
    } else {
      url = `${url}/auth/signup`;
    }

    axios({
      method: "POST",
      url: url,
      data: {
        email: enteredEmail,
        password: enteredPassword,
      },
    })
      .then((res) => {
        setIsLoading(false);

        if (res.data.access_token) {
          // success
          console.log("data", res.data);
          return res;
        } else {
          // return;
          return (data) => {
            //show an error modal
            let errorMessage = "로그인에 실패했습니다!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          };
        }
      })
      .then((res) => {
        authCtx.login(res.data.access_token);

        console.log("res", res);
        console.log("res.data", res.data);
        console.log("acc_t", res.data.access_token);

        history.replace("/todos");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
        setIsLoading(false);
      });
  };

  const onBlurEmailHandler = (refInput) => {
    if (!refInput.current?.value.includes("@")) {
      console.log(`이메일은 @가 포함되어야 합니다.`);
    }
  };

  const onBlurPwHandler = (refInput) => {
    if (refInput.current?.value.length < 8) {
      console.log(`비밀번호는 8자리 이상이여야 합니다.`);
    }
  };

  return (
    <section>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            onChange={onBlurEmailHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            onChange={onBlurPwHandler}
          />
        </div>
        <div>
          {!isLoading && <button>{isLogin ? "로그인" : "회원가입"}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "회원가입" : "로그인"}
          </button>
        </div>
      </form>
    </section>
  );
};
