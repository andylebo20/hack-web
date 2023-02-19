import axios from "axios";

const IS_RUNNING_SERVER_LOCALLY = false;

const BASE_URL = IS_RUNNING_SERVER_LOCALLY
  ? "http://localhost:5900/api/users"
  : "https://hack-server.onrender.com/api/users";

export type Property = {
  _id: string;
  address: string;
  price: number;
  typeOfSpace: string;
  size: number;
  pictureUrl: string;
  description: string;
  createdAt: Date;
};

export type Booking = {
  _id: string;
  propertyId: string;
  nameOfRenter: string;
  emailOfRenter: string;
  createdAt: Date;
};

export type OwnerStats = {
  totalEarnedInLifetime: number;
  averageDaysBooked: number;
  averagePricePaid: number;
  estimatedEarningsThisYear: number;
  numBookings: number;
};

export const Api = {

  // returns array of Property objects
  getProperties: async (): Promise<Property[]> => {
    const res = await axios.get(BASE_URL + "/properties");
    return res.data;
  },
  // returns a property object
  getProperty: async (propertyId: string): Promise<Property> => {
    const res = await axios.get(BASE_URL + `/property/${propertyId}`);
    return res.data;
  },
  // returns a property object
  getOwnerStats: async (): Promise<OwnerStats> => {
    const res = await axios.get(BASE_URL + `/booking-data`);
    return res.data;
  },
  // returns a property object
  createProperty: async (
    address: string,
    price: number,
    typeOfSpace: string,
    size: number,
    pictureUrl: string,
    description: string
  ): Promise<Property> => {
    const res = await axios.post(BASE_URL + "/property", {
      address,
      price,
      typeOfSpace,
      size,
      pictureUrl,
      description,
    });
    return res.data;
  },
  // returns a property object
  getCheckoutPageUrl: async (
    propertyId: string,
    nameOfRenter: string,
    emailOfRenter: string,
    daysBooked: number
  ): Promise<string> => {
    const res = await axios.get(BASE_URL + `/checkout-url/${propertyId}`, {
      params: {
        nameOfRenter,
        emailOfRenter,
        daysBooked,
      },
    });
    return res.data;
  },
};
