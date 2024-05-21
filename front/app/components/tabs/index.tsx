import { Fragment } from "react";
import { css } from "styled-system/css";

type Props = {
  tabs: string[];
  current: string,
  onChange: (tab: string) => void;
}

export function Tabs({ tabs, current, onChange }: Props) {
  return (
    <div className={css({
      display: "flex",
      justifyContent: "center",
      gap: 16,
      marginBottom: 16
    })}>
      {tabs.map((tab) => (
        <a
          key={tab}
          onClick={() => onChange(tab)}
          className={css({
            color: current === tab ? "primary" : "gray",
            bg: "white",
            border: "none",
            borderBottomStyle: "solid",
            borderBottomWidth: 2,
            borderBottomColor: current === tab ? "primary" : "transparent",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold",
            textDecoration: 'none',
            _hover: {
              textDecoration: 'underline',
            }
          })}
        >
          {tab}
        </a>
      ))}
    </div>
  );
}