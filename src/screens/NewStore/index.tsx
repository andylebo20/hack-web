import React, { useState } from "react";
import { StylesType } from "../../styles";
import { Colors } from "../../colors";
import { showGenericErrorAlert } from "../../helpers";
import { Api } from "../../api";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export const NewStoreScreen = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [typeOfSpace, setTypeOfSpace] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const _createListing = async () => {
    try {
      setIsLoading(true);
      if (
        !address ||
        !price ||
        !typeOfSpace ||
        !size ||
        !pictureUrl ||
        !hours ||
        isNaN(Number(size)) ||
        isNaN(Number(price))
      ) {
        throw new Error("Please fill in all the details.");
      }
      await Api.createProperty(
        address,
        Number(price),
        typeOfSpace,
        Number(size),
        pictureUrl,
        description
      );
      await Swal.fire({
        title: "Your property has been listed!",
        text: "If you own additional properties, we recommend you list those too to increase your potential income.",
        icon: "success",
      });
      history.push("/properties");
    } catch (e) {
      showGenericErrorAlert(e);
    }
    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <label style={styles.createNewListing}>Create new listing</label>
        <label style={styles.desc}>
          Listing your property is a great way to earn more income!
        </label>
        <div style={styles.formContainer}>
          <label style={styles.inputTitle}>Address of property</label>
          <input
            style={styles.input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="445 5th Ave, New York, NY 10001"
          />
          <label style={styles.inputTitle}>Price per day of rental (USD)</label>
          <input
            style={styles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="200"
          />
          <label style={styles.inputTitle}>Type of space</label>
          <input
            style={styles.input}
            value={typeOfSpace}
            onChange={(e) => setTypeOfSpace(e.target.value)}
            placeholder="Coffee shop"
          />
          <label style={styles.inputTitle}>Size (square feet)</label>
          <input
            style={styles.input}
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="1800"
          />
          <label style={styles.inputTitle}>
            Picture URL of the inside of your store
          </label>
          <input
            style={styles.input}
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            placeholder="find a picture on yelp!"
          />
          <label style={styles.inputTitle}>Description</label>
          <textarea
            style={styles.textAreaInput}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            style={{
              ...styles.createListingBtn,
              ...(isLoading && { opacity: 0.3, cursor: "auto" }),
            }}
            onClick={_createListing}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Create listing"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: StylesType = {
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingTop: 70,
    paddingBottom: 80,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 600,
  },
  createNewListing: {
    fontSize: 30,
    fontWeight: 600,
    paddingBottom: 6,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 24,
    backgroundColor: Colors.white,
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
    borderRadius: 8,
    width: "100%",
  },
  textAreaInput: {
    resize: "none",
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    paddingLeft: 7,
    outline: "none",
    height: 100,
    width: "98%",
    marginBottom: 25,
    fontFamily: "Arial",
  },
  input: {
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    paddingLeft: 7,
    outline: "none",
    paddingTop: 8,
    paddingBottom: 8,
    width: "98%",
    marginBottom: 25,
  },
  inputTitle: {
    fontSize: 16,
    paddingBottom: 10,
  },
  createListingBtn: {
    width: 200,
    height: 40,
    borderRadius: 8,
    cursor: "pointer",
    backgroundColor: Colors.pinkishRed,
    color: Colors.white,
    fontWeight: 600,
    outline: "none",
    border: "none",
    fontSize: 16,
  },
  desc: {
    fontSize: 15,
    color: Colors.darkGray,
    paddingBottom: 30,
  },
};
