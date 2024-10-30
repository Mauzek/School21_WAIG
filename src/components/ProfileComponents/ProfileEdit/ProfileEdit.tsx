import { FC } from "react"
import styles from "./ProfileEdit.module.css"

export const ProfileEdit: FC = ({ }) => {
  return (<div className={styles.edit__container}>
    <h2 className={styles.edit__title}> Редактирование профиля   </h2>

    <ul className={styles.list__parametrs}>
      <li>Фамилия:<input className={`${styles.parametr__input}`}/></li>
      <li>Имя:<input className={`${styles.parametr__input}`}/></li>
      <li>Отчество:<input className={`${styles.parametr__input}`}/></li>
      <li className={styles.edit__parametr__telegram}>Telegram:<input className={`${styles.input__telegram} ${styles.parametr__input} `} /></li>
      <li >Пол:
        <label className={`${styles.gender__picker__container} ${styles.gender__male}`}  >
          <input className={styles.male} type="radio" />
          мужской
        </label>
        <label className={`${styles.gender__picker__container} ${styles.gender__female}`} >
          <input className={styles.female} type="radio" />
          женский
        </label>
      </li>
      <li className={styles.date__picker__container}>Дата рождения:
        <input type="date" className={`${styles.parametr__input} ${styles.input__date}`}/>
      </li>
    </ul>

    <div>
      <div className={styles.about__me__container}>
        <div className={styles.about__me__title}>  <p>О себе:</p> <p className={styles.about__me__stats}>0/800</p> </div>

        <textarea className={styles.about__me__textarea}></textarea></div>
    </div>

    <div className={styles.buttons__container}  >
      <button className={`${styles.button__activity} ${styles.button__activity__save}`}  >Сохранить настройки</button>
      <button  className={`${styles.button__activity} ${styles.button__activity__cancel}`} > Отменить изменения</button>
    </div>
  </div>)
};    