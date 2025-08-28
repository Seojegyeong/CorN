import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { signupSchema } from "@/utils/validation";

import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/common/Button";

import Logo from "@/assets/images/logo.png";

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  // 인증메일/코드 관련 로컬 상태 (API 연동 전 임시)
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [codeError, setCodeError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setError,
    clearErrors,
  } = useForm<SignupFormValues>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      // 초기값 세팅 - 빈 문자열로 초기화
      // useForm을 쓰면 폼 내부 상태(values)를 리액트 훅이 관리
      // - 초기화 하지않으면 undefined 상태가 될 수 있음
      email: "",
      password: "",
      repassword: "",
      code: "",
    },
  });

  const email = watch("email");
  const code = watch("code");
  const password = watch("password");
  const repassword = watch("repassword");

  // TODO: 실제 API 연동에 맞춰 교체
  const handleSendCode = () => {
    if (!errors.email && email) {
      setCodeSent(true);
      setCodeVerified(false);
      setCodeError("");
      // 실제로는 이메일로 코드 발송 API 호출
      console.log("인증코드 발송:", email);
    } else {
      setCodeSent(false);
      setCodeVerified(false);
      setCodeError("이메일 형식을 확인해 주세요.");
      setError("email", {
        type: "manual",
        message: "올바르지 않은 형식이에요",
      });
    }
  };

  // TODO: 실제 API 연동에 맞춰 교체
  const handleVerifyCode = () => {
    if (!code) {
      setCodeVerified(false);
      setCodeError("인증코드를 입력해 주세요.");
      setError("code", {
        type: "manual",
        message: "인증코드를 입력해 주세요.",
      });
      return;
    }
    // 예시로 코드가 "123456"이면 성공
    if (code === "123456") {
      setCodeVerified(true);
      setCodeError("");
      clearErrors("code");
    } else {
      setCodeVerified(false);
      setCodeError("인증번호가 일치하지 않습니다.");
      setError("code", {
        type: "manual",
        message: "인증번호가 일치하지 않습니다.",
      });
    }
  };

  const onSubmit = (data: SignupFormValues) => {
    if (!codeVerified) {
      setCodeError("인증을 완료해 주세요.");
      setError("code", { type: "manual", message: "인증을 완료해 주세요." });
      return;
    }
    console.log("회원가입 데이터:", data);
    // TODO: 회원가입 API 연동
  };

  const emailOk = !!email && !errors.email;
  const codeOk = codeSent && codeVerified && !errors.code;
  const pwdOk = !!password && !errors.password;
  const repwdOk = !!repassword && !errors.repassword;

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <div className="mt-5 mx-auto flex max-w-[350px] flex-col items-center px-6 pt-20">
        {/* 타이틀 */}
        <div>
          <img src={Logo} alt="CorN 로고" className="h-40 w-auto" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          {/* 이메일 + 인증버튼 */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <AuthInput
                type="email"
                placeholder="이메일을 입력해 주세요."
                {...register("email")}
                error={!!errors.email}
                errorMessage={errors.email?.message}
                validation={emailOk}
              />
            </div>
            <Button
              size="small"
              variant="gray"
              type="button"
              onClick={handleSendCode}
              disabled={!email || !!errors.email}
            >
              인증
            </Button>
          </div>

          {/* 인증번호 + 완료버튼 */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <AuthInput
                type="text"
                placeholder="인증번호를 입력해 주세요."
                {...register("code")}
                error={!!errors.code || !!codeError}
                errorMessage={errors.code?.message ?? codeError}
                validation={codeOk}
              />
            </div>
            <Button
              size="small"
              variant="gray"
              type="button"
              onClick={handleVerifyCode}
              disabled={!codeSent} // 코드 발송 후에만 가능
            >
              완료
            </Button>
          </div>

          {/* 비밀번호 */}
          <AuthInput
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            {...register("password")}
            error={!!errors.password}
            errorMessage={errors.password?.message}
            validation={pwdOk}
          />

          {/* 비밀번호 확인 */}
          <AuthInput
            type="password"
            placeholder="비밀번호를 확인해 주세요."
            {...register("repassword")}
            error={!!errors.repassword}
            errorMessage={errors.repassword?.message}
            validation={repwdOk}
          />

          {/* 회원가입 버튼 */}
          <Button
            size="middle"
            variant={isValid ? "blue" : "gray"}
            type="submit"
            disabled={!(isValid && codeOk)}
            className="mt-2"
          >
            이메일로 회원가입
          </Button>
        </form>

        {/* 하단 링크 */}
        <div className="mt-10 text-center">
          <Link to="/" className="text-base underline underline-offset-4">
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
