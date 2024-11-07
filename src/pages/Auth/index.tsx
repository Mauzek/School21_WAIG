import { useState } from "react";
import styles from "./Auth.module.css";
import {Registration} from "../../components/Registration/Registration";
import loginSvg from "../../assets/images/login.svg";
import PasswordHidden from "../../assets/icons/password_hidden.svg";
import PasswordVisible from "../../assets/icons/password_visible.svg";
import {
  isResponseOk,
  authorize,
  setJWT,
  getUser,
  getJWT,
  setUsername,
} from "../../API/api-utils";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/app-store";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isAuther, setIsAuther] = useState<boolean>(true);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [authData, setAuthData] = useState({ username: "", password: "" });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  const { updateUserStore, setToken } = useStore();
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: Response | Error = await authorize(authData);
    if (isResponseOk(userData)) {
      console.log(userData);
      setJWT(userData.token);
      console.log("%c Успешный вход!", "color:#44eb99");
      const tokenJWT = getJWT();
      if (tokenJWT) {
        setToken(tokenJWT);
        const responseUser = await getUser(authData.username, tokenJWT);
        setUsername(authData.username);
        updateUserStore(responseUser);
        navigate("/Home");
      } else {
        console.log("Token is null, unable to proceed with authentication.");
      }
    } else {
      console.log("no");
    }
  };

  return (
    <main className={styles.auth__centre}>
      <div
        className={isAuther ? styles.auth : styles.reg}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className={styles.auth__asd1}>
          {isAuther ? (
            <div className={styles.auth__container}>
              <h2 className={styles.login__title}>Добро пожаловать в WAIG</h2>
              <p className={styles.login__description}>
                Пожалуйста, введите свой логин и пароль, которые вы указали при
                регистрации для входа в систему{" "}
              </p>
              <form className={styles.login__form} onSubmit={handleSubmit}>
                <div className={styles.input}>
                  <label className={styles.input__label}>login</label>
                  <div className={styles.input__container}>
                    <input
                      className={`${styles.input__box}`}
                      name="username"
                      value={authData.username}
                      onChange={handleInput}
                    ></input>
                  </div>
                </div>
                <div className={styles.input} style={{ display: "flex" }}>
                  <label
                    htmlFor="password"
                    style={{
                      height: "48px",
                      width: "100%",
                    }}
                  >
                    <div>
                      <input
                        id="password"
                        type={isPasswordHidden ? "password" : ""}
                        className={`${styles.input__box}`}
                        name="password"
                        value={authData.password}
                        autoComplete="on"
                        onChange={handleInput}
                      ></input>
                    </div>
                  </label>
                  <label className={styles.input__label}>password</label>
                  <div className={styles.passwordBox__visibility}>
                    <img
                      onClick={() => {
                        setIsPasswordHidden(!isPasswordHidden);
                      }}
                      src={isPasswordHidden ? PasswordHidden : PasswordVisible}
                    ></img>
                  </div>
                </div>
                <div className={styles.login__container}>
                  <button className={styles.login__Button} type="submit">
                    {" "}
                    <div>Войти</div>
                    <div className={styles.login__Button__arrow}>
                      <img src={loginSvg}></img>
                    </div>
                  </button>
                  <p>Забыли пароль?</p>
                </div>
                <hr className={styles.login__hr} />
                {/* <h5 style={{ textAlign: "left", fontSize: "16px", margin: "24px 0px 8px 0px", fontWeight: "600", lineHeight: "24px" }} > С чего начать изучение? </h5>
                <span style={{ display: "inline-block", width: "100%", textAlign: "justify", fontSize: "14px" }}>Если вы хотите учиться в школе следующего поколения, перейдите по <a style={{ textDecoration: "none" , color:"var(--linkBlue)"}} href="#"> ссылке на School21</a></span> */}
              </form>
            </div>
          ) : (
            <Registration setIsAuther={setIsAuther} />
          )}
        </div>
        <div></div>
        <div className={styles.switch__button}>
          <p className={styles.switch__button__title}>
            {isAuther ? "Нет аккаунта?" : "Уже зарегистрированы?"}
            <button
              className={styles.switch__button__link}
              onClick={() => setIsAuther(!isAuther)}
            >
              {isAuther ? "Зарегистрироваться" : "Войти"}{" "}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
