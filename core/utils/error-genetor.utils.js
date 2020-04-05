module.exports = (title, errorArray = []) => {
    
    const error = new Error(title);
    error.detail  = errorArray;
    throw error;

}