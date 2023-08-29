export const orderValidator = (obj) => {
    return obj.hasOwnProperty('_id') && typeof obj._id === 'number';
  };