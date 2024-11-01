import { FC } from "react";
import styles from "./Interests.module.css"
import { ColorPicker } from "antd";

export const Interests: FC = () => {
  return (<>
    <section className={styles.table__container} >
      <article className={styles.create__menu} >
        <ul className={styles.tools__list}>
          <li>
            <h1 className={styles.tools__list__title}>
              Создание интереса
            </h1>
          </li>
          <li className={styles.tool__container}>
            <p>Цвет:</p> <ColorPicker className={styles.colorPicker__tool} style={{background:"#1D2633",color:"#ffffff"}}  defaultValue="#ffffff"  showText/>
          </li>
          <li className={styles.tool__container}>
            <p>Наименование:</p> <input className={styles.name__input}  />
          </li>
          <li>
            <p>Предпросмотр</p><div>*list*</div>
          </li>
        </ul>
        <div>
          <button className={`${styles.button__activity} ${styles.button__clear}`}>Очистить поля</button>
          <button className={`${styles.button__activity} ${styles.button__create}`}>Создать</button>
        </div>
      </article>
      <article className={styles.change__menu}></article>
      <article className={styles.search__menu}></article>
    </section>
  </>)
}