import Image from "next/image";
import HeaderIcon from "../../images/shopavatar.jpg";
import styles from "./Header.module.scss";
import {Search} from "../Search/Search";
import {Profile} from "../Profile/Profile";
import Link from "next/link";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>
          <Image src={HeaderIcon} alt="gameshop" width={60} height={60} />
          Gameshop
        </div>
      </Link>
      <Search />
      <Profile />
    </header>
  );
};
