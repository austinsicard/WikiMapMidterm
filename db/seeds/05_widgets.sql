-- Widgets table seeds here (Example)
INSERT INTO widgets (name, user_id) VALUES ('Sprockets', 1);
INSERT INTO widgets (name, user_id) VALUES ('Chains', 2);
INSERT INTO widgets (name, user_id) VALUES ('Bearings', 2);


INSERT INTO maps (user_id, title, description, photo_url, city, lat, long)
VALUES (1, 'Downtown Montreal', 'This is a description', 'https://image.shutterstock.com/image-photo/french-onion-gratin-soup-260nw-104052002.jpg', 'Montreal', 53.13, 57.6),
(2, 'Downtown Toronto', 'This is a description', 'https://image.shutterstock.com/image-photo/two-fresh-submarine-sandwiches-ham-260nw-497930494.jpg', 'Toronto', 53.13, 57.6),
(3, 'Downtown Halifax', 'This is a description', 'https://image.shutterstock.com/image-photo/dark-chocolate-stack-chips-powder-260nw-230301934.jpg', 'Halifax', 53.13, 57.6);

INSERT INTO points (map_id, user_id, title, description, photo_url, lat, long)
VALUES (1, 1, 'Soup Palace', 'The best French Onion Soup!!', 'https://image.shutterstock.com/image-photo/french-onion-gratin-soup-260nw-104052002.jpg', 53.13, 57.6),
(2, 2, 'Sandwich Palace', 'The best Sandwich Ever!!', 'https://image.shutterstock.com/image-photo/two-fresh-submarine-sandwiches-ham-260nw-497930494.jpg', 53.13, 57.6),
(3, 3, 'Chocloate Palace', 'The best Chocolate!!', 'https://image.shutterstock.com/image-photo/dark-chocolate-stack-chips-powder-260nw-230301934.jpg', 53.13, 57.6),
(3, 1, 'Cheese R Us', 'Very Cheddery!!', 'https://image.shutterstock.com/image-photo/chedder-cheese-cracker-appetizer-tomato-600w-141846613.jpg', 53.13, 57.6);

INSERT INTO favorites (map_id, user_id)
VALUES (1, 1),
(2, 1),
(3, 1),
(1, 2),
(2, 2),
(3, 3);
