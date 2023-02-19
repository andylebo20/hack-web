import { Link, useHistory } from "react-router-dom";
import { Api, Property } from "../../api";
import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../../sharedComponents/LoadingSpinner";
import { StylesType } from "../../styles";
import { Colors } from "../../colors";
import { showGenericErrorAlert } from "../../helpers";
import { PropertyCard } from "./components/Property";

export const PropertiesScreen = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [propertiesList, setPropertiesList] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [minPrice, setMinPrice] = useState<string>();
  const [maxPrice, setMaxPrice] = useState<string>();
  const [minSize, setMinSize] = useState<string>();
  const [maxSize, setMaxSize] = useState<string>();
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const fetchedProperties = await Api.getProperties();
      if (fetchedProperties) {
        setFilteredProperties(fetchedProperties);
        setPropertiesList(fetchedProperties);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (isLoading || !propertiesList) {
    return (
      <div style={{ ...styles.container, paddingTop: 300 }}>
        <LoadingSpinner size={40} />
      </div>
    );
  }

  const _handleFilter = () => {
    try {
      const intMinPrice = Number(minPrice);
      const intMaxPrice = Number(maxPrice);
      const intMinSize = Number(minSize);
      const intMaxSize = Number(maxSize);
      if (intMinPrice || intMaxPrice || intMinSize || intMaxSize) {
        const tempFilteredProperties = propertiesList.filter((property) => {
          if (intMinPrice && property.price <= intMinPrice) {
            return false;
          }
          if (intMaxPrice && property.price >= intMaxPrice) {
            return false;
          }
          if (intMinSize && property.size <= intMinSize) {
            return false;
          }
          if (intMaxSize && property.size >= intMaxSize) {
            return false;
          }
          return true;
        });
        setFilteredProperties(tempFilteredProperties);
        setIsFilterApplied(true);
      }
    } catch (e) {
      showGenericErrorAlert(e);
    }
  };

  const _removeFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinSize("");
    setMaxSize("");
    setFilteredProperties(propertiesList);
    setIsFilterApplied(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <label style={styles.mainTitle}>
          {isFilterApplied
            ? `Showing ${filteredProperties.length} ${
                filteredProperties.length === 1 ? "property" : "properties"
              }`
            : "Showing all properties"}
        </label>
        <div style={styles.filterContainer}>
          <input
            value={minPrice}
            placeholder="Price min"
            onChange={(e) => setMinPrice(e.target.value)}
            style={styles.filterInput}
          />
          <input
            value={maxPrice}
            placeholder="Price max"
            onChange={(e) => setMaxPrice(e.target.value)}
            style={styles.filterInput}
          />
          <input
            value={minSize}
            placeholder="Sq ft min"
            onChange={(e) => setMinSize(e.target.value)}
            style={styles.filterInput}
          />
          <input
            value={maxSize}
            placeholder="Sq ft max"
            onChange={(e) => setMaxSize(e.target.value)}
            style={styles.filterInput}
          />
          <button style={styles.filterBtn} onClick={_handleFilter}>
            Apply filter
          </button>
          {isFilterApplied ? (
            <button
              style={{ ...styles.filterBtn, marginLeft: 10 }}
              onClick={_removeFilter}
            >
              Remove filter
            </button>
          ) : null}
        </div>
        <div style={styles.properties}>
          {filteredProperties.length ? (
            filteredProperties.map((property) => (
              <PropertyCard property={property} />
            ))
          ) : (
            <label style={styles.noResults}>
              No properties match this filter.
            </label>
          )}
        </div>
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
    width: "100%",
    paddingBottom: 70,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    maxWidth: 800,
    height: 30,
    paddingBottom: 20,
  },
  properties: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  innerContainer: {
    // display: "grid",
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 800,
    marginLeft: 60,
    padding: 30,
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
  filterInput: {
    outline: "none",
    border: "none",
    backgroundColor: Colors.superLightGray,
    borderRadius: 8,
    paddingLeft: 8,
    width: 80,
    marginRight: 16,
    height: "100%",
  },
  filterBtn: {
    outline: "none",
    cursor: "pointer",
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.black,
    height: "100%",
    paddingLeft: 12,
    paddingRight: 12,
  },
  mainTitle: {
    paddingBottom: 34,
    fontSize: 40,
    fontWeight: 600,
    paddingTop: 50,
  },
  noResults: {
    fontSize: 16,
    color: Colors.darkGray,
    paddingTop: 20,
  },
};
