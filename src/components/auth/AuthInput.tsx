import { forwardRef, type InputHTMLAttributes } from "react";
import Button from "../common/Button";

type TAuthInputProps = {
  type?: string;
  placeholder?: string;
  title?: string;
  validation?: boolean;
  validationState?: string; // 우측 상태 배지 텍스트
  error?: boolean;
  value?: string;
  errorMessage?: string;
  button?: boolean; // 우측 버튼 노출 여부
  buttonText?: string;
  buttonOnclick?: () => void;
  short?: boolean; // 우측 여백 확보
} & InputHTMLAttributes<HTMLInputElement>;

const AuthInput = forwardRef<HTMLInputElement, TAuthInputProps>(
  (
    {
      type = "text",
      placeholder,
      title,
      validation = false,
      value,
      errorMessage,
      error = false,
      button,
      buttonText,
      buttonOnclick,
      short,
      validationState,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="relative flex w-full items-center gap-4 text-default-gray-800">
        {/* 라벨 */}
        {title && (
          <div
            className={`absolute left-2 top-[-8px] z-20 select-none bg-default-gray-100 px-1
              ${error ? "text-red-500" : validation ? "text-primary-green" : "text-default-gray-800"}`}
          >
            {title}
          </div>
        )}

        {/* 입력창 */}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          aria-invalid={error || undefined}
          aria-describedby={error ? `${title}-error` : undefined}
          className={`flex relative min-w-0 h-14 max-h-[56px] flex-1 rounded-full bg-default-gray-100 pl-4
            text-default-gray-800 outline-none ring-0
            ${
              error
                ? "border-2 border-red-500"
                : validation
                  ? "border-2 border-primary-green"
                  : "border border-default-gray-400"
            }`}
          {...rest}
        />

        {/* 우측 여백(옵션) */}
        {short && <div className="flex w-20 px-4 py-2 text-default-gray-100" />}

        {/* 우측 버튼*/}
        {button && (
          <Button
            size="small"
            variant="gray"
            disabled={error || !validation}
            onClick={buttonOnclick}
            type="button"
          >
            {buttonText}
          </Button>
        )}

        {/* 우측 상태 배지*/}
        {validationState && (
          <Button
            size="small"
            variant="gray"
            disabled={!validation}
            type="button"
          >
            {validationState}
          </Button>
        )}

        {/* 에러 메시지 & 아이콘 */}
        {error && (
          <>
            <div
              id={`${title}-error`}
              className="absolute left-4 top-[62px] select-none text-red-500 text-[12px]/[1.3]"
            >
              {errorMessage}
            </div>
          </>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
export default AuthInput;
