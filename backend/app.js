const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const db = require('./db')
// allow cors
const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log('GET request to homepage')
  const query = `SELECT 
    rooms.room_type,
    rooms.room_count,
    bookings.email,
    bookings.start_time,
    bookings.end_time
  FROM rooms
  LEFT JOIN bookings
  ON rooms.id = bookings.room_id`;
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    const rooms = {};

    result.rows.forEach(row => {
      if (!rooms[row.room_type]) {
        rooms[row.room_type] = {
          room_type: row.room_type,
          room_count: row.room_count,
          booked_rooms: []
        };
      }
      if (row.email) {
        rooms[row.room_type].booked_rooms.push({
          email: row.email,
          start_time: row.start_time,
          end_time: row.end_time
        });
      }
    });
    // console.log(rooms);
    res.json(Object.values(rooms));
  });
});

// put request 
// update a booking in the bookings table
app.put('/bookings/:id', (req, res) => {
  let sql = `UPDATE bookings SET email = '${req.body.email}', room_id = '${req.body.room_id}', start_time = '${req.body.start_time}', end_time = '${req.body.end_time}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Booking updated...');
  });
});

app.delete('/cancel', (req, res) => {
  room_type = req.body.roomType
  room_number = req.body.roomNumber
  start_time = req.body.startDate
  end_time = req.body.endDate
    
  start_time = start_time.split('T').join(' ')
  end_time = end_time.split('T').join(' ')

  // DELETE based on roomtype, roomnumber, start time, end time
  let query = `DELETE FROM bookings WHERE room.room_type = ${req.body.room_type} AND room_id = ${req.body.room_number} AND bookings.start_time = '${req.body.start_time}' AND bookings.end_time = '${req.body.end_time}'`;
  console.log(query)
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Booking deleted' });
  })
});

app.post('/book', (req, res) => {
  console.log('POST request to book')
  room_number = req.body.roomNumber
  start_time = req.body.startDate
  end_time = req.body.endDate
  email = req.body.email

  start_time = start_time.split('T').join(' ')
  end_time = end_time.split('T').join(' ')
  console.log(room_number, start_time, end_time, email)
  const query = `SELECT * FROM bookings WHERE room_id = ${room_number} AND start_time < '${end_time}' AND end_time > '${start_time}'`
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.rows.length === 0) {
      const insertQuery = `INSERT INTO bookings (email, room_id, start_time, end_time) VALUES ('${email}', ${room_number}, '${start_time}', '${end_time}')`
      console.log(insertQuery)
      db.query(insertQuery, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.json({ message: 'Booking successful' });
      })
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})