import { useState } from "react";
import styles from "./Auth.module.css";
import { Registration } from "../../components/Registration/Registration";
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
  verify2FA, // функция для проверки 2FA
} from "../../API/api-utils";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/app-store";
import { TwoFactorAuthentication } from "../../components/2FA/2FA";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isAuther, setIsAuther] = useState<boolean>(true);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [is2FA, setIs2FA] = useState<boolean>(false);
  const [confirmCode, setConfirmCode] = useState<string>("");
  const [authData, setAuthData] = useState({ username: "", password: "" });
  const { updateUserStore, setToken } = useStore();
  const [userData, setUserData] = useState<any>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await authorize(authData);
      if (response) {
        setUserData(response); 
        setIs2FA(true); 
      }
    } catch (error: any) {
      alert( "Ошибка авторизации. Проверьте данные и попробуйте снова.");
    }
  }

  const handle2FACheck = async () => {
    if (!userData) return;
    const isCodeValid = await verify2FA(authData.username,confirmCode); 
    if (isResponseOk(isCodeValid)) {
      setJWT(userData.token);
      setToken(userData.token);

      const responseUser = await getUser(authData.username, userData.token);
      setUsername(authData.username);
      updateUserStore(responseUser);

      navigate("/Home"); 
    } else {
      console.log("2FA validation failed");
    }
  };

  return (
    <main className={styles.auth__centre}>
      <div
        className={`${isAuther ? styles.auth : styles.reg} ${styles.main__container}`}
      >
        <div className={styles.auth__asd1}>
          {is2FA ? (
            <TwoFactorAuthentication
              setConfirmCode={setConfirmCode}
              handleSubmit={handle2FACheck}
            />
          ) : isAuther ? (
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
                <div
                  className={`${styles.input} ${styles.password__box__flex}`}
                >
                  <label
                    htmlFor="password"
                    className={styles.password__label}
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
                      <img src={loginSvg} />
                    </div>
                  </button>
                  <p className={styles.forgot__password}>Забыли пароль?</p>
                </div>
                <hr className={styles.login__hr} />
              </form>
            </div>
          ) : (
            <Registration setIsAuther={setIsAuther} />
          )}
        </div>
        <div></div>
        <div className={styles.switch__button}>
         {!is2FA &&  <p className={styles.switch__button__title}>
            {isAuther ? "Нет аккаунта?" : "Уже зарегистрированы?"}
            <button
              className={styles.switch__button__link}
              onClick={() => setIsAuther(!isAuther)}
            >
              {isAuther ? "Зарегистрироваться" : "Войти"}{" "}
            </button>
          </p>}
        </div>
      </div>
    </main>
  );
}
