import React, { useState } from "react";
import { Api, Property } from "../../../api";
import Swal from "sweetalert2";
import { showGenericErrorAlert } from "../../../helpers";
import { StylesType } from "../../../styles";
import { Colors } from "../../../colors";
import { useHistory } from "react-router-dom";

type Props = {
  property: Property;
};

export const BookProperty = ({ property }: Props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const _handleBookProperty = async () => {
    try {
      setIsLoading(true);
      if (!name || !email) {
        throw new Error("Please fill in all the details.");
      }
      await Api.createBooking(property._id, name, email);
      await Swal.fire({
        title: "Booked!",
        text: "We've successfully reserved the space for you.",
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
      <label style={styles.interestedLbl}>Are you interested?</label>
      <label style={styles.reserveDesc}>
        Enter some more details about yourself to reserve this space now.
      </label>
      <div style={styles.innerContainer}>
        <label style={styles.inputTitle}>Full name</label>
        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label style={styles.inputTitle}>Email</label>
        <input
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          style={{
            ...styles.bookBtn,
            ...(isLoading && { opacity: 0.3, cursor: "auto" }),
          }}
          disabled={isLoading}
          onClick={_handleBookProperty}
        >
          {isLoading ? "Reserving..." : "Reserve"}
        </button>
      </div>
    </div>
  );
};

const styles: StylesType = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 60,
    width: "100%",
    maxWidth: 1000,
  },
  interestedLbl: {
    fontSize: 24,
    fontWeight: 600,
    paddingBottom: 6,
  },
  reserveDesc: {
    fontSize: 16,
    color: Colors.darkGray,
    paddingBottom: 30,
  },
  inputTitle: {
    fontSize: 16,
    paddingBottom: 10,
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
    width: 250,
    marginBottom: 25,
  },
  bookBtn: {
    width: 150,
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
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    //padding: 20,
    backgroundColor: Colors.white,
    //boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
    borderRadius: 8,
  },
};
