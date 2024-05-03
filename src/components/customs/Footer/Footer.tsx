import Logo from '@/components/Icons/Logo';
import styles from './Footer.module.scss';
import GitHub from '@/components/Icons/GitHub';
import LinkedIn from '@/components/Icons/LinkedIn';
import Link from 'next/link';

const routes = [
  {
    name: 'Pokemons',
    path: '/pokemons'
  },
  {
    name: 'Trainers',
    path: '/trainers'
  },
  {
    name: 'Types',
    path: '/types'
  },
  {
    name: 'Policies',
    path: '/policies'
  }
]

const socials = [
  {
    icon: <GitHub />,
    url: 'https://www.github.com/dCben335'
  },
  {
    icon: <LinkedIn />,
    url: 'https://www.linkedin.com/in/benoit-cabocel/'
  }
]

type FooterProps = {
}


const Footer = ({  }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={`${styles.flex} ${styles.logoContainer}`} >
          <Link href={"/"} className={styles.logo}>
            <Logo />
          </Link>
          <span className={styles.centered}>© 2024 Benoit Cabocel. All rights reserved.</span>
        </div>
        <div className={`${styles.flex} ${styles.centered}`}>
          <h2>Navigation</h2>
          <ul className={styles.links}>
            {routes.map(route => (
              <li key={route.path}>
                <Link href={route.path} className={styles.link}>
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.flex}>
          <h2>Socials</h2>
          <ul className={styles.socials}>
            {socials.map(social => (
              <li key={social.url}>
                <Link href={social.url} className={styles.social} target='_blank'>
                  {social.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
 
    </footer>
  );
}

export default Footer;