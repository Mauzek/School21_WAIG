import { FC } from "react"
import styles from "./ProfileInfo.module.css"
import ImgPath from "../../../assets/images/SberCat2.svg"
import TagsList from '../../../components/TagsList/TagsList'
import changeImg from "../../../assets/icons/change_img.svg"

export const ProfileInfo: FC = ({ }) => {
  return (
 <>
      <div className={styles.info__block}>
        {Avatar()}
        <div className={styles.information}>
          <h2 className={styles.Names}>
            Фамилия Имя Отчество
          </h2>
          <p className={styles.info__text}>
            дд.мм.гггг
          </p>
          <a className={`${styles.info__link} ${styles.info__text}`}>
            @tglink
          </a>
          <p className={styles.info__text}>
            email@example.cum
          </p>
          <p style={{ color: "#FF547F" }}>
            жен.
          </p>
        </div>
        <fieldset className={styles.d} >
          <legend style={{textAlign:"center",padding:"0px 10px"}}>О Себе</legend>
          <p style={{wordBreak:"break-all",fontSize:"12px"}} >WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW</p>
        </fieldset>
        {/* {StatusBar()}  */}
      </div>
      <div className={styles.profile__description}>
        <TagsList />
        <button className={styles.exit__button}>Выход</button>
      </div></>)
};

function StatusBar() {
  return (<div className={styles.status__bar}><div className={styles.status__circle__green} ></div><p>online</p></div>)
}

function Avatar() {
  return (
    <div ><div className={styles.avatar__container}><button className={styles.avatar__change}>
      <img src={changeImg} className={styles.avatar__change__img} /></button>
      <img src={ImgPath} className={styles.avatar} /></div>

      <p className={styles.avatar__description}>Nickname</p>
    </div>
  )
}