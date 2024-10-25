
import { useState } from "react";
import styles from "./Auth.module.css";
import Registration from "../../components/Registration/Registration";
import loginSvg from "../../assets/images/login.svg";
import { useLocation } from 'react-router-dom'

export default function AuthPage() {
  const location = useLocation();
  const [isAuther, setIsAuther] = useState<boolean>(true);
  return (
    <>
      <div className={styles.auth}>
        {isAuther ?
          <div className={styles.auth__container}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px", textAlign: "start" }}>Welcome to School 21 Chat</h2>
            <p style={{ fontSize: "14px", fontWeight: "400", textAlign: "justify" }}> Пожалуйста, введите свой логин и пароль, которые вы получили ранее
              для входа в систему </p>
            <form style={{ marginTop: "40px" }}>
              <div className={styles.input}>
                <label className={styles.input__label}>
                  login
                </label>
                <div className={styles.input__container} >
                  <input className={`${styles.input__box}`}>
                  </input>
                </div>
              </div>
              <div className={styles.input}>
                <label className={styles.input__label}>
                  password
                </label>
                <div>
                  <input type="password" className={`${styles.input__box}`}>
                  </input>
                </div>
              </div>


              <div className={styles.login__container}>
                <button className={styles.login__Button} > <div>Войти</div>

                  <div className={styles.login__Button__arrow}>
                    <img src={loginSvg}>
                    </img>
                  </div>
                </button>
                <p>Забыли пароль?</p>
              </div>
              <hr className={styles.login__hr} />
              <h5 style={{ textAlign: "left", fontSize: "16px", margin: "24px 0px 8px 0px", fontWeight: "600", lineHeight: "24px" }} > С чего начать изучение? </h5>
              <span style={{ display: "inline-block", width: "100%", textAlign: "justify", fontSize: "14px" }}>Если вы хотите учиться в школе следующего поколения, перейдите по <a style={{ textDecoration: "none" }} href="#"> ссылке на School21</a></span>
            </form>

          </div> : <Registration />}
        <button onClick={() => (setIsAuther(!isAuther))} />
      </div>

    </>
  );
}
