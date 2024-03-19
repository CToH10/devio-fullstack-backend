export default {
  orderComplete: {
    products_id: ['string', 'string2'],
    client: 'Josevaldo',
  },
  orderWithoutClient: {
    products_id: ['string', 'string2'],
  },
  orderWithoutProducts: {
    client: 'Josevaldo',
  },
  orderInvalidProducts: {
    products_id: 123546,
    client: 'Josevaldo',
  },
  orderInvalidClient: {
    products_id: ['string', 'string2'],
    client: 123456,
  },
};
