import { css } from "styled-system/css";
import { Guest, Present } from "~/models/guest";

type Props = {
  guest: Guest;
  onDelete: (id: number) => void;
  onSetPresence: (id: number, present: Present) => void;
}

export function GuestRow({ guest, onSetPresence, onDelete }: Props) {
  return <div className={css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    borderBottom: '1px solid #ddd'
  })}>
    <div className={css({
      display: 'flex',
      flex: '1',
      alignItems: 'center',
      '& > div': {
        flex: '1'
      }
    })}>
      <div>{guest.username}</div>
      <div>{guest.email}</div>
    </div>
    <div className={css({ display: 'flex' })}>
      <div>
        <button
          className={css({
            bgColor: guest.present === Present.OK ? 'green !important' : 'darkgrey !important',
            '&:hover': {
              bgColor: 'darkgreen !important'
            },
            color: 'white'
          })}
          onClick={() => onSetPresence(guest.id, Present.OK)}>
          <i className="ri-emotion-happy-line"></i>
        </button>
      </div>
      <div>
        <button
          className={css({
            bgColor: guest.present === Present.KO ? 'red !important' : 'darkgrey !important',
            '&:hover': {
              bgColor: 'darkred !important'
            },
            color: 'white'
          })}
          onClick={() => onSetPresence(guest.id, Present.KO)}>
          <i className="ri-emotion-unhappy-line"></i>
        </button>
      </div>
      <div>
        <button
          className={css({
            bgColor: guest.present === Present.MAYBE ? 'yellow !important' : 'darkgrey !important',
            '&:hover': {
              bgColor: 'darkyellow !important'
            },
            color: 'white'
          })}
          onClick={() => onSetPresence(guest.id, Present.MAYBE)}>
          <i className="ri-emotion-normal-line"></i>
        </button>
      </div>
      <div>
        <button
          className={css({
            bgColor: guest.present === Present.NO_ANSWER || !guest.present ? 'orange !important' : 'darkgrey !important',
            '&:hover': {
              bgColor: 'darkorange !important'
            },
            color: 'white'
          })}
          onClick={() => onSetPresence(guest.id, Present.NO_ANSWER)}>
          <i className="ri-question-mark"></i>
        </button>
      </div>
      <div className={css({ ml: '1' })}>
        <button
          className={css({
            bgColor: 'red !important',
            '&:hover': {
              bgColor: 'darkred !important'
            },
            color: 'white'
          })}
          onClick={() => onDelete(guest.id)}
        >
          <i className={`ri-delete-bin-line`}></i>
        </button>
      </div>
    </div>
  </div >
}