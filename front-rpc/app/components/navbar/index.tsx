import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
// eslint-disable-next-line import/no-unresolved
import imgFr from "/img/france.png?url"
// eslint-disable-next-line import/no-unresolved
import imgUs from "/img/etats-unis.png?url"
import { buildUrl } from "~/utils/url";
import { useLocation, useParams, Link } from "react-router";

type Props = {
  isAuthenticated: boolean;
  setLanguage: (lang: 'fr' | 'en') => void;
}

export function Navbar({ isAuthenticated, setLanguage }: Props) {
  const { t } = useTranslation();
  const location = useLocation();
  const params = useParams<{ id: string }>();

  const setInvitationLink = (path: string): string => {
    const searchParams = new URLSearchParams(location.search);
    const url = buildUrl(path);
    if (searchParams.has('invitation') && params.id)
      url.searchParams.set('invitation', params.id);
    return url.toString();
  }

  return <nav className={css({
    backgroundColor: 'primary',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
    color: 'white',
  })}>
    <div className={css({ display: 'flex', alignItems: 'center' })}>
      <div>
        <Link to="/events" className={css({
          fontWeight: 'bolder',
          mr: '12px'
        })}>
          Party planner
        </Link>
      </div>

      <ul className={css({
        display: 'flex',
        '& > li': {
          marginRight: '8px'
        },
        '& > li:last-child': {
          marginRight: '0'
        },
        '& > li > a': {
          fontWeight: 'bold',
          textDecoration: 'none'
        },
        '& > li > a:hover': {
          textDecoration: 'underline'
        }
      })}>
        {!isAuthenticated ? (
          <li>
            <Link to={setInvitationLink("/login")} >
              {t('Authentication')}
            </Link>
          </li>) : (
          <>
            <li>
              <Link to="/events">
                {t('Events')}
              </Link>
            </li>
            <li>
              <Link to="/logout">
                {t('Logout')}
              </Link>
            </li>
          </>
        )
        }
      </ul>
    </div>
    <div className={css({ display: 'flex' })}>
      <button
        className={css({
          minW: '0!'
        })}
        onClick={() => setLanguage('fr')}>
        <img src={imgFr} alt="fr" />
      </button>
      <button
        className={css({
          minW: '0!'
        })}
        onClick={() => setLanguage('en')}>
        <img src={imgUs} alt="en" />
      </button>
    </div>
  </nav>
}