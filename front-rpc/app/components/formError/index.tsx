import { css } from "styled-system/css";

export function FormError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className={css({ color: 'red' })}>{error}</p>;
}