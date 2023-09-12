export const sortByDate=(data, order)=> {
    return data.sort((a, b) => {
        const dateA = new Date(a.tmOpen);
        const dateB = new Date(b.tmOpen);

        if (order === 'ASC') {
            return dateA - dateB;
        } else if (order === 'DESC') {
            return dateB - dateA;
        } else {
            throw new Error('Invalid sort order. Please use "ASC" or "DESC".');
        }
    });
}
export const findMaxId = (documents)=> {
    let maxId = null;
  
    documents.forEach((doc) => {
      const docId = doc._id;
      if (!maxId || docId > maxId) {
        maxId = docId;
      }
    });
  
    return maxId;
  }