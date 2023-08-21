export const prnValidator = (obj) => {
    return obj.hasOwnProperty('prnId') && typeof obj.prnId === 'number';
  };