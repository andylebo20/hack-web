import React, { useEffect, useState } from "react";
import { Api, OwnerStats } from "../../api";
import { StylesType } from "../../styles";
import { LoadingSpinner } from "../../sharedComponents/LoadingSpinner";
import { Colors } from "../../colors";
import _ from "lodash";

export const StatsScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<OwnerStats | null>(null);

  const _fetchStats = async () => {
    try {
      setIsLoading(true);
      const fetchedStats = await Api.getOwnerStats();
      setStats(fetchedStats);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    _fetchStats();
  }, []);

  if (isLoading || !stats) {
    return (
      <div style={{ ...styles.container, paddingTop: 300 }}>
        <LoadingSpinner size={40} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <label style={styles.title}>
          {stats.numBookings >= 2
            ? "You're on a roll!"
            : "Let's get some more bookings!"}
        </label>
        <label style={styles.earnMoreLbl}>
          To increase your earnings,{" "}
          <a href="/owner/new-store" style={{ color: Colors.pinkishRed }}>
            list another property
          </a>
        </label>
        <div style={styles.block}>
          <label style={styles.statsLbl1}>
            <span style={styles.importantNumber}>{stats.numBookings}</span>{" "}
            {stats.numBookings === 1 ? "booking" : "bookings"}
          </label>
          <label style={styles.statsLbl1}>
            <span style={styles.importantNumber}>
              ${_.round(stats.totalEarnedInLifetime, 2)}
            </span>{" "}
            earned total
          </label>
          <label style={styles.statsLbl1}>
            <span style={styles.importantNumber}>
              ${_.round(stats.averagePricePaid, 2)}
            </span>{" "}
            is how much people pay per reservation for your properties on
            average
          </label>
          <label style={styles.statsLbl1}>
            <span style={styles.importantNumber}>
              {_.round(stats.averageDaysBooked, 2)}
            </span>{" "}
            days is the average reservation time for your properties
          </label>
          <label style={styles.estEarningsThisYearLbl}>
            We estimate you'll earn $
            {_.round(stats.estimatedEarningsThisYear, 2)} this year 🎉
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
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingTop: 150,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 700,
  },
  block: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    borderRadius: 8,
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
    padding: 25,
  },
  statsLbl1: {
    fontSize: 16,
    color: Colors.darkGray,
    paddingBottom: 15,
  },
  importantNumber: {
    fontSize: 30,
    color: Colors.green,
    fontWeight: 600,
    marginRight: 3,
  },
  estEarningsThisYearLbl: {
    paddingTop: 16,
    fontWeight: 500,
    fontSize: 18,
  },
  title: {
    fontSize: 30,
    paddingBottom: 10,
    fontWeight: 600,
  },
  earnMoreLbl: {
    paddingBottom: 35,
    color: Colors.darkGray,
  },
};
