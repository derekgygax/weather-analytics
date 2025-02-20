'use client'

import classNames from "classnames";

import { useFormStatus } from "react-dom";

// styles
import styles from './SubmitFormButton.module.scss';
import globalStyles from "@/styles/globals.module.scss";

interface SubmitFormButtonProps {
  className?: string;
  text?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const SubmitFormButton = (
  {
    className,
    text = "Submit",
    icon,
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
          className,
          styles.submitFormButton
        )
      }
      type="submit"
      disabled={disabled || pending}
    >
      <span className={icon ? styles.submitFormButton__text : undefined}>{text}</span>{icon}
    </button>
  )
}