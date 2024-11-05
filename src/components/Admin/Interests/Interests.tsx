import { FC } from "react";
import styles from "./Interests.module.css"
import { ColorPicker } from "antd";

export const Interests: FC = () => {
  return (<>
    <section className={styles.table__container} >
      <article className={styles.create__menu} >
        <ul className={styles.tools__list}>
          <li>
            <h2 className={styles.tools__list__title}>
              Создание интереса
            </h2>
          </li>
          <li className={styles.tool__container}>
            <p>Цвет:</p> <ColorPicker  className={styles.colorPicker__tool}   defaultValue="#123456" disabledAlpha  showText/>
          </li>
          <li className={styles.tool__container}>
            <p>Наименование:</p> <input className={styles.name__input}  />
          </li>
          <li>
            <p>Предпросмотр</p><div>*list*</div>
          </li>
        </ul>
        <div className={styles.buttons__activity__container}>
          <button className={`${styles.button__activity} ${styles.button__clear}`}>Очистить поля</button>
          <button className={`${styles.button__activity} ${styles.button__create}`}>Создать</button>
        </div>
      </article>
      <article className={styles.change__menu}>
      <ul className={styles.tools__list}>
         
          
          <li>
            <h2 className={styles.tools__list__title}>
              Изменение интереса
            </h2>
          </li>
          <li className={`${styles.input__container}`}>
            <p>Выбор интереса:</p> <input type="text" name="example" list="exampleList" className={styles.interest__input}/>
<datalist id="exampleList">
  <option value="A"/>
  <option value="B"/>
</datalist>  
          </li>

          <li className={styles.tool__container}>
            <p>Цвет:</p> <ColorPicker  className={styles.colorPicker__tool}  defaultValue="#123456" disabledAlpha  showText/>
          </li>
          <li className={`${styles.tool__container} ${styles.input__container}`}>
            <p>Наименование:</p> <input className={styles.name__input}  />
          </li>
          <li>
            <p>Предпросмотр</p><div>*list*</div>
          </li>
        </ul>
        <div className={styles.buttons__activity__container}>
          <button className={`${styles.button__activity} ${styles.button__clear}`}>Очистить поля</button>
          <button className={`${styles.button__activity} ${styles.button__create}`}>Создать</button>
        </div>



      </article>


      <article className={styles.search__menu}>
      <ul className={styles.tools__list}>
          <li>
            <h2 className={styles.tools__list__title}>
              Список всех интересов
            </h2>
          </li>
         
          <li className={styles.search__input__container}>
            <p>Поиск:</p> <input className={styles.name__input}  />
          </li>
          <li>
            <div className={styles.interests__container__all}></div>
          </li>
        </ul>
      </article>
    </section>
  </>)
}