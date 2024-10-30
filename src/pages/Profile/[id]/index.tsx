import { FC } from 'react'
import styles from "./Profile.module.css"
import { ProfileInfo } from '../../../components/ProfileComponents/ProfileInfo/ProfileInfo'
import { ProfileEdit } from '../../../components/ProfileComponents/ProfileEdit/ProfileEdit';
import { ProfilePrivacy } from '../../../components/ProfileComponents/ProfilePrivacy/ProfilePrivacy';

const ProfilePage: FC = () => {

  interface IUser {
    login: String,
  }
  const path = location.pathname;
  const user: IUser = {
    login: "Morganfriman"
  };
  const defPath = "/Profile/"


  return (
    <main className={styles.profile__back}>
      
    <div className={styles.profile__back__container}>
      {

        path == defPath + user.login + "/Edit" ? <ProfileEdit /> :
          path == defPath + user.login + "/Privacy" ? <ProfilePrivacy /> : <ProfileInfo />
      }
      </div>
    </main>
  )
}

export default ProfilePage;
