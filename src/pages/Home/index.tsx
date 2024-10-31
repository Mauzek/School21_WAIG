import { FC } from 'react'
import { GroupCardListMain } from '../../components/GroupCardListMain/GroupCardListMain';
import styles from './Home.module.css'

export type Group = {
  id: string,
  ownerID: string,
  name: string,
  chars: string,
  description: string,
  members: string[],
  color: string,
  type: string[]
}

const groupsData: Group[] = [
  {
    id: "1",
    ownerID: "123",
    name: "Frontend Devs",
    chars: "FD",
    description: "Группа для фронтенд-разработчиков, чтобы делиться идеями и ресурсами.",
    members: ["1", "2", "3", "4"],
    color: "#3498db",
    type: ['Программирование', 'Общение']
  },
  {
    id: "2",
    ownerID: "124",
    name: "Backend Gurus",
    chars: "BG",
    description: "Группа, сосредоточенная на бэкенд-разработке и лучших практиках.",
    members: ["1", "2"],
    color: "#e74c3c",
    type: ['Программирование']
  },
  {
    id: "3",
    ownerID: "125",
    name: "Music Lovers",
    chars: "ML",
    description: "Группа для любителей музыки, обмена плейлистами и обсуждения любимых исполнителей.",
    members: ["1", "2", "3", "4", "5"],
    color: "#9b59b6",
    type: ['Музыка', 'Отдых']
  },
  {
    id: "4",
    ownerID: "126",
    name: "Game Masters",
    chars: "GM",
    description: "Группа для геймеров, обсуждающих стратегии и новинки игр.",
    members: ["1", "2", "3"],
    color: "#2ecc71",
    type: ['Гейминг', 'Общение']
  },
  {
    id: "5",
    ownerID: "127",
    name: "Fitness Fanatics",
    chars: "FF",
    description: "Группа, посвященная здоровому образу жизни и правильному питанию.",
    members: ["1", "2", "3", "4"],
    color: "#e67e22",
    type: ['Спорт', 'Правильное питание']
  },
  {
    id: "6",
    ownerID: "128",
    name: "Readers Unite",
    chars: "RU",
    description: "Группа для любителей чтения, обсуждения книг и авторов.",
    members: ["1", "2"],
    color: "#1abc9c",
    type: ['Чтение', 'Общение']
  },
  {
    id: "7",
    ownerID: "129",
    name: "Math Whizzes",
    chars: "MW",
    description: "Группа для любителей математики, решение задач и обмен знаниями.",
    members: ["1", "2", "3", "4", "5", "6"],
    color: "#3498db",
    type: ['Математика', 'Обучение']
  },
  {
    id: "8",
    ownerID: "130",
    name: "Physics Enthusiasts",
    chars: "PE",
    description: "Группа для обсуждения физических концепций и экспериментов.",
    members: ["1", "2", "3"],
    color: "#e74c3c",
    type: ['Физика', 'Обучение']
  },
  {
    id: "9",
    ownerID: "131",
    name: "Art Creators",
    chars: "AC",
    description: "Группа для художников и любителей рисования, делимся работами и советами.",
    members: ["1", "2", "3", "4", "5", "6"],
    color: "#9b59b6",
    type: ['Рисование', 'Общение']
  },
  {
    id: "10",
    ownerID: "132",
    name: "Video Editors",
    chars: "VE",
    description: "Группа для тех, кто занимается видеомонтажом и хочет делиться опытом.",
    members: ["1", "2"],
    color: "#2ecc71",
    type: ['Монтаж', 'Обучение']
  },
  {
    id: "11",
    ownerID: "133",
    name: "Relaxation Zone",
    chars: "RZ",
    description: "Группа для обмена способами отдыха и релаксации.",
    members: ["1", "2", "3"],
    color: "#e67e22",
    type: ['Отдых']
  },
  {
    id: "12",
    ownerID: "134",
    name: "Social Connect",
    chars: "SC",
    description: "Группа для общения и поиска новых друзей.",
    members: ["1", "2", "3", "4"],
    color: "#1abc9c",
    type: ['Общение']
  },
  {
    id: "13",
    ownerID: "135",
    name: "Learning Hub",
    chars: "LH",
    description: "Группа для изучения различных тем и обмена знаниями.",
    members: ["1", "2", "3", "4", "5"],
    color: "#3498db",
    type: ['Обучение', 'Программирование']
  },
  {
    id: "14",
    ownerID: "136",
    name: "Series Addicts",
    chars: "SA",
    description: "Группа для любителей сериалов, обсуждение последних новинок.",
    members: ["1", "2"],
    color: "#e74c3c",
    type: ['Сериалы', 'Отдых']
  },
  {
    id: "15",
    ownerID: "137",
    name: "Study Buddies",
    chars: "SB",
    description: "Группа для студентов, помогаем друг другу в учебе.",
    members: ["1", "2", "3"],
    color: "#9b59b6",
    type: ['Обучение', 'Чтение']
  },
  {
    id: "16",
    ownerID: "138",
    name: "Healthy Eating",
    chars: "HE",
    description: "Группа для обсуждения правильного питания и здорового образа жизни.",
    members: ["1", "2", "3", "4"],
    color: "#2ecc71",
    type: ['Правильное питание', 'Спорт']
  },
  {
    id: "17",
    ownerID: "139",
    name: "Gamer Society",
    chars: "GS",
    description: "Группа для обсуждения игр, стратегий и последних новинок.",
    members: ["1", "2", "3", "4", "5", "6"],
    color: "#e67e22",
    type: ['Гейминг', 'Общение']
  },
  {
    id: "18",
    ownerID: "140",
    name: "Creative Minds",
    chars: "CM",
    description: "Группа для креативных людей, делимся идеями и вдохновением.",
    members: ["1", "2", "3", "4"],
    color: "#1abc9c",
    type: ['Рисование', 'Общение']
  },
  {
    id: "19",
    ownerID: "141",
    name: "Science Explorers",
    chars: "SE",
    description: "Группа для обсуждения научных открытий и исследований.",
    members: ["1", "2"],
    color: "#3498db",
    type: ['Обучение', 'Физика']
  },
  {
    id: "20",
    ownerID: "142",
    name: "Culinary Creators",
    chars: "CC",
    description: "Группа для тех, кто любит готовить и делиться рецептами.",
    members: ["1", "2", "3", "4", "5"],
    color: "#e74c3c",
    type: ['Правильное питание', 'Отдых']
  },
  {
    id: "21",
    ownerID: "1",
    name: "Бомжерна таверн",
    chars: "WW",
    description: "собрание каких-то челов, которые собрались и ну выиграли на изи бездарей этих",
    members: ["1", "2", "3", "4", "5", "6", "7"],
    color: "#e74c3c",
    type: ['Программирование']
  },
];



const HomePage: FC = () => {
  // Группируем данные по типам
  const groupedByType = groupsData.reduce((acc, group) => {
    // Перебираем все типы группы
    group.type.forEach((type:string) => {
      if (!acc[type]) {
        acc[type] = []; // Инициализируем массив для нового типа
      }
      acc[type].push(group); // Добавляем группу в массив соответствующего типа
    });
    return acc;
  }, {} as Record<string, Group[]>); // Указываем тип для аккамулятора

  return (
    <main className={styles.home_page__container}>
      {Object.entries(groupedByType).map(([type, groups]) => {
        // Сортируем группы по количеству участников
        const sortedGroups = groups.sort((a, b) => b.members.length - a.members.length);

        return (
          <GroupCardListMain key={type} label={type} groups={sortedGroups} />
        );
      })}
    </main>
  );
};


export default HomePage;