// import axios from "axios";
// import { METHODS } from "http";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styled from "styled-components";

// import Checkbox from "./Checkbox";

export default function LoginC() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const data = { email: username, password: password };

  const onFinish = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("https://mintalk.duckdns.org/sign-in/counselors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 400) {
          throw new Error("email과 password가 일치하지 않습니다");
        } else if (res.status === 404) {
          throw new Error("해당 email로 상담사를 찾을 수 없습니다.");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (res.userStatus && res.userStatus["role"]) {
          Cookies.set("role", res.userStatus["role"]);
        }
        if (res.userStatus && res.userStatus["loggedIn"]) {
          Cookies.set("loggedIn", res.userStatus["loggedIn"]);
        }
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        // alert("로그인에 실패하였습니다.");
        alert(error.message);
      });
  };

  return (
    <LoginBoxC onSubmit={onFinish}>
      <MemberType>상담사</MemberType>
      <InputBox>
        <p>이메일</p>
        <EmailBox
          placeholder="email"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></EmailBox>
        <p>비밀번호</p>
        <PasswordBox
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></PasswordBox>
        <Submit type="submit">로그인</Submit>
      </InputBox>
    </LoginBoxC>
  );
}

const LoginBoxC = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 22rem;
  background-color: #f6faf7;
`;

const MemberType = styled.p`
  padding-right: 12rem;
  padding-bottom: 2rem;

  font-size: 2rem;
  font-weight: 600;

  color: gray;
`;

const InputBox = styled.div`
  display: grid;
  grid-template-columns: 4rem 12rem;
  grid-template-rows: 2rem 2rem;

  gap: 1rem;
`;

const EmailBox = styled.input`
  width: 12rem;
`;

const PasswordBox = styled.input`
  width: 12rem;
`;

const Submit = styled.button`
  width: 17.2rem;
  height: 2rem;
`;
