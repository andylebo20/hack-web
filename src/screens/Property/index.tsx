import React, { useEffect, useState } from "react";
import { Api, Property } from "../../api";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../sharedComponents/LoadingSpinner";
import { StylesType } from "../../styles";
import { Colors } from "../../colors";

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
        <img src={property.pictureUrl} style={styles.propertyPicture} />
        <div style={styles.rightSide}>
          <label style={styles.price}>${property.price}/hr</label>
          <label style={styles.address}>{property.address}</label>
          <label style={styles.desc}>
            {property.typeOfSpace} with {property.size} square feet of available
            space.
          </label>
        </div>
      </div>
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
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  propertyPicture: {
    width: 300,
    height: 180,
    objectFit: "cover",
    borderRadius: 8,
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
};
