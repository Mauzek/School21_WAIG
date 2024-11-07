import { FC, useState } from "react";
import styles from "./Registration.module.css";
import { Input } from "antd";
import regArrow from "../../assets/images/regArrow.svg";
import sberCat from "../../assets/images/SberCat2.svg";
import sberKusya from "../../assets/images/SberKusya1.svg";
import { OTPProps } from "antd/es/input/OTP";
import { confirmUserEmail, isResponseOk, registration } from "../../API/api-utils";

interface  RegistrationProps {
  setIsAuther: (value: boolean) => void;
}



export const Registration: FC<RegistrationProps> =( {setIsAuther}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [confirmCode, setCofirmCode] = useState<string>('');
  const [formData, setFormData] = useState({
    username: "",
    birthDay: "",
    email: "",
    firstname: "",
    lastname: "",
    patronymic: "",
    gender: "",
    tgName: "",
    password: ""
  });

  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text);
    setCofirmCode(text)
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  // Функция перехода на следующий шаг
  const handleNextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  // Функция возврата на предыдущий шаг
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Функция обновления значений полей формы
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

if (currentStep === 5) {
  console.log(formData)
  registration(formData);
}

  const confirmEmail = async () => {

    console.log("Подтвержденный Email:", formData.email + '\n' + confirmCode);
    const response = await confirmUserEmail(confirmCode);
    if(isResponseOk(response)) setIsAuther(true);
  };

  return (
    <div className={styles.reg__container}>
      <h2 className={styles.reg__title}>Здравствуйте!</h2>
      <p className={styles.reg__hello}>Давайте знакомиться:</p>

      <div>
        <div className={styles.form__container}>
          <div
            style={{ width: "100%", position: "absolute" }}
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
            style={{ width: "100%" }}
            className={`${styles.form__container__part} ${
              currentStep > 2 ? styles.form__container__left : ""
            } ${currentStep < 2 ? styles.form__container__right : ""}`}
          >
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>Дата рождения</label>
              <div>
                <input
                type="date"
                  style={{ border: "0", width: "100%", height: "48px" }}
                  onChange={handleChange}
                  name="birthDay"
                />
              </div>
            </div>
            <div className={`${styles.input} ${styles.Gender__container}`}>
              <label className={styles.input__label}>Пол</label>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    borderBottomLeftRadius: "8px",
                    borderTopLeftRadius: "8px",
                  }}
                  className={styles.Gender__img}
                >
                  <label
                    htmlFor="male"
                    id="male2"
                    style={{
                      zIndex: "1000",
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      bottom: "0",
                      right: "0",
                    }}
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
                <hr
                  style={{
                    background: "black",
                    color: "black",
                    width: "1px",
                    border: "0",
                  }}
                />
                <div
                  style={{
                    borderBottomRightRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                  className={styles.Gender__img}
                >
                  <label
                    htmlFor="female"
                    id="female2"
                    style={{
                      zIndex: "1000",
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      bottom: "0",
                      right: "0",
                    }}
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
            style={{ width: "100%" }}
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
                  onChange={handleChange}
                />
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
                <input
                  type="password"
                  className={`${styles.input__box}`}
                />
              </div>
            </div>
          </div>
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
              disabled={!confirmCode}
              className={`${styles.button__accept_email} ${
                currentStep === 5
                  ? styles.input__active
                  : styles.input__inactive
              }`}
            >
              Подтвердить
            </button>
          </div>
        </div>
      </div>
      <div className={styles.step__container}>
        <div>
          <button
            className={`${styles.step__button}  ${
              currentStep !== 1 ? styles.input__active : styles.input__inactive
            }`}
            style={{ transform: "scale(-1,1)" }}
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
}
