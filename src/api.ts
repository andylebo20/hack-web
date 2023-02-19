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
  createProperty: async (
    address: string,
    price: number,
    typeOfSpace: string,
    size: number,
    pictureUrl: string
  ): Promise<Property> => {
    const res = await axios.post(BASE_URL + "/property", {
      address,
      price,
      typeOfSpace,
      size,
      pictureUrl,
    });
    return res.data;
  },
  // returns a property object
  getCheckoutPageUrl: async (
    propertyId: string,
    nameOfRenter: string,
    emailOfRenter: string
  ): Promise<string> => {
    const res = await axios.get(BASE_URL + `/checkout-url/${propertyId}`, {
      params: {
        nameOfRenter,
        emailOfRenter,
      },
    });
    return res.data;
  },
};
