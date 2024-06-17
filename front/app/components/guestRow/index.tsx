import { css, cx } from "styled-system/css";
import { Guest, Present } from "~/models/guest";
import { DeleteButton } from "../deleteButton";

type Props = {
  guest: Guest;
  onDelete: (id: number) => void;
  onSetPresence: (id: number, present: Present) => void;
  onShare: (id: number) => void;
}

const buttonStyle = css({
  color: 'white',
  borderRadius: '0!',
  minWidth: '0px!',
})

export function GuestRow({ guest, onSetPresence, onDelete, onShare }: Props) {
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
          className={cx(
            buttonStyle,
            css({
              bgColor: guest.present === Present.OK ? 'green!' : 'dgrey!',
              '&:hover': {
                bgColor: 'dgreen!'
              },
            }))}
          onClick={() => onSetPresence(guest.id, Present.OK)}>
          <i className="ri-emotion-happy-line"></i>
        </button>
      </div>
      <div>
        <button
          className={cx(
            buttonStyle,
            css({
              bgColor: guest.present === Present.KO ? 'red!' : 'dgrey!',
              '&:hover': {
                bgColor: 'dred!'
              },
            }))}
          onClick={() => onSetPresence(guest.id, Present.KO)}>
          <i className="ri-emotion-unhappy-line"></i>
        </button>
      </div>
      <div>
        <button
          className={cx(
            buttonStyle,
            css({
              bgColor: guest.present === Present.MAYBE ? 'yellow!' : 'dgrey!',
              '&:hover': {
                bgColor: 'dyellow!'
              }
            }))}
          onClick={() => onSetPresence(guest.id, Present.MAYBE)}>
          <i className="ri-emotion-normal-line"></i>
        </button>
      </div>
      <div>
        <button
          className={cx(
            buttonStyle,
            css({
              bgColor: guest.present === Present.NO_ANSWER || !guest.present ? 'orange!' : 'dgrey!',
              '&:hover': {
                bgColor: 'dorange!'
              },
              color: 'white',
              borderRadius: '0!'
            }))}
          onClick={() => onSetPresence(guest.id, Present.NO_ANSWER)}>
          <i className="ri-question-mark"></i>
        </button>
      </div>
      <div className={css({ ml: '1' })}>
        <button
          className={cx(
            buttonStyle,
            css({
              bgColor: 'green!',
              '&:hover': {
                bgColor: 'dgreen!'
              },
              color: 'white',
              borderRadius: '0!'
            }))}
          onClick={() => onShare(guest.id)}>
          <i className="ri-share-line"></i>
        </button>
      </div>
      <div className={css({ ml: '1' })}>
        <DeleteButton onDelete={() => onDelete(guest.id)} noBorderRadius />
      </div>
    </div>
  </div >
}