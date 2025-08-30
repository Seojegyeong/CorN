import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignupFormValues } from "@/types/auth/auth";

import { signupSchema } from "@/utils/validation";

import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/common/Button";

import Logo from "@/assets/images/logo.png";

export default function SignupPage() {
  // 인증메일/코드 관련 로컬 상태 (API 연동 전 임시)
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [codeError, setCodeError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });
  const watchedPassword = useWatch({
    control,
    name: "password",
  });
  const watchedEmail = useWatch({
    control,
    name: "email",
  });
  const watchedCode = useWatch({
    control,
    name: "code",
  });
  const watchedRepassword = useWatch({
    control,
    name: "repassword",
  });

  const postSendCode = () => {
    setCodeVerify(false);
    if (watchedEmail != "" && !errors.email?.message) {
      sendCodeMutation(
        {
          email: watchedEmail,
        },
        {
          onSuccess: () => {
            setSendCode(true);
          },
          onError: () => {
            setSendCode(false);
            alert("인증코드 발송 중 에러가 발생하였습니다.");
          },
        }
      );
    }
  };

  const checkCode = () => {
    if (watchedCode != "" && watchedCode != undefined && sendCode) {
      checkCodeMutation(
        {
          email: watchedEmail,
          code: watchedCode,
        },
        {
          onSuccess: (data) => {
            if (data.isSuccess === true) {
              setCodeVerify(true);
            } else {
              setCodeVerify(false);
            }
          },
          onError: () => {
            setCodeError("인증번호가 일치하지 않습니다.");
            setCodeVerify(false);
          },
        }
      );
    }
  };

  const onSubmit: SubmitHandler<TFormValues> = async (submitData) => {
    setEmail(submitData.email);
    setPassword(submitData.password);
    navigate("/map");
  };

  useEffect(() => {
    setCodeVerify(false);
    setCodeError("");
  }, [watchedCode, watchedEmail]);

  useEffect(() => {
    setSendCode(false);
  }, [watchedEmail]);

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
