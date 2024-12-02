const Joi = require("joi");
const { discriminator } = require("./models/listing");
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        discription: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.string().required().min(0).max(5),
        image: Joi.string().allow("", null)
    })
        .required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        comment: Joi.string().required(),
    }).required()
});
