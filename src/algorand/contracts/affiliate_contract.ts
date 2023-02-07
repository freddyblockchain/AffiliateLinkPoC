export const affiliate_contract = {
  name: "MyApp",
  methods: [
    {
      name: "signup",
      args: [
        {
          type: "address",
          name: "user",
        },
        {
          type: "address",
          name: "affiliate",
        },
      ],
      returns: {
        type: "void",
      },
    },
    {
      name: "affiliate_transaction",
      args: [
        {
          type: "pay",
          name: "payment",
        },
        {
          type: "account",
          name: "affiliate",
        },
        {
          type: "account",
          name: "platformAccount",
        },
      ],
      returns: {
        type: "void",
      },
    },
  ],
  networks: {},
};
