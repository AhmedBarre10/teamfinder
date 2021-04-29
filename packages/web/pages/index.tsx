import { createUseStyles } from "react-jss"
import Link from 'next/link'

const useStyles = createUseStyles({
  main: {
    width: '80%'
  },
  welcomeText: {
    fontSize: '15px',
  },
  getStartedLink: {
    margin: "1rem",
    backgroundColor: "rgb(0, 255, 136)",
    border: "none",
    outline: "none",
    color: "rgb(0, 0, 0)",
    padding: "8px",
    fontFamily: "'Poppins', sans-serif",
    textDecoration: "none",
    width: "12rem",
    textAlign: "center",
    fontSize: "18px",
    borderRadius: "10px 10px 10px 10px"
  }
});

export default function Home(): JSX.Element {
  const styles = useStyles();
  return (
    <div>
      <div className={styles.main}>
        <h1 className={styles.welcomeText}>
          Team Finder team up with like minded players
        </h1>

        <p className={styles.welcomeText}>
          team finder is free for a limited time
        </p>
      </div>
      <Link href="/find">
        <a className={styles.getStartedLink}>Get Started</a>
      </Link>
    </div>
  )
}