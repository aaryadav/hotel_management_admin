CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    room_type VARCHAR(255) NOT NULL UNIQUE,
    hourly_rate INT NOT NULL,
    room_count INT NOT NULL
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    room_id INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- queries to populate the database with the above data
INSERT INTO rooms (room_type, hourly_rate, room_count) VALUES ('A', 100, 2);
INSERT INTO rooms (room_type, hourly_rate, room_count) VALUES ('B', 80, 3);
INSERT INTO rooms (room_type, hourly_rate, room_count) VALUES ('C', 50, 5);

INSERT INTO bookings (email, room_id, start_time, end_time) VALUES ('ss@gmail.com', 1, '2023-03-11 16:15:00', '2023-03-11 18:15:00');
INSERT INTO bookings (email, room_id, start_time, end_time) VALUES ('ay@gmail.com', 1, '2023-03-12 10:15:00', '2023-03-13 12:15:00');

