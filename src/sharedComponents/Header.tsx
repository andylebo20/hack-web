import React from "react";
import { usePathname } from "../helpers";
import { StylesType } from "../styles";
import { HeaderTab } from "./HeaderTab";
import { Colors } from "../colors";

export const HEADER_HEIGHT = 60;

export const Header = () => {
  const pathname = usePathname();

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <label style={styles.websiteTitle}>Rently</label>
        <HeaderTab
          title="Properties"
          isSelected={pathname === "/properties"}
          route="/properties"
        />
        <HeaderTab
          title="My earnings"
          isSelected={pathname === "/owner/stats"}
          route="/owner/stats"
        />
        <HeaderTab
          title="Create listing"
          isSelected={pathname === "/owner/new-store"}
          route="/owner/new-store"
        />
      </div>
    </div>
  );
};

const styles: StylesType = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: HEADER_HEIGHT,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0,
    borderBottomStyle: "solid",
    backgroundColor: Colors.white,
    zIndex: 50,
    boxShadow: "0px 2px 5px rgba(50,50,50,0.1)",
  },
  websiteTitle: {
    fontSize: 24,
    fontWeight: 600,
    paddingRight: 25,
    paddingLeft: 35,
  },
  leftSide: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
  },
};
