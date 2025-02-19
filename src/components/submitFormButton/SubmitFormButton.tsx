'use client'

import classNames from "classnames";

import { useFormStatus } from "react-dom";

// styles
import globalStyles from "@/styles/globals.module.scss";

interface SubmitFormButtonProps {
  className?: string;
  text?: string;
  disabled?: boolean;
}

export const SubmitFormButton = (
  {
    className,
    text = "Submit",
    disabled = false
  }: SubmitFormButtonProps
) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={
        classNames(
          pending || disabled ? globalStyles.disabledButton : undefined,
          globalStyles.button,
          globalStyles.buttonGold,
          className
        )
      }
      type="submit"
      disabled={disabled || pending}
    >
      {text}
    </button>
  )
}