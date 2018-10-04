
-- CREATE USERS TABLE

CREATE TABLE users
(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstname VARCHAR (50) NOT NULL,
    lastname VARCHAR (50) NOT NULL,
    gender VARCHAR (50) NOT NULL,
    date_of_birth VARCHAR (50) NOT NULL,
    email VARCHAR (50) UNIQUE NOT NULL,
    phone_number VARCHAR (50) NOT NULL,
    image_url VARCHAR (355) NOT NULL,
    password VARCHAR (355) NOT NULL,
    salt VARCHAR (355) NOT NULL,
    oauth_type VARCHAR (355) NOT NULL,
    oauth_id VARCHAR (355) NOT NULL,
    address VARCHAR (355) NOT NULL,
    state_code VARCHAR (55) NOT NULL,
    city_code VARCHAR (55) NOT NULL,
    country_code VARCHAR (55) NOT NULL,
    updated_at VARCHAR (55) NOT NULL,
    added_at VARCHAR (55) NOT NULL,
    active BOOLEAN NOT NULL,
    suspended_at VARCHAR (55) NOT NULL
);

-- INSERT INTO TABLE

INSERT INTO 
       users
    (firstname, lastname, gender, date_of_birth, email , phone_number, image_url,password,salt, oauth_type,oauth_id,address,state_code,city_code,country_code,updated_at,added_at,active,suspended_at)
VALUES
    ('Michael', 'Sanni', 'male', '1996/7/5', 'sannimichaelse@gmail.com', '09090908094', 'jfjtfdd', 'kd4dk3dk', 'dg4dddf', 'signup', '1232', '13,hughes Avenue Sabo', '12ase', 'jdj33', 'j4jdd', '454e34', '34dr34', 'true', 'jjd34');


-- {
--   "firstname":"Sanni",
--   "lastname":"Michael",
--   "gender":"male",
--   "date_of_birth":"07/05/1996",
--   "phone_number":"09090908094",
--   "image_url":"https://web.whatsapp.com/",
--   "password":"tomiwa5259",
--   "oauth_type":"signup",
--   "oauth_id":"223",
--   "state_code":"3333",
--   "city_code":"idfg453",
--   "country_code":"kdk4",
--   "address":"13 Hughes Avenue Sabo Yaba",
--   "email":"sannimichaeltomi@gmail.com",
--   "fullname":"Sanni Michael Tomiwa"
-- }