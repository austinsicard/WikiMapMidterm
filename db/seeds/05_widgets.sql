-- Widgets table seeds here (Example)
INSERT INTO widgets (name, user_id) VALUES ('Sprockets', 1);
INSERT INTO widgets (name, user_id) VALUES ('Chains', 2);
INSERT INTO widgets (name, user_id) VALUES ('Bearings', 2);


INSERT INTO maps (user_id, favorite_id, title, description, photo_url, city, lat, long,)
VALUES (1, 3, "Downtown Montreal", "This is a description", 'https://image.shutterstock.com/image-photo/french-onion-gratin-soup-260nw-104052002.jpg', Montreal, 1.2, 0.9),
(2, 1, "Downtown Toronto", "This is a description", 'https://image.shutterstock.com/image-photo/two-fresh-submarine-sandwiches-ham-260nw-497930494.jpg', Toronto, 1.3, 0.4),
(3, 2, "Downtown Halifax", "This is a description", 'https://image.shutterstock.com/image-photo/dark-chocolate-stack-chips-powder-260nw-230301934.jpg', Halifax, 1.5, 0.3);

INSERT INTO points (map_id, title, description, photo_url)
VALUES (1,"Soup Palace", "The best French Onion Soup!!", 'https://image.shutterstock.com/image-photo/french-onion-gratin-soup-260nw-104052002.jpg'),
(2, "Sandwich Palace", "The best Sandwich Ever!!", 'https://image.shutterstock.com/image-photo/two-fresh-submarine-sandwiches-ham-260nw-497930494.jpg'),
(3, "Chocloate Palace", "The best Chocolate!!", 'https://image.shutterstock.com/image-photo/dark-chocolate-stack-chips-powder-260nw-230301934.jpg');

INSERT INTO favories (map_id, user_id)
VALUES (1, 1),
VALUES (2, 1),
VALUES (3, 1),
VALUES (1, 2),
VALUES (2, 2),
VALUES (3, 3),
