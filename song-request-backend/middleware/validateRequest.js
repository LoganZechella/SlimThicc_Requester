const Joi = require('joi');

const songRequestSchema = Joi.object({
  songTitle: Joi.string().required(),
  artistName: Joi.string().required(),
});

const validateRequest = (req, res, next) => {
  const { error } = songRequestSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  next();
};

module.exports = validateRequest; 