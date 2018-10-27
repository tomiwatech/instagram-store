import Joi from "joi";

const firstname = Joi.string()
    .min(1)
    .required();
const lastname = Joi.string()
    .min(1)
    .required();
const gender = Joi.string()
    .min(1)
    .required();
const date_of_birth = Joi.string()
    .min(1)
    .required();
const phone_number = Joi.string()
    .min(1)
    .required();
const image_url = Joi.string()
    .min(1)
    .required();
const password = Joi.string()
    .min(1)
    .required();
const newpassword = Joi.string()
    .min(1)
    .required();
const oauth_type = Joi.string()
    .min(1)
    .required();
const oauth_id = Joi.string()
    .min(1)
    .required();
const state_code = Joi.string()
    .min(1)
    .required();
const city_code = Joi.string()
    .min(1)
    .required();
const country_code = Joi.string()
    .min(1)
    .required();
const address = Joi.string()
    .min(1)
    .required();
const email = Joi.string()
    .min(1)
    .required();
const token = Joi.string()
    .min(1)
    .required();

const signupSchema = {
    firstname,
    lastname,
    gender,
    date_of_birth,
    phone_number,
    image_url,
    password,
    oauth_type,
    oauth_id,
    state_code,
    city_code,
    country_code,
    address,
    email
};

const emailVerificationSchema = {
    email
};

const changePasswordSchema = {
    newpassword,
    token
};

const loginSchema = {
    email,
    password
};

export {
    emailVerificationSchema,
    signupSchema,
    changePasswordSchema,
    loginSchema
};
