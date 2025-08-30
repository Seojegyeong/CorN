import { Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/validation";
import type { LoginFormValues } from "@/types/auth/auth";
import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/common/Button";
import Logo from "@/assets/images/logo.png";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const watchedPassword = useWatch({ control, name: "password" });
  const watchedEmail = useWatch({ control, name: "email" });

  const onSubmit: SubmitHandler<TLoginFormValues> = async (submitData) => {
    if (isValid) {
      loginMutate(
        {
          email: submitData.email,
          password: submitData.password,
        },
        {
          onSuccess: () => {
            navigate("/map");
          },
          onError: (err) => {
            console.log(err.response?.data.message);
            setError("잘못된 정보를 입력하였습니다.");
          },
        }
      );
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <div className="mt-5 mx-auto flex max-w-[350px] flex-col items-center px-6 pt-20">
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
            validation={!!watchedEmail && !errors.email}
          />

          {/* 비밀번호 입력 */}
          <AuthInput
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            {...register("password")}
            error={!!errors.password}
            errorMessage={errors.password?.message}
            validation={!!watchedPassword && !errors.password}
          />

          {/* 이메일 로그인 버튼 */}
          <Button
            size="middle"
            type="submit"
            variant={isValid ? "blue" : "gray"}
            disabled={!isValid}
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

        <div className="mt-15 my-8 flex w-full items-center gap-4 text-default-gray-500">
          <div className="h-[1px] flex-1 bg-default-gray-400/70" />
          <span className="text-sm">또는</span>
          <div className="h-[1px] flex-1 bg-default-gray-400/70" />
        </div>

        <Link to="/join" className="text-base underline underline-offset-4">
          이메일로 회원가입
        </Link>
      </div>
    </div>
  );
}
