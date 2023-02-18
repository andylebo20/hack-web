import React from "react";
import { useHistory } from "react-router-dom";
import { Colors } from "../colors";
import { StylesType } from "../styles";

type Props = {
  isSelected: boolean;
  route: string;
  title: string;
};

export const HeaderTab = ({ isSelected, route, title }: Props) => {
  const history = useHistory();

  return (
    <button
      style={{
        ...styles.container,
        ...(isSelected && {
          cursor: "auto",
          backgroundColor: Colors.superLightGray,
        }),
      }}
      onClick={() => (isSelected ? null : history.push(route))}
    >
      {title}
    </button>
  );
};

const styles: StylesType = {
  container: {
    outline: "none",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 8,
    marginLeft: 25,
    position: "relative",
    bottom: 2,
    fontSize: 14,
    fontWeight: 500
  },
};
