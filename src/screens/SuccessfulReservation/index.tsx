import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { StylesType } from "../../styles";
import { Api, Property } from "../../api";
import { Colors } from "../../colors";
import { LoadingSpinner } from "../../sharedComponents/LoadingSpinner";

export const SuccessfulReservationScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [property, setProperty] = useState<Property | null>(null);
  const params = useParams() as any;
  const id = params["id"];
  const history = useHistory();

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

  const _viewMoreProperties = () => history.push("/properties");

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
      <div style={styles.innerContainer}>
        <label style={styles.title}>Reserved! 🎉 🥳</label>
        <label style={styles.desc}>
          You've successfully reserved the property at {property?.address}
        </label>
        <button style={styles.viewMoreBtn} onClick={_viewMoreProperties}>
          Keep viewing properties
        </button>
      </div>
    </div>
  );
};

const styles: StylesType = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 200,
    width: "100%",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 800,
  },
  title: {
    fontSize: 36,
    fontWeight: 600,
    paddingBottom: 10,
  },
  desc: {
    fontSize: 16,
    color: Colors.darkGray,
    paddingBottom: 10,
  },
  viewMoreBtn: {
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: Colors.pinkishRed,
    textDecoration: "underline",
    cursor: "pointer",
    borderRadius: 8,
    fontSize: 16,
    height: 40,
    width: 250,
    textAlign: "left",
    position: "relative",
    right: 5,
    marginTop: 20,
  },
};
