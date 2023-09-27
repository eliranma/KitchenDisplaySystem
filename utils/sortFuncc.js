export const sortByDate=(data, order)=> {
    return data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (order === 'ASC') {
            return dateA - dateB;
        } else if (order === 'DESC') {
            return dateB - dateA;
        } else {
            throw new Error('Invalid sort order. Please use "ASC" or "DESC".');
        }
    });
}

export const sortByMongoId = (data)=>{
    let tmp = [...data]
    // tmp.sort((a, b) => {
    //     const timestampA = parseInt(a._id.substring(0, 8), 16);
    //     const timestampB = parseInt(b._id.substring(0, 8), 16);
    //     return timestampA - timestampB;
    //   });
      return tmp
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