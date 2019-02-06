CREATE TABLE users
(
  id SERIAL,
  name VARCHAR(30) NOT NULL,
  avatar TEXT NOT NULL,
);

CREATE TABLE adventures
(
  id SERIAL,
  name VARCHAR(50) NOT NULL
)

CREATE TABLE reviews
(
  id SERIAL,
  adventure_id INT NOT NULL REFERENCES adventures(id),
  poster_id INT NOT NULL REFERENCES users(id),
  review_text TEXT NOT NULL,
  stars INT NOT NULL,
  thumbs_up INT,
  thumbs_down INT
);
