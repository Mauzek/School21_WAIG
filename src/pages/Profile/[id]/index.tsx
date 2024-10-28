import { FC } from 'react'
import styles from "./Profile.module.css"
import ImgPath from "../../../assets/images/SberCat2.svg"
import TagsList from '../../../components/TagsList/TagsList';
const ProfilePage: FC = () => {
  return (
    <main className={styles.profile__back}>
      <div className={styles.profile__back__container}>
        <div className={styles.info__block}>
          {Avatar()}
          <div className={styles.information}>
            <h2 className={styles.Names}>
              Фамилия Имя Отчество
            </h2>
            <p className={styles.info__text}>
              дд.мм.гггг
            </p>
            <p className={styles.info__text}>
              @tglink
            </p>
            <p className={styles.info__text}>
              email@example.cum
            </p>
            <p style={{ color: "#FF547F" }}>
              жен.
            </p>
          </div>
          {StatusBar()}
        </div>
        <div className={styles.profile__description}>
          <TagsList />
          <button className={styles.exit__button}>Выход</button>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage;

function StatusBar() {
  return (<div className={styles.status__bar}><div className={styles.status__circle__green} ></div><p>online</p></div>)
}

function Avatar() {
  return (
    <div >
      <img src={ImgPath} className={styles.avatar} />
      <p className={styles.avatar__description}>Nickname</p>
    </div>
  )
}