import Image from "next/image";
import styled from "styled-components";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { fieldList, careerlist } from "../constants";

export default function ConsultantsMypage() {
  const [consultant, setConsultant] = useState<any>({});

  //!상담사용 자기소개 조회
  const consultantsPage = () => {
    return fetch(`https://mintalk.duckdns.org/counselors/my-page`, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());
  };
  useEffect(() => {
    const url = "https://mintalk.duckdns.org/sign-in/counselors";
    const data = {
      email: "csrf@gmail.com",
      password: "1234",
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        consultantsPage().then((res) => setConsultant(res.data));
      });
  }, []);

  console.log(consultant);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [shortIntroduction, setShortIntroduction] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [careers, setCareers] = useState([]);
  const [fields, setFields] = useState([]);
  const [Files, setFiles] = useState('');

  const onLoadFile = (e:any)=>{
    const file = e.target.files;
    setFiles(file);
    console.log(file);
  }

  return (
    <ConMypageMain>
      <Title>상담자용 마이페이지</Title>
      <ConsultantImgBox>
        <div>
          <Image
            alt="consultantImg"
            src={consultant?.profileImageUrl}
            width={300}
            height={300}
          />
          <input type="file" id="파일 선택 하는 버튼" onChange={onLoadFile} />
        </div>
        <form>
          <div>
            <p>이름</p>
            <input></input>
          </div>
          <div>
            <p>이메일</p>
            <input></input>
          </div>
          <div>
            <p>연락처</p>
            <input></input>
          </div>
          <div>
            <p>근무지</p>
            <input></input>
          </div>
        </form>
      </ConsultantImgBox>
      <div>
        <p>한줄로 자신을 소개해주세요 </p>
        <input></input>
      </div>
      <div>
        <p>긴 자기 소개서</p>
        <input></input>
      </div>
      <div>
        <p>직업</p>
        <input></input>
      </div>
      <div>
        <p>경력</p>
        <input></input>
      </div>
    </ConMypageMain>
  );
}

const ConsultantImgBox = styled.div`
  display: flex;
  margin: 1rem;
  padding: 1rem;
  align-items: center;
  height: 332px;
  & > div {
    display: flex;
    flex-direction: column;
    margin: auto;
    & > input {
      height: 2rem;
    }
  }
  & > form {
    margin-left: 10%;
    /* background-color: #dcdcdc; */
    width: 40%;
    padding: 1rem 3rem;
    border-radius: 15px;
    & > div {
      margin: 1rem;
      & > p {
        font-size: 1.2rem;
        margin: 5px 0px;
      }
      & > input {
        width: 80%;
        height: 2rem;
        border-radius: 6px;
        outline: none;
        border: none;
        padding: 5px 1rem;
        background-color: #9fde6f;
        &:focus {
          background-color: #6b954a;
          color: white;
          transition: all 0.5s;
        }
      }
    }
  }
`;
const Title = styled.p`
  font-size: 1.5em;
  margin: 1rem;
  font-weight: 500;
`;
const ConMypageMain = styled.div`
  width: 60%;
  margin: auto;
`;
