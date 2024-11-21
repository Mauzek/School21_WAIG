import { FC, useEffect, useState } from "react";
import styles from "./Interests.module.css"
import { ColorPicker } from "antd";
import { createInterest, getAllInterests, deleteInterest, updateInterest } from "../../../API/api-utils";
import { useStore } from "../../../store/app-store";
import { InterestsList } from "../../InterestsList/InterestsList";
import Tag from "../../InterestsList/Tag";
import { Interests as Interest } from "../../../types";


export const Interests: FC = () => {
  const { token } = useStore();
  const [createdInterest, setCreatedInterest] = useState<Interest>({ name: "", color: "000000" })
  const [allInterests, setAllInterests] = useState<Interest[]>();
  const [changeableInterest, setChangeableInterest] = useState<Interest>();
  const [changeableInterestColor, setChangeableInterestColor] = useState<string>("000000");
  const [searchTerm, setSearchTerm] = useState<string>(""); 

  const handleColorChangeUpdate = (color: any) => {
    setChangeableInterestColor(color.toHexString().replace('#', '').substring(0, 6));
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllInterests(token)
      setAllInterests(result)
      setChangeableInterest(result[0]);
      setChangeableInterestColor(result[0].color);
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

  const handleSelectInterest = (elem: Interest) => {
    setChangeableInterest(elem);
    setChangeableInterestColor(elem.color);

  };

  const handleUpdateInterest = async () => {
    if (changeableInterest && changeableInterest.name && allInterests) {
      if (changeableInterest.color != changeableInterestColor) {
        updateInterest(token, changeableInterest?.name, changeableInterestColor);
        setAllInterests(allInterests.map(elem => {
          if (elem.name === changeableInterest.name) {
            return { ...elem, color: changeableInterestColor };
          }
          return elem;
        }));
        setChangeableInterest({ name: changeableInterest.name, color: changeableInterestColor });
      }
    }

  }

const handleCleareInterest = () => {
  setCreatedInterest({ name: '', color: '000000' });
}  

const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value.toLowerCase().trim()); 
};

const filteredInterests =allInterests&& allInterests.filter(elem => 
  elem.name.toLowerCase().includes(searchTerm)
);

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
            <ColorPicker className={`${styles.colorPicker__tool} ${styles.static__colorpicker}`} onChangeComplete={(color) => { handleColorChange(color) }} value={createdInterest.color} defaultValue={`#{createdInterest.color}`} disabledAlpha showText />
          </li>
          <li className={styles.tool__container}>
            <p>Наименование:</p> <input className={styles.name__input} name="name" onInput={handleNameChange} value={createdInterest.name} />
          </li>
          {createdInterest.name && <Tag color={`#${createdInterest.color}`} name={createdInterest.name} />
          }
        </ul>
        <div className={styles.buttons__activity__container}>
          <button className={`${styles.button__activity} ${styles.button__clear}`}  onClick={handleCleareInterest}>Очистить поля</button>
          <button className={`${styles.button__activity} ${styles.button__create}`} disabled={createdInterest.name.trim().length === 0} onClick={handleCreateInterest}>Создать</button>
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
            <p style={{ marginRight: "15px" }}>Выбранный интерес:</p>
            <ul>{changeableInterest && <Tag color={`#${changeableInterest.color}`} name={changeableInterest.name} />}</ul>

          </li>
          <li className={styles.tool__container}>
            <p>Цвет:</p> <ColorPicker className={styles.colorPicker__tool} onChange={handleColorChangeUpdate} value={`#${changeableInterestColor}`} disabledAlpha showText />
          </li>

          <li className={`${styles.input__container}`}>
            <p style={{ marginRight: "15px" }}>Предпросмотр: </p>
            <ul style={{ display: "flex" }}>
              {changeableInterest && <Tag color={`#${changeableInterestColor}`} name={changeableInterest.name} />}
            </ul>
          </li>
        </ul>
        <div className={styles.buttons__activity__container}>
          <button className={`${styles.button__activity} ${styles.button__clear}`}>Очистить поля</button>
          <button
            className={`${styles.button__activity} ${styles.button__create}`}
            onClick={handleUpdateInterest}>Изменить</button>
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
            <p>Поиск:</p> <input onChange={handleSearch} className={styles.name__input} />
          </li>
          <li>
            <div className={styles.interests__container__all}>
              {/* {allInterests && <InterestsList interests={allInterests} />} */}
              {filteredInterests&&  <InterestsList interests={filteredInterests} />}
              <table className={styles.interests__table}>
                <thead >
                  <tr className={styles.table__titles}>
                    <th>Color</th>
                    <th>Name</th>
                    <th>Delete</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allInterests && allInterests.map(elem =>
                      <tr key={elem.name}>
                        <td ><div className={styles.color__print__value}> <div className={styles.color__print} style={{ background: `#${elem.color}` }}></div> <p>{elem.color}</p></div></td>
                        <td style={{ wordBreak: "break-all" }}>{elem.name}</td>
                        <td><button onClick={() => handleDeleteInterest(elem.name)} className={styles.button__delete}>Delete</button></td>
                        <td><button onClick={() => { handleSelectInterest(elem) }} className={styles.button__select}>Select</button></td>
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