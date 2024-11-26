import { FC, useState, useCallback, useEffect } from "react";
import styles from "./Registration.module.css";
import { Input, QRCode } from "antd";
import regArrow from "../../assets/images/regArrow.svg";
import sberCat from "../../assets/images/SberCat2.svg";
import sberKusya from "../../assets/images/SberKusya1.svg";
import { OTPProps } from "antd/es/input/OTP";
import {
  confirmUserEmail,
  getQR,
  isResponseOk,
  registration,
} from "../../API/api-utils";
import axios from "axios";

interface RegistrationProps {
  setIsAuther: (value: boolean) => void;
}

export const Registration: FC<RegistrationProps> = ({ setIsAuther }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isConfirmEmail, setIsConfirmEmail] = useState<boolean>(false);
  const [confirmCode, setCofirmCode] = useState<string>("");
  const [QRcode, setQRcode] = useState<string>("-");
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    birthDay: "",
    email: "",
    firstname: "",
    lastname: "",
    patronymic: "",
    gender: "",
    tgName: "",
    password: "",
    profileImageId: "cristalGreen",
  });

  const onChange: OTPProps["onChange"] = (text) => {
    if (text.length === 6) {
      setCofirmCode(text);
    }
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const handleNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  }, []);

  const handlePreviousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "tgName") {
      const tgName = value.replace(/[^a-zA-Z0-9_]/g, "");
      setFormData((prev) => ({ ...prev, [name]: tgName }));
    } else if (name === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailPattern.test(value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        emailValid: isValidEmail,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (currentStep === 5 && !isRegistered) {
      registration(formData)
        .then(() => setIsRegistered(true)) 
        .catch((err) => console.error("Ошибка регистрации:", err));
    }
  }, [currentStep, isRegistered, formData]);

  const confirmEmail = useCallback(async () => {
    try {
      const response = await confirmUserEmail(confirmCode);
      if (isResponseOk(response)) {
        setIsConfirmEmail(true);
        const res = await getQR(formData.username);
        setQRcode(res.qrCodeUrl);
      } else {
        console.error("Ошибка при подтверждении email");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          console.error("Ошибка 409:", error.response.data);
        } else {
          console.error("Ошибка запроса:", error);
        }
      } else {
        console.error("Неизвестная ошибка:", error);
      }
    }
  }, [confirmCode, formData.username]);

  const confirmQRCode = useCallback(() => {
    setIsAuther(true);
  }, [setIsAuther]);

  return (
    <div className={styles.reg__container}>
      <h2 className={styles.reg__title}>Здравствуйте!</h2>
      <p className={styles.reg__hello}>Давайте знакомиться:</p>

      <div>
        <div className={styles.form__container}>
          <div
            className={`${styles.form__container__part} ${
              currentStep > 1 ? styles.form__container__left : ""
            }`}
          >
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>Фамилия</label>
              <div className={styles.input__container}>
                <input
                  className={`${styles.input__box}`}
                  name="lastname"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>Имя</label>
              <div>
                <input
                  className={`${styles.input__box}`}
                  name="firstname"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>Отчество</label>
              <div>
                <input
                  className={`${styles.input__box}`}
                  name="patronymic"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div
            className={`${styles.form__container__part} ${
              currentStep > 2 ? styles.form__container__left : ""
            } ${currentStep < 2 ? styles.form__container__right : ""}`}
          >
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>Дата рождения</label>
              <div>
                <input
                  className={`${styles.input__birthday}`}
                  type="date"
                  onChange={handleChange}
                  name="birthDay"
                />
              </div>
            </div>
            <div className={`${styles.input} ${styles.Gender__container}`}>
              <label className={styles.input__label}>Пол</label>
              <div className={styles.main__gender__container}>
                <div
                  className={`${styles.Gender__img} ${styles.gender__img__male}`}
                >
                  <label
                    htmlFor="male"
                    id="male2"
                    className={styles.gender__label}
                  />
                  <input
                    type="radio"
                    id="male"
                    value="Male"
                    name="gender"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="male" id="male" />
                  <img src={sberCat} className={styles.Male__img} />
                </div>
                <hr className={styles.gender__container__separator} />
                <div
                  className={`${styles.Gender__img} ${styles.gender__img__female}`}
                >
                  <label
                    htmlFor="female"
                    id="female2"
                    className={styles.gender__label}
                  />
                  <input
                    style={{ display: "none" }}
                    type="radio"
                    id="female"
                    value="Female"
                    name="gender"
                    onChange={handleChange}
                  />
                  <label htmlFor="female" id="female" />
                  <img src={sberKusya} className={styles.Female__img} />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.form__container__part} ${
              currentStep > 3 ? styles.form__container__left : ""
            } ${currentStep < 3 ? styles.form__container__right : ""}`}
          >
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>Ник telegram</label>
              <div>
                <input
                  className={`${styles.input__box}`}
                  name="tgName"
                  value={formData.tgName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>Email</label>
              <div>
                <input
                  className={`${styles.input__box}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {!formData.emailValid && formData.email && (
                  <p className={styles.error}>Невалидный email</p>
                )}
              </div>
            </div>
          </div>
          <div
            style={{ width: "100%" }}
            className={`${styles.form__container__part} ${
              currentStep > 4 ? styles.form__container__left : ""
            } ${currentStep < 4 ? styles.form__container__right : ""}`}
          >
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>Ник на платформе</label>
              <div>
                <input
                  className={`${styles.input__box}`}
                  name="username"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>Пароль</label>
              <div>
                <input
                  type="password"
                  placeholder="Минимально 6 символов"
                  className={`${styles.input__box}`}
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>
                Подтверждение пароля
              </label>
              <div>
                <input type="password" className={`${styles.input__box}`} />
              </div>
            </div>
          </div>
          {isConfirmEmail ? (
            <div className={styles.googleAuthQR__container}>
              <p>Отсканируйте QR-код в приложении google authenticator</p>
              <QRCode value={QRcode} bgColor="#fff"/>
              <button onClick={confirmQRCode}>Продолжить</button>
            </div>
          ) : (
            <div
              className={` ${styles.emailAccept__container} ${
                styles.form__container__part
              }  ${currentStep > 5 ? styles.form__container__left : ""} ${
                currentStep < 5 ? styles.form__container__right : ""
              }`}
            >
              <label className={`${styles.lable_email_accept}`}>
                Вам отправлено письмо с кодом на почту. Введите его в поле ниже.
              </label>
              <Input.OTP
                formatter={(str) => str.toUpperCase()}
                {...sharedProps}
              />
              <button
                onClick={confirmEmail}
                // disabled={!confirmCode}
                className={`${styles.button__accept_email} ${
                  currentStep === 5
                    ? styles.input__active
                    : styles.input__inactive
                }`}
              >
                Подтвердить
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.step__container}>
        <div>
          <button
            className={`${styles.step__button}  ${
              currentStep !== 1 ? styles.input__active : styles.input__inactive
            }`}
            style={isConfirmEmail ? { display: "none" } : {transform: "scale(-1, 1)"}}
            onClick={handlePreviousStep}
          >
            <img src={regArrow} />
          </button>
        </div>
        <div>
          <button
            className={`${styles.step__button} ${
              currentStep !== 5 ? styles.input__active : styles.input__inactive
            }`}
            onClick={handleNextStep}
          >
            <img src={regArrow} />
          </button>
        </div>
      </div>
    </div>
  );
};
