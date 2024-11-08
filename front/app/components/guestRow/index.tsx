import { css, cx } from "styled-system/css";
import { Guest, Present } from "~/models/guest";
import { DeleteButton } from "../deleteButton";

type Props = {
  guest: Guest;
  isOwner: boolean;
  himself: boolean;
  onDelete: (id: number) => void;
  onSetPresence: (id: number, present: Present) => void;
  onShare: (id: number) => void;
}

const buttonStyle = css({
  color: 'white',
  borderRadius: '0!',
  minWidth: '0px!',
})

export function GuestRow({ guest, onSetPresence, onDelete, onShare, isOwner, himself }: Props) {
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
      <div>{guest.userId}</div>
      <div>{guest.username}</div>
      <div>{guest.email}</div>
    </div>
    <div className={css({ display: 'flex', minW: 208 })}>
      {(himself || isOwner || guest.present === Present.OK) &&
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
            onClick={() => onSetPresence(guest.id, Present.OK)}
            title="accept">
            <i className="ri-check-line"></i>
          </button>
        </div>
      }
      {(himself || isOwner || guest.present === Present.MAYBE) &&
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
            title="maybe"
            onClick={() => onSetPresence(guest.id, Present.MAYBE)}>
            <i className="ri-question-mark"></i>
          </button>
        </div>
      }
      {(himself || isOwner || guest.present === Present.KO) &&
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
            title="refuse"
            onClick={() => onSetPresence(guest.id, Present.KO)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
      }
      {isOwner && <>
        <div className={css({ ml: '1' })}>
          {!guest.userId &&
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
              title="share"
              onClick={() => onShare(guest.id)}>
              <i className="ri-share-line"></i>
            </button>
          }
        </div>
        <div className={css({ ml: '1' })}>
          <DeleteButton onDelete={() => onDelete(guest.id)} noBorderRadius />
        </div>
      </>}
    </div>
  </div >
}