import { useState } from "react";
import styles from "./Auth.module.css";
import Registration from "../../components/Registration/Registration";
import loginSvg from "../../assets/images/login.svg";
import PasswordHidden from "../../assets/icons/password_hidden.svg";
import PasswordVisible from "../../assets/icons/password_visible.svg";

export default function AuthPage() {
  const [isAuther, setIsAuther] = useState<boolean>(true);
  const [isPasswordHidden,setIsPasswordHidden] = useState<boolean>(true);
  return (
    <main className={styles.auth__centre}>
      <div className={isAuther? styles.auth:styles.reg}>
        <div className={styles.auth__asd1}>
          {isAuther ?
            <div className={styles.auth__container} >
              <h2 className={styles.login__title}>Welcome to School 21 Chat</h2>
              <p className={styles.login__description}>Пожалуйста, введите свой логин и пароль, которые вы получили ранее
                для входа в систему </p>
              <form className={styles.login__form}>
                <div className={styles.input}>
                  <label className={styles.input__label}>
                    login
                  </label>
                  <div className={styles.input__container} >
                    <input className={`${styles.input__box}`}>
                    </input>
                  </div>
                </div>
                <div className={styles.input} style={{display:"flex"}}>
                <label htmlFor="password" style={{
    height:"48px",
    width: "100%"}}
><div>
<input id="password" type={isPasswordHidden?"password":""} className={`${styles.input__box}`}>

</input>
</div>

</label>
                  <label className={styles.input__label}>
                    password
                  </label>  
                   <div className={styles.passwordBox__visibility}><img onClick={()=>{setIsPasswordHidden(!isPasswordHidden)}} src={isPasswordHidden?PasswordHidden:PasswordVisible}></img></div>
                  
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
                {/* <h5 style={{ textAlign: "left", fontSize: "16px", margin: "24px 0px 8px 0px", fontWeight: "600", lineHeight: "24px" }} > С чего начать изучение? </h5>
                <span style={{ display: "inline-block", width: "100%", textAlign: "justify", fontSize: "14px" }}>Если вы хотите учиться в школе следующего поколения, перейдите по <a style={{ textDecoration: "none" , color:"var(--linkBlue)"}} href="#"> ссылке на School21</a></span> */}
              </form>

            </div> : <Registration />}
            <div className={styles.switch__button}>
            <p className={styles.switch__button__title}>
              {isAuther?"Нет аккаунта?":"Уже зарегистрированы?"}
            <button className={styles.switch__button__link} onClick={() => (setIsAuther(!isAuther))} >{isAuther?"Зарегистрироваться":"Войти"} </button>
            </p>
              </div>
        </div>
      </div>

    </ main>
  );
}
