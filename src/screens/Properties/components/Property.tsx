import React, { useState } from "react";
import { Property } from "../../../api";
import { useHistory } from "react-router-dom";
import { StylesType } from "../../../styles";
import { Colors } from "../../../colors";

type Props = {
  property: Property;
};

export const PropertyCard = ({ property }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const history = useHistory();

  return (
    <button
      style={{
        ...styles.propertyCard,
        ...(isHovering && { transform: "scale(1.03)" }),
      }}
      onClick={() => history.push(`/property/${property._id}`)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        alt="property image"
        src={property.pictureUrl}
        style={styles.propertyPicture}
      />
      <div style={styles.rightSide}>
        <label style={styles.address}>{property.address}</label>
        <label style={styles.size}>
          {property.typeOfSpace} with {property.size} square feet of available
          space
        </label>
        <label style={styles.price}>${property.price}/day</label>
      </div>
    </button>
  );
};

const styles: StylesType = {
  propertyCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    cursor: "pointer",
    outline: "none",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.superLightGray,
    backgroundColor: Colors.white,
    marginBottom: 25,
    borderRadius: 8,
    transition: "all 0.2s ease-out",
  },
  propertyPicture: {
    width: 400,
    height: 200,
    objectFit: "cover",
    borderRadius: 8,
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
    cursor: "pointer",
  },
  price: {
    fontSize: 28,
    fontWeight: 600,
    paddingTop: 90,
    color: Colors.black,
    cursor: "pointer",
  },
  address: {
    fontSize: 18,
    paddingTop: 8,
    color: Colors.darkGray,
    cursor: "pointer",
  },
  desc: {
    display: "block",
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 40,
    height: "100%",
    cursor: "pointer",
  },
  size: {
    fontSize: 16,
    paddingTop: 8,
    cursor: "pointer",
  },
};
