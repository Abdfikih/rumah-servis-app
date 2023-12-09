
const cart = [
  {
    _id: "653b6588541d2aa2c1e89cd1",
    userId: "6537a4448cd1bd140ebddcee",
    productId: {
      _id: "65316771f94c6496dc84f3bd",
      title: "Prima Motor",
      shop: "6530ebbcc9e72013e5b65933",
      rating: 4.5,
      ratingCount: "150",
      imageUrl: [
        "https://ik.imagekit.io/abdfikih/prima-motor.png",
        "https://ik.imagekit.io/abdfikih/prima-motor.png",
      ],
    },
    additives: ["Motorcycle", "Snow Wash"],
    instructions: "",
    totalPrice: 25.98,
    quantity: 2,
    __v: 0,
  },
  {
    _id: "653b6588541d2aa2c1e89cd1",
    userId: "6537a4448cd1bd140ebddcee",
    productId: {
      _id: "65316771f94c6496dc84f3bd",
      title: "Anugerah Motor",
      shop: "6530ebbcc9e72013e5b65933",
      rating: 5.0,
      ratingCount: "180",
      imageUrl: [
        "https://ik.imagekit.io/abdfikih/anugerah-motor.jpg",
        "https://ik.imagekit.io/abdfikih/anugerah-motor.jpg",
      ],
    },
    additives: ["Motorcycle", "Tire Repair"],
    instructions: "",
    totalPrice: 30.98,
    quantity: 2,
    __v: 0,
  },
];

const profile = {
  _id: "6537a4448cd1bd140ebddcee",
  username: "abdfikih",
  email: "abdfikih@gmail.com",
  uid: "4NmOkCbvu7ToaBS9ZR1UVpv0G1g2",
  address: [],
  userType: "Vendor",
  profile:
    "https://ik.imagekit.io/abdfikih/fikih_dp.jpg",
  updatedAt: "2023-10-24T11:02:28.215Z",
};

const choicesList = [
  {
    id: 1,
    name: "Pick Up",
    value: "pickup",
  },
  {
    id: 2,
    name: "4 Star",
    value: "4star",
  },
  {
    id: 3,
    name: "3 Star",
    value: "3star",
  },

  {
    id: 4,
    name: "Under 30 min",
    value: "under30",
  },

  {
    id: 5,
    name: "Recommended",
    value: "recommended",
  },
];

export default { shops, cart, profile, choicesList };
