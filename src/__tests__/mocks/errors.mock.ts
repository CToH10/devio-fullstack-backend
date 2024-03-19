export default {
  notFound: {
    order: { error: { message: 'User not found' }, status: 404 },
  },
  invalid: {
    status: { error: { message: 'Invalid status', status: 400 } },
    product: {
      error: { message: 'Invalid product id, must be uuid', status: 400 },
    },
    client: {
      error: { message: 'Invalid client name, must be string', status: 400 },
    },
  },
};
