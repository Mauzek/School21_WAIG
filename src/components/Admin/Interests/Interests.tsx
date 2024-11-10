import { FC, useEffect, useState } from "react";
import styles from "./Interests.module.css"
import { ColorPicker } from "antd";
import { createInterest, getAllInterests, deleteInterest } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";
import { InterestsList } from "../../InterestsList/InterestsList";
import Tag from "../../InterestsList/Tag";
import { Interests as Interest } from "../../../types";


export const Interests: FC = () => {
  const { token } = useStore();
  const [createdInterest, setCreatedInterest] = useState<Interest>({ name: "", color: "000000" })
  const [allInterests, setAllInterests] = useState<Interest[]>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllInterests(token)
      setAllInterests(result)
    };
    fetchData();
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedInterest({ ...createdInterest, [e.target.name]: e.target.value });
  };

  const handleColorChange = (color: any) => {
    setCreatedInterest((prevState) => ({
      ...prevState,
      color: color.toHexString().replace('#', '').substring(0, 6)
    }));
  };

  const handleCreateInterest = async () => {
    if (token && createdInterest.color && createdInterest.name) {
      const result = await createInterest(token, createdInterest);
      setAllInterests(createdInterest => createdInterest && [...createdInterest, result]);
    } else {
      console.error('Необходимые данные отсутствуют');
    }
  }

  const handleDeleteInterest = async (interestName: string) => {
    const result = await deleteInterest(token, interestName);
    setAllInterests(prevInterests => prevInterests && prevInterests.filter(item => item.name !== interestName));
  };
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
            <p>Цвет:</p>
            <ColorPicker className={styles.colorPicker__tool} onChangeComplete={(color) => { handleColorChange(color) }} value={createdInterest.color} defaultValue={`#{createdInterest.color}`} disabledAlpha showText />
          </li>
          <li className={styles.tool__container}>
            <p>Наименование:</p> <input className={styles.name__input} name="name" onInput={handleNameChange} value={createdInterest.name} />
          </li>
          {createdInterest.name && <Tag color={`#${createdInterest.color}`} name={createdInterest.name} />
          }
        </ul>
        <div className={styles.buttons__activity__container}>
          <button className={`${styles.button__activity} ${styles.button__clear}`}>Очистить поля</button>
          <button className={`${styles.button__activity} ${styles.button__create}`} onClick={handleCreateInterest}>Создать</button>
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
            <p>Выбор интереса:</p> <input type="text" name="example" list="exampleList" className={styles.interest__input} />
            <datalist id="exampleList">
              <option value="A" />
              <option value="B" />
            </datalist>
          </li>
          <li className={styles.tool__container}>
            <p>Цвет:</p> <ColorPicker className={styles.colorPicker__tool} onChange={handleColorChange} defaultValue="#123456" disabledAlpha showText />
          </li>
          <li className={`${styles.tool__container} ${styles.input__container}`}>
            <p>Наименование:</p> <input className={styles.name__input} />
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
            <p>Поиск:</p> <input className={styles.name__input} />
          </li>
          <li>
            <div className={styles.interests__container__all}>
              {allInterests && <InterestsList interests={allInterests} />}
              <table className={styles.interests__table}>
                <thead >
                  <tr className={styles.table__titles}>
                    <th>
                      Color
                    </th>
                    <th>
                      Name
                    </th>
                    <th>
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allInterests && allInterests.map(elem =>
                      <tr key={elem.name}>
                        <td ><div className={styles.color__print__value}> <div className={styles.color__print} style={{ background: `#${elem.color}` }}></div> <p>{elem.color}</p></div></td>
                        <td style={{ wordBreak: "break-all" }}>{elem.name}</td>
                        <td><button onClick={() => handleDeleteInterest(elem.name)}>Delete</button></td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </li>
        </ul>
      </article>
    </section>
  </>)
}