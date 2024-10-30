import { FC } from "react"
import styles from "./ProfilePrivacy.module.css"
import imgOK from "../../../assets/icons/checker.svg"

export const ProfilePrivacy: FC = ({ }) => {
  return (<>
    <h2 className={styles.privacy__title}>Изменение конфиденциальности</h2>
    <ul className={styles.privacy__container}>
      <li>
        <p>Изменить почту:</p>
        <input />
        <div className={`${styles.privacy__input__status} ${styles.status__green}`}>
          <img className={styles.imgResult} src={imgOK} />
        </div>
      </li>
      <li>
        <p>Изменить ник/логин:</p>
        <input />
        <div className={`${styles.privacy__input__status} ${styles.status__green}`}>
          <img className={styles.imgResult} src={imgOK} />
        </div>
      </li>
      <li>
        <p>Изменение пароля</p>
      </li>
      <li>
        <p>Старый пароль:</p>
        <input type="password" />
        <div className={`${styles.privacy__input__status} ${styles.status__green}`}>
          <img className={styles.imgResult} src={imgOK} />
        </div>
      </li>
      <li>
        <p>Новый пароль:</p>
        <input type="password" />
        <div className={`${styles.privacy__input__status} ${styles.status__green}`}>
          <img className={styles.imgResult} src={imgOK} />
        </div>
      </li>
    </ul>
    <ul className={styles.buttons__activity}>
      <li>
        <button className={styles.buttons__activity__save} >Сохранить изменения</button>              
        <button className={styles.buttons__activity__cancel} >Отменить изменения</button>
      </li>
      <li><button className={styles.buttons__activity__exit} >Выйти</button></li>
    </ul>

     </>)
};
