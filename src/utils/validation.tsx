import { z } from "zod";

// 이메일 정규식
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 이메일 스키마
const emailSchema = z
  .string()
  .nonempty("Required.") // 빈 문자열 허용 안함 - Required 에러
  .regex(emailRegex, "올바르지 않은 형식이에요"); // 정규식 불일치 시 에러

// 비밀번호 스키마
const passwordSchema = z
  .string()
  .min(4, "비밀번호는 최소 4자부터 가능합니다.")
  .max(32, "비밀번호는 최대 32글자까지 입력 가능합니다.")
  .nonempty("비밀번호는 필수로 입력해야합니다."); // 비어 있으면 에러

// 회원가입 검증 스키마
export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    repassword: passwordSchema,
    code: z.string().nonempty("인증코드를 반드시 입력해주세요"),
  })
  .refine((data) => data.password === data.repassword, {
    path: ["repassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

// password와 repassword가 동일해야지 통과
// - 동일하지 않으면 repassword field에 에러 메시지 출력

// 로그인 검증 스키마
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
