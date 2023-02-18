import React, { useEffect, useState } from "react";
import { Api, Property } from "../../api";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../sharedComponents/LoadingSpinner";
import { StylesType } from "../../styles";

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
      <div style={{ ...styles.container, paddingTop: 70 }}>
        <LoadingSpinner size={20} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <label>Property price: {property.price}</label>
    </div>
  );
};

const styles: StylesType = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
};
