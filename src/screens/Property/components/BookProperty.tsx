import React, { useRef, useState } from "react";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [daysBooked, setDaysBooked] = useState<number>(1);
  const [isDetailsInputVisible, setIsDetailsInputVisible] =
    useState<boolean>(true);
  const finishBookingBtnRef = useRef(null);

  const _handleBookProperty = async () => {
    try {
      setIsLoading(true);
      if (!name || !email) {
        throw new Error("Please fill in all the details.");
      }
      if (!email.includes("@") || !email.includes(".")) {
        throw new Error("Please enter a valid email.");
      }
      const url = await Api.getCheckoutPageUrl(
        property._id,
        name,
        email,
        daysBooked
      );
      window.location.href = url;
    } catch (e) {
      showGenericErrorAlert(e);
      setIsLoading(false);
    }
  };

  const _handleOpenReserveDetails = () => {
    setIsDetailsInputVisible(true);
    if (finishBookingBtnRef?.current) {
      (finishBookingBtnRef.current as any).scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <hr style={styles.hr} />
      <div style={styles.container}>
        <label style={styles.interestedLbl}>
          {isDetailsInputVisible ? "Let's book it" : "Are you interested?"}
        </label>
        <label style={styles.reserveDesc}>
          {isDetailsInputVisible
            ? "Once booked, your reservation will begin tomorrow."
            : "Reserve the space before it gets taken."}
        </label>
        {isDetailsInputVisible ? (
          <div style={styles.innerContainer}>
            <label style={styles.inputTitle}>Full name</label>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="full_name_input"
            />
            <label style={styles.inputTitle}>Email</label>
            <input
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label style={styles.inputTitle}>Number of days to reserve</label>
            <input
              style={styles.input}
              value={daysBooked}
              onChange={(e) => setDaysBooked(Number(e.target.value))}
              type="number"
            />
            <button
              style={{
                ...styles.bookBtn,
                ...(isLoading && { opacity: 0.3, cursor: "auto" }),
              }}
              disabled={isLoading}
              onClick={_handleBookProperty}
              ref={finishBookingBtnRef}
              id="reserve_form_btn"
            >
              {isLoading ? "Please wait..." : "Pay and reserve"}
            </button>
          </div>
        ) : (
          <button
            style={styles.openDetailsBtn}
            onClick={_handleOpenReserveDetails}
          >
            Reserve now
          </button>
        )}
      </div>
    </>
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
    maxWidth: 500,
    paddingBottom: 200,
  },
  interestedLbl: {
    fontSize: 24,
    fontWeight: 600,
    paddingBottom: 6,
  },
  reserveDesc: {
    fontSize: 16,
    color: Colors.darkGray,
    paddingBottom: 20,
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
    width: "97%",
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
    padding: 20,
    //boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
    borderRadius: 8,
    width: "100%",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
  },
  openDetailsBtn: {
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
  hr: {
    backgroundColor: Colors.superLightGray,
    height: 1,
    border: "none",
    width: "80%",
    marginTop: 80,
  },
};
