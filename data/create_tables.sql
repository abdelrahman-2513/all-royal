-- Table for Packages
CREATE TABLE packages_es (
  id SERIAL PRIMARY KEY,
  package_name VARCHAR(255),
  availability VARCHAR(255),
  tour_type VARCHAR(255),
  days INT,
  nights INT,
  images TEXT[],
  country TEXT,
  cities TEXT[],
  package_type TEXT
);

-- Table for nile cruises
CREATE TABLE nile_cruises_es (
  id SERIAL PRIMARY KEY,
  NileCruisesName VARCHAR(255),
  availability VARCHAR(255),
  tourType VARCHAR(255),
  days INT,
  nights INT,
  days2 INT,
  nights2 INT,
  images TEXT[],
  country TEXT,
  cities TEXT[]
);

-- Table for Itinerary
CREATE TABLE itinerary_es (
  id SERIAL PRIMARY KEY,
  day INT,
  title VARCHAR(255),
  activities TEXT,
  meals TEXT[],
  accommodation VARCHAR(255),
  package_id INT REFERENCES packages_es(id),
  optional_tour_name TEXT,
  optional_tour_price TEXT,
  optional_tour_description TEXT,
  nile_cruise_id INT REFERENCES nile_cruises_es(id)
);

-- Table for Itinerary
CREATE TABLE itinerary2_es (
  id SERIAL PRIMARY KEY,
  day INT,
  title VARCHAR(255),
  activities TEXT,
  meals TEXT[],
  accommodation VARCHAR(255),
  package_id INT REFERENCES packages_es(id),
  optional_tour_name TEXT,
  optional_tour_price TEXT,
  optional_tour_description TEXT,
  nile_cruise_id INT REFERENCES nile_cruises_es(id)
);

-- Table for Accommodation Plans
CREATE TABLE accommodation_plans_es (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  package_id INT REFERENCES packages_es(id),
  price_per_person_single_room DECIMAL,
  price_per_person_double_room DECIMAL,
  price_per_person_single_room_winter DECIMAL,
  price_per_person_double_room_winter DECIMAL,
  nile_cruise_id INT REFERENCES nile_cruises_es(id)
);

-- Table for Hotels within Accommodation Plans
CREATE TABLE hotels_es (
  id SERIAL PRIMARY KEY,
  location VARCHAR(255),
  options TEXT[],
  accommodation_plan_id INT REFERENCES accommodation_plans_es(id),
  stars DECIMAL,
  name TEXT
);

-- Table for Inclusions
CREATE TABLE inclusions_es (
  id SERIAL PRIMARY KEY,
  description TEXT,
  package_id INT REFERENCES packages_es(id),
  nile_cruise_id INT REFERENCES nile_cruises_es(id)
);

-- Table for Exclusions
CREATE TABLE exclusions_es (
  id SERIAL PRIMARY KEY,
  description TEXT,
  package_id INT REFERENCES packages_es(id),
  nile_cruise_id INT REFERENCES nile_cruises_es(id)
);