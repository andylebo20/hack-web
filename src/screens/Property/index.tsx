import React, { useEffect, useState } from "react";
import { Api, Property } from "../../api";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../sharedComponents/LoadingSpinner";
import { StylesType } from "../../styles";
import { Colors } from "../../colors";
import moment from "moment";
import { BookProperty } from "./components/BookProperty";
import EyesIcon from "../../assets/eyeIcon.png";
import { toInteger } from "lodash";

export const PropertyScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [property, setProperty] = useState<Property | null>(null);
  const params = useParams() as any;
  const id = params["id"];

  const _fetchProperty = async () => {
    try {
      setIsLoading(true);
      const fetchedProperty = await Api.getProperty(id);
      if (fetchedProperty) {
        setProperty(fetchedProperty);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const _handleScrollToReserveForm = () => {
    const reserveFormBtn = document.getElementById("reserve_form_btn");
    if (reserveFormBtn) {
      reserveFormBtn.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      const fullNameInput = document.getElementById("full_name_input");
      if (fullNameInput) {
        fullNameInput.focus();
      }
    }, 1400);
  };

  useEffect(() => {
    _fetchProperty();
  }, [id]);

  if (isLoading || !property) {
    return (
      <div style={{ ...styles.container, paddingTop: 300 }}>
        <LoadingSpinner size={40} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.topInfo}>
        <div style={styles.leftSideOfTop}>
          <label style={styles.title}>Property details</label>
          <label style={styles.listedDaysAgo}>
            Listed {moment(property.createdAt).fromNow()}
          </label>
        </div>
        <div style={styles.rightSideOfTop}>
          <img src={EyesIcon} style={styles.eyesIcon} />
          <label style={styles.numViewsLbl}>
            {toInteger(property.numViews / 2)}
          </label>
          <button
            style={styles.reserveBtn}
            onClick={_handleScrollToReserveForm}
          >
            Reserve space
          </button>
        </div>
      </div>
      <div style={styles.innerContainer}>
        <img src={property.pictureUrl} style={styles.propertyPicture} />
        <div style={styles.rightSide}>
          <label style={styles.price}>${property.price}/day</label>
          <label style={styles.address}>{property.address}</label>
          <label style={styles.desc}>
            {property.typeOfSpace} with {property.size} square feet of available
            space.
          </label>
          <hr style={styles.hr} />
          <label style={styles.fullDescription}>{property.description}</label>
        </div>
      </div>
      <iframe
        style={styles.frame}
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB5v-UwuxB1RNaydxzbq3jMoCm1vuTcDjg
    &q=${property.address.split(" ").join("+")}`}
      ></iframe>
      <BookProperty property={property} />
    </div>
  );
};

const styles: StylesType = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
    width: "100%",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 1000,
  },
  propertyPicture: {
    width: 470,
    height: 300,
    objectFit: "cover",
    borderRadius: 8,
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 60,
    padding: 30,
    backgroundColor: Colors.white,
    borderRadius: 8,
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
    width: "50%",
    maxWidth: 500,
    minHeight: 240,
  },
  price: {
    fontSize: 24,
    fontWeight: 600,
  },
  address: {
    fontSize: 16,
    paddingTop: 8,
    color: Colors.darkGray,
  },
  desc: {
    fontSize: 16,
    paddingTop: 8,
  },
  fullDescription: {
    fontSize: 14,
    paddingTop: 16,
  },
  hr: {
    backgroundColor: Colors.lightGray,
    height: 1,
    border: "none",
    width: "100%",
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    paddingBottom: 8,
  },
  listedDaysAgo: {
    fontSize: 16,
    color: Colors.darkGray,
    paddingBottom: 30,
  },
  topInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    maxWidth: 1000,
  },
  frame: {
    borderRadius: 8,
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
    outline: "none",
    border: "none",
    height: 400,
    width: "100%",
    maxWidth: 1000,
    marginTop: 50,
  },
  leftSideOfTop: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  rightSideOfTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  reserveBtn: {
    width: 200,
    height: 45,
    borderRadius: 8,
    cursor: "pointer",
    backgroundColor: Colors.pinkishRed,
    color: Colors.white,
    fontWeight: 550,
    outline: "none",
    border: "none",
    fontSize: 16,
    marginBottom: 30,
    boxShadow: "0px 2px 12px rgba(0,0,0,0.15)",
  },
  eyesIcon: {
    width: 20,
    height: 20,
    position: "relative",
    top: 12,
  },
  numViewsLbl: {
    paddingRight: 25,
    paddingLeft: 8,
    position: "relative",
    top: 12,
    color: Colors.darkGray,
  },
};
