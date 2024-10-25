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
            <p>Welcome to School 21 Chat</p>
            <form>
                <div className={styles.form__container} style={{ alignContent: "center" }}>
                    <div className={`${styles.input} ${currentStep === 1 ? styles.input__active : styles.input__inactive}`}>
                        <label className={styles.input__label}>
                            Фамилия
                        </label>
                        <div className={styles.input__container} >
                            <input className={`${styles.input__box}`}>
                            </input>
                        </div>
                    </div>
                    <div className={`${styles.input} ${currentStep === 1 ? styles.input__active : styles.input__inactive}`}>
                        <label className={styles.input__label}>
                            Имя
                        </label>
                        <div>
                            <input className={`${styles.input__box}`}>
                            </input>
                        </div>
                    </div>
                    <div className={`${styles.input} ${currentStep === 1 ? styles.input__active : styles.input__inactive}`}>
                        <label className={styles.input__label}>
                            Отчество
                        </label>
                        <div>
                            <input className={`${styles.input__box}`}>
                            </input>
                        </div>
                    </div>
                    <div className={`${styles.input} ${currentStep === 2 ? styles.input__active : styles.input__inactive}`}>
                        <label className={styles.input__label}>
                            Дата рождения
                        </label>
                        <div>
                            <DatePicker style={{ border: "0", width: "330px", height: "48px" }} />
                        </div>
                    </div>
                    <div style={{ height: "165px", border: "0", background: "transparent" }} className={`${styles.input} ${currentStep === 2 ? styles.input__active : styles.input__inactive}`}>
                        <label className={styles.input__label}>
                            Пол
                        </label>
                        <div style={{ width: "100%", display: "flex", flexDirection: "row", height: "100%" }}>
                            <div style={{ borderBottomLeftRadius: "8px", borderTopLeftRadius: "8px" }} className={styles.Gender__img} >
                                <label htmlFor="male" id="male2" style={{ zIndex: "1000", position: "absolute", width: "100%", height: "100%", bottom: "0", right: "0" }} />
                                <input type="radio" id="male" name="sex" />
                                <label htmlFor="male" id="male" />
                                <img height={"100%"} src={sberCat} style={{ left: "0", position: "absolute", bottom: "-16px" }} />
                            </div>
                            <hr style={{
                                background: "black",
                                color: "black",
                                width: "1px",
                                border: "0"
                            }}></hr>
                            <div style={{ borderBottomRightRadius: "8px", borderTopRightRadius: "8px" }} className={styles.Gender__img} >
                                <label htmlFor="female" id="female2" style={{ zIndex: "1000", position: "absolute", width: "100%", height: "100%", bottom: "0", right: "0" }} />
                                <input type="radio" id="female" name="sex" />
                                <label htmlFor="female" id="female"></label>
                                <img height={"125%"} src={sberKusya} style={{
                                    right: "0",
                                    position: "absolute",
                                    bottom: "-25px",
                                    height: "125%"
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.input} ${currentStep === 3 ? styles.input__active : styles.input__inactive}`}>
                        <label className={styles.input__label}>
                            Ник на платформе
                        </label>
                        <div>
                            <input type="password" className={`${styles.input__box}`}>
                            </input>
                        </div>
                    </div>
                    <div className={`${styles.input} ${currentStep === 3 ? styles.input__active : styles.input__inactive}`}>
                        <label className={styles.input__label}>
                            Ник telegram
                        </label>
                        <div>
                            <input type="password" className={`${styles.input__box}`}>
                            </input>
                        </div>
                    </div>
                    <div className={`${styles.input} ${currentStep === 3 ? styles.input__active : styles.input__inactive}`}>
                        <label className={styles.input__label}>
                            Email
                        </label>
                        <div>
                            <input type="password" className={`${styles.input__box}`}>
                            </input>
                        </div>
                    </div>
                    <div className={`${styles.input} ${currentStep === 4 ? styles.input__active : styles.input__inactive}`}>
                        <label className={styles.input__label}>
                            Пароль
                        </label>
                        <div>
                            <input type="password" className={`${styles.input__box}`}>
                            </input>
                        </div>
                    </div>
                    <div className={`${styles.input} ${currentStep === 4 ? styles.input__active : styles.input__inactive}`}>
                        <label className={styles.input__label}>
                            Подтверждение пароля
                        </label>
                        <div>
                            <input type="password" className={`${styles.input__box}`}>
                            </input>
                        </div>
                    </div>
                </div>
                <button className={`${styles.input} ${currentStep === 5 ? styles.input__active : styles.input__inactive}`} > ss</button>
            </form>
            <div style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <button className={`${styles.step__button}  ${currentStep !== 1 ? styles.input__active : styles.input__inactive}`} style={{ transform: "scale(-1,1)" }} onClick={handlePreviousStep}>
                    <img src={regArrow} />
                </button>
                <button className={styles.step__button} onClick={handleNextStep}>
                    <img src={regArrow} />
                </button>
            </div>
        </div>
    );
}