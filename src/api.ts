import axios from "axios";

const BASE_URL = "https://hack-server.onrender.com/api/users";

// -- Property -- //
/*
_id: string;
address: string;
price: number;
typeOfSpace: string;
size: number;
pictureUrl: string;
createdAt: Date;
*/

// -- Booking -- //
/*
_id: string;
propertyId: string;
nameOfRenter: string;
emailOfRenter: string;
createdAt: Date;
*/

const HARD_CODED_PROPERTIES = [
  {
    _id: "abc",
    address: "32845 Wintergreen Dr, New York, NY, 10001",
    price: 200,
    typeOfSpace: "Coffee shop",
    size: 2000,
    pictureUrl:
      "https://perfectdailygrind.com/wp-content/uploads/2019/03/interior-of-a-coffee-shop.jpg",
    createdAt: new Date(),
  },
  {
    _id: "def",
    address: "445 5th Ave, New York, NY, 10001",
    price: 149,
    typeOfSpace: "Coffee shop",
    size: 3000,
    pictureUrl:
      "https://www.eatthis.com/wp-content/uploads/sites/4/2019/12/groundwork-los-angeles-coffee-shops.jpg?quality=82&strip=1&w=1250",
    createdAt: new Date(),
  },
  {
    _id: "ghi",
    address: "711 8th Ave, New York, NY, 10001",
    price: 280,
    typeOfSpace: "Cocktail bar",
    size: 1580,
    pictureUrl:
      "https://robbreport.com/wp-content/uploads/2022/09/Shinjis-Interior.jpg?w=1000",
    createdAt: new Date(),
  },
];

export const Api = {
  // returns array of Property objects
  getProperties: async () => {
    // const res = await axios.get(BASE_URL + "/properties");
    // return res.data;
    return HARD_CODED_PROPERTIES;
  },
  // returns a booking object
  createBooking: async (
    propertyId: string,
    nameOfRenter: string,
    emailOfRenter: string
  ) => {
    const res = await axios.post(BASE_URL + "/book", {
      propertyId,
      nameOfRenter,
      emailOfRenter,
    });
    return res.data;
  },
  // returns a property object
  createProperty: async (
    address: string,
    price: number,
    typeOfSpace: string,
    size: number,
    pictureUrl: string
  ) => {
    const res = await axios.post(BASE_URL + "/property", {
      address,
      price,
      typeOfSpace,
      size,
      pictureUrl,
    });
    return res.data;
  },
};
