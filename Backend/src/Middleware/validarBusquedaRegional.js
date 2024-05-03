
const searchValidation = (req, res, next) => {
    const searchTerm = req.query.search ? req.query.search.toLowerCase() : '';
  
    if (searchTerm.trim() !== '') {
      const filteredData = data.filter(item =>
        item.toLowerCase().includes(searchTerm)
      );
      req.filteredData = filteredData;
    } else {
      req.filteredData = data;
    }
  
    next();
  };