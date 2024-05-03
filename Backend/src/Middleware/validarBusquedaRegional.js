
const searchValidation = (req, res, next) => {
    const searchTerm = req.query.search ? req.query.search.toLowerCase() : '';
  
    if (searchTerm.trim() !== '') {
        const filteredData = data.filter(item =>
            item.country.toLowerCase() === searchTerm
        );
        req.filteredData = filteredData;
    } else {
        req.filteredData = data;
    }
  
    next();
};
