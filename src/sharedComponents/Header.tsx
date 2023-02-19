import React from "react";
import { usePathname } from "../helpers";
import { StylesType } from "../styles";
import { HeaderTab } from "./HeaderTab";
import { Colors } from "../colors";
import ProfileIcon from "../assets/profileIcon.png";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";


export const HEADER_HEIGHT = 60;

export const Header = () => {
  const pathname = usePathname();

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <Link className="logo" to="/properties">
          <img style={styles.logo} alt="rently logo" src={Logo} />
        </Link>
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
      <div style={styles.profileContainer}>
        <img src={ProfileIcon} style={styles.profileIcon} />
        <label style={styles.profileText}>Andy Lebowitz</label>
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
    paddingLeft: 8,
    color: Colors.pinkishRed,
  },
  logo: {
    paddingLeft: 35,
    width: 40,
    height: 40,
  },
  leftSide: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
  },
  profileIcon: {
    width: 20,
    height: 20,
  },
  profileText: {
    paddingLeft: 10,
    color: Colors.darkGray,
    fontSize: 14,
    cursor: "pointer",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 40,
    cursor: "pointer",
  },
};
