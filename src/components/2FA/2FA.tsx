import { FC, useState } from "react";
import styles from "./2FA.module.css";
import { Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";

interface TwoFactorAuthenticationProps {
  setConfirmCode: (value: string) => void;
  handleSubmit: () => void;
}

export const TwoFactorAuthentication: FC<TwoFactorAuthenticationProps> = ({
  setConfirmCode,
  handleSubmit
}) => {
  const [code, setCode] = useState<string>("");

  const onChange: OTPProps["onChange"] = (value) => {
    const sanitizedValue = value.replace(/\D/g, ""); 
    setCode(sanitizedValue); 
    setConfirmCode(sanitizedValue); 
  };

  const isButtonDisabled = code.length !== 6; 

  const sharedProps: OTPProps = {
    onChange,
    length: 6,
    value: code, 
  };

  return (
    <main className={styles.main_container}>
      <section className={styles.content}>
        <h1 className={styles.login__title}>Добро пожаловать в WAIG</h1>
        <p className={styles.login__description}>
          Пожалуйста, введите код из приложения
        </p>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            if (!isButtonDisabled) handleSubmit(); 
          }}
        >
          <Input.OTP
            className={styles.otp_input}
            formatter={(value) => value.replace(/\D/g, "")} 
            {...sharedProps}
          />
          <button
            type="submit"
            className={`${styles.submit_button} ${
              isButtonDisabled ? styles.disabled_button : ""
            }`}
            disabled={isButtonDisabled} 
          >
            Подтвердить
          </button>
        </form>
      </section>
    </main>
  );
};
