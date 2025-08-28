import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/utils/validation";
import type { z } from "zod";

import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/common/Button";

import Logo from "@/assets/images/logo.png";

// loginSchema 기반 타입 추출
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  // react-hook-form + zodResolver 세팅
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormValues>({
    mode: "onChange", // 입력할 때마다 검증
    resolver: zodResolver(loginSchema), // loginSchema 기반 유효성 검사
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 현재 입력값 가져오기 - 버튼 disabled 제어에 사용
  const email = watch("email");
  const password = watch("password");

  // 폼 제출 핸들러
  const onSubmit = (data: LoginFormValues) => {
    console.log("로그인 데이터", data);
    // TODO: 실제 로그인 API 연동해야함
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <div className="mt-5 mx-auto flex max-w-[350px] flex-col items-center px-6 pt-20">
        {/* 타이틀 */}
        <div>
          <img src={Logo} alt="CorN 로고" className="h-40 w-auto" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-7">
          {/* 이메일 입력 */}
          <AuthInput
            type="email"
            placeholder="이메일을 입력해 주세요."
            {...register("email")}
            error={!!errors.email}
            errorMessage={errors.email?.message}
            validation={!!email && !errors.email}
          />

          {/* 비밀번호 입력 */}
          <AuthInput
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            {...register("password")}
            error={!!errors.password}
            errorMessage={errors.password?.message}
            validation={!!password && !errors.password}
          />

          {/* 이메일 로그인 버튼 */}
          <Button
            size="middle"
            type="submit"
            variant={isValid ? "blue" : "gray"}
            disabled={!isValid} // 폼 전체 유효성 검사 결과 반영
            className="mt-4"
          >
            이메일로 로그인
          </Button>

          {/* 네이버 로그인 버튼 */}
          <Button
            size="middle"
            type="button"
            variant="naver"
            onClick={() => console.log("네이버 로그인")}
          >
            <span className="flex items-center gap-2">
              <span className="rounded-sm bg-white px-1.5 py-0.5 font-bold text-[#05c462]">
                N
              </span>
              네이버 로그인
            </span>
          </Button>
        </form>

        {/* 구분선 */}
        <div className="mt-15 my-8 flex w-full items-center gap-4 text-default-gray-500">
          <div className="h-[1px] flex-1 bg-default-gray-400/70" />
          <span className="text-sm">또는</span>
          <div className="h-[1px] flex-1 bg-default-gray-400/70" />
        </div>

        {/* 회원가입 링크 */}
        <Link to="/join" className="text-base underline underline-offset-4">
          이메일로 회원가입
        </Link>
      </div>
    </div>
  );
}
