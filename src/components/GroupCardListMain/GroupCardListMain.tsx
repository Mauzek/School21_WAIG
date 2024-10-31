// GroupCardListMain.tsx
import { FC, useState } from 'react';
import { Group } from '../../pages/Home';
import HidingArrow from '../../assets/icons/hiding_arrow_group_card_list.svg'
import { Link } from 'react-router-dom';
import { GroupCardMain } from './GroupCardMain/GroupCardMain';
import styles from './GroupCardListMain.module.css';

interface GroupCardListMainProps {
    label: string;
    groups: Group[];
}

export const GroupCardListMain: FC<GroupCardListMainProps> = ({ label, groups }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section className={styles.group_list}>
            <div className={styles.group_list__header}>
                <h2 className={styles.group_list__label}>{label}</h2>
                <img
                    src={HidingArrow}
                    alt="Expand/Collapse"
                    className={`${styles.group_list__arrow} ${isExpanded ? styles.expanded : ''}`}
                    onClick={toggleExpansion}
                />
            </div>
            <div
                className={`${styles.group_list__cards} ${isExpanded ? styles.expanded : styles.collapsed}`}
            >
                {groups.slice(0, 6).map((group) => ( // Ограничение до 6 групп
                    <Link to={`/Group/${group.id}/Main`} key={group.id}>
                        <GroupCardMain group={group} />
                    </Link>
                ))}
            </div>
        </section>
    );
};
