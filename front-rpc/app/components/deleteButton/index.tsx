import { css } from "styled-system/css";

type Props = {
  onDelete: () => void;
  noBorderRadius?: boolean;
}

export function DeleteButton({ onDelete, noBorderRadius }: Props) {
  return <button
    className={css({
      color: 'white',
      borderRadius: noBorderRadius ? '0!' : '0.25rem!',
      minWidth: '0px!',
      bgColor: 'red!',
      '&:hover': {
        bgColor: 'dred!'
      },
    })}
    title="delete"
    onClick={onDelete}
  >
    <i className={`ri-delete-bin-line`}></i>
  </button>
}