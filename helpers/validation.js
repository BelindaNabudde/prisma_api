const validateData = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      console.log(error);
      // res.status(500).json({error:error.message})
    } else {
      next();
    }
  };
};

module.exports = validateData;
