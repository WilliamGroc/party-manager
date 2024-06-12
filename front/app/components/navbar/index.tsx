import { Link } from "@remix-run/react";
import { css } from "styled-system/css";

type Props = {
  isAuthenticated: boolean;
}

export function Navbar({ isAuthenticated }: Props) {
  return <nav className={css({
    backgroundColor: 'primary',
    display: 'flex',
    justifyContent: 'center',
    padding: '8px',
    color: 'white',
  })}>
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
          <Link to="/login">
            Authentication
          </Link>
        </li>) : (
        <>
          <li>
            <Link to="/events">
              Events
            </Link>
          </li>
          <li>
            <Link to="/logout">
              Logout
            </Link>
          </li>
        </>
      )
      }
    </ul>
  </nav>
}