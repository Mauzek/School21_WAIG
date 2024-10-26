import { useState } from "react";
import styles from "./Registration.module.css";
import { DatePicker } from "antd";
import regArrow from "../../assets/images/regArrow.svg";
import sberCat from "../../assets/images/SberCat2.svg";
import sberKusya from "../../assets/images/SberKusya1.svg";

export default function Registration() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };


  return (
    <div className={styles.auth__container}>
      <p style={{ padding: "0px 56px" }}>Welcome to School 21 Chat</p>
      <form>
        <div className={styles.form__container}>
          <div style={{ width: "100%", position: "absolute" }} className={`${styles.form__container__part} ${currentStep > 1 ? styles.form__container__left : ""}`}>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>
                Фамилия
              </label>
              <div className={styles.input__container} >
                <input className={`${styles.input__box}`} />
              </div>
            </div>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>
                Имя
              </label>
              <div>
                <input className={`${styles.input__box}`} />
              </div>
            </div>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>
                Отчество
              </label>
              <div>
                <input className={`${styles.input__box}`} />
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }} className={`${styles.form__container__part} ${currentStep > 2 ? styles.form__container__left : ""} ${currentStep < 2 ? styles.form__container__right : ""}`}>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>
                Дата рождения
              </label>
              <div>
                <DatePicker style={{ border: "0", width: "330px", height: "48px" }} />
              </div>
            </div>
            <div style={{ height: "165px", border: "0", background: "transparent" }} className={`${styles.input} `}>
              <label className={styles.input__label}>
                Пол
              </label>
              <div style={{ width: "100%", display: "flex", flexDirection: "row", height: "100%" }}>
                <div style={{ borderBottomLeftRadius: "8px", borderTopLeftRadius: "8px" }} className={styles.Gender__img} >
                  <label htmlFor="male" id="male2" style={{ zIndex: "1000", position: "absolute", width: "100%", height: "100%", bottom: "0", right: "0" }} />
                  <input type="radio" id="male" name="sex" />
                  <label htmlFor="male" id="male" />
                  <img src={sberCat} className={styles.Male__img} />
                </div>
                <hr style={{
                  background: "black",
                  color: "black",
                  width: "1px",
                  border: "0"
                }} />
                <div style={{ borderBottomRightRadius: "8px", borderTopRightRadius: "8px" }} className={styles.Gender__img} >
                  <label htmlFor="female" id="female2" style={{ zIndex: "1000", position: "absolute", width: "100%", height: "100%", bottom: "0", right: "0" }} />
                  <input type="radio" id="female" name="sex" />
                  <label htmlFor="female" id="female" />
                  <img src={sberKusya} className={styles.Female__img} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }} className={`${styles.form__container__part} ${currentStep > 3 ? styles.form__container__left : ""} ${currentStep < 3 ? styles.form__container__right : ""}`}>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>
                Ник на платформе
              </label>
              <div>
                <input type="password" className={`${styles.input__box}`} />
              </div>
            </div>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>
                Ник telegram
              </label>
              <div>
                <input className={`${styles.input__box}`} />
              </div>
            </div>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>
                Email
              </label>
              <div>
                <input className={`${styles.input__box}`} />
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }} className={`${styles.form__container__part} ${currentStep > 4 ? styles.form__container__left : ""} ${currentStep < 4 ? styles.form__container__right : ""}`}>
            <div className={`${styles.input} `}>
              <label className={styles.input__label}>
                Пароль
              </label>
              <div>
                <input type="password" className={`${styles.input__box}`} />
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
        </div>
        <button className={`${styles.input} ${currentStep === 5 ? styles.input__active : styles.input__inactive}`} > ss</button>
      </form>
      <div className={styles.step__container}>
        <div>
          <button className={`${styles.step__button}  ${currentStep !== 1 ? styles.input__active : styles.input__inactive}`} style={{ transform: "scale(-1,1)" }} onClick={handlePreviousStep}>
            <img src={regArrow} />
          </button>
        </div>
        <div>
          <button className={styles.step__button} onClick={handleNextStep}>
            <img src={regArrow} />
          </button>
        </div>
      </div>

    </div>
  );
}

function Getasd() {
  return (
    <h2>
      h2

    </h2>


  )
}