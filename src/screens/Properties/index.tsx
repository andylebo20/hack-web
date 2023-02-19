import { Link } from "react-router-dom";
import { Api, Property } from "../../api";
import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../../sharedComponents/LoadingSpinner";
import { StylesType } from "../../styles";
import { Colors } from "../../colors";
import { showGenericErrorAlert } from "../../helpers";

export const PropertiesScreen = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
  const [propertiesList, setPropertiesList] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [minPrice, setMinPrice] = useState<string>();
  const [maxPrice, setMaxPrice] = useState<string>();

  const fetchProperies = async () => {
      try {
        setIsLoading(true);
        const fetchedProperties = await Api.getProperties();
        if (fetchedProperties) {
          setFilteredProperties(fetchedProperties);
          setPropertiesList(fetchedProperties);
          setError(null);
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    };

  useEffect(() => {
    fetchProperies();
  }, []);

  if (isLoading || !propertiesList) {
    return (
      <div style={{ ...styles.container, paddingTop: 70 }}>
        <LoadingSpinner size={20} />
      </div>
    );
  }

  const _handleFilter = async () => {
    try {
      const intMinPrice = Number(minPrice);
      const intMaxPrice = Number(maxPrice);
      if (intMinPrice || intMaxPrice) {
        const tempFilteredProperties = propertiesList.filter(property => {
          if (intMinPrice && property.price <= intMinPrice){
            return false;
          }
          if (intMaxPrice && property.price >= intMaxPrice){
            return false;
          }
          return true;
        });
        setFilteredProperties(tempFilteredProperties);

        console.log("propertiesList", propertiesList)
        console.log("tempFilteredProperties", tempFilteredProperties)
      }
    } catch (e) {
      showGenericErrorAlert(e);
    }
  };

  return (
    <div>
      <h2 style={styles.title}> Properties</h2>
      <div style={styles.container}>
        <input
          value={minPrice}
          placeholder="Price Min"
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          value={maxPrice}
          placeholder="Price Max"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button
            style={styles.filterBtn}
            onClick={_handleFilter}
        >
        Filter
        </button>
      </div>
      <div style={styles.container}>
        {filteredProperties.map((property) => (
          <div style={styles.innerContainer}>
            <div style={styles.propertyCard}>
              <Link to={`/property/${property._id}`}>
                <img
                  alt="property image"
                  src={property.pictureUrl}
                  style={styles.propertyPicture}
                />
              </Link>
              <div>
                <h3 style={styles.address}>{property.address}</h3>
                <h3 style={styles.size}>{property.size} sqft</h3>
                <h3 style={styles.price}>${property.price}/hr</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: StylesType = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
    width: "100%",
  },
  innerContainer: {
    // display: "grid",
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 1000,
    marginLeft: 60,
    padding: 30,
  },
  propertyCard: {
    display: "inline-block",
    alignItems: "center",
    width: 120,
  },
  propertyPicture: {
    width: 260,
    height: 260,
    objectFit: "cover",
    borderRadius: 8,
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
  },
  price: {
    fontSize: 16,
    fontWeight: 600,
  },
  address: {
    fontSize: 16,
    paddingTop: 8,
    color: Colors.darkGray,
  },
  desc: {
    display: "block",
  },
  hr: {
    backgroundColor: Colors.lightGray,
    height: 1,
    border: "none",
    width: "100%",
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 600,
    paddingBottom: 8,
  },
  listedDaysAgo: {
    fontSize: 16,
    color: Colors.darkGray,
    paddingBottom: 40,
  },
  topInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 1000,
  },
};
