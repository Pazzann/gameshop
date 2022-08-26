import { useAuth } from "../../hooks";
import styles from "./Profile.module.scss";
export const Profile = () => {
    const {user, isAuthenticated, login, logout} = useAuth();
    
    return <div className={styles.profile}>
        {isAuthenticated ? <div className={styles.user} onClick={logout}>
            <img src={`https://cdn.discordapp.com/avatars/${user.userid}/${user.userImageId}.png?size=128`} alt={user.userName} />
            <span>{user.userName}</span>
        </div> : <button className={styles.button} onClick={login}>Login</button>}
    </div>
}