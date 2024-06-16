const flattenObject = (obj, parent = '', res = {}) => {
    for (let key in obj) {
      let propName = parent ? parent + '.' + key : key;
      if (typeof obj[key] == 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
    return res;
  };
  
  export default flattenObject;