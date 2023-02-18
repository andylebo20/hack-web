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
        ...(isSelected
          ? {
              cursor: "auto",
              fontWeight: 800,
              borderBottomColor: Colors.pinkishRed,
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
            }
          : {
              borderBottomWidth: 0,
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
    height: "100%",
    marginLeft: 25,
    fontSize: 14,
    fontWeight: 500,
  },
};
