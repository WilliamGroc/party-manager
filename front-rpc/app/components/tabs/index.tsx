import { Link } from "@remix-run/react";
import { css } from "styled-system/css";

type Props = {
  tabs: { name: string, path: string, index: string }[];
  current: string,
}

export function Tabs({ tabs, current }: Props) {
  return (
    <div className={css({
      display: "flex",
      justifyContent: "center",
      gap: 16,
      marginBottom: 16
    })}>
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          to={tab.path}
          className={css({
            color: current === tab.index ? "primary" : "gray",
            bg: "white",
            border: "none",
            borderBottomStyle: "solid",
            borderBottomWidth: 2,
            borderBottomColor: current === tab.index ? "primary" : "transparent",
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
          {tab.name}
        </Link>
      ))}
    </div>
  );
}