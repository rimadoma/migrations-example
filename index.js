import express, { urlencoded } from 'express';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork',
  user: 'username',
  password: 'password',
});

const app = express();
app.use(urlencoded({ extended: true }));

app.get('/posts', async (req, res) => {
  const { rows } = await pool.query(`
    SELECT * FROM posts;
  `);

  // Modify during migration: before data comes from row.lng, row.lat and after from row.loc.x and row.loc.y
  res.send(`
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>lat</th>
          <th>lng</th>  
        </tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => {
            return `
            <tr>
              <td>${row.id}</td>
              <!-- <td>${row.lat}</td> -->
              <!-- <td>${row.lng}</td> -->
              <td>${row.loc.y}</td>
              <td>${row.loc.x}</td>
            </tr>
          `;
          })
          .join('')}
      </tbody>
    </table>
    <form method="POST">
      <h3>Create Post</h3>
      <div>
        <label>Lat</label>
        <input name="lat" />
      </div>
      <div>
        <label>Lng</label>
        <input name="lng" />
      </div>
      <button type="submit">Create</button>
    </form>
  `);
});

app.post('/posts', async (req, res) => {
  const { lng, lat } = req.body;

  // 1. Old query shape
  // await pool.query('INSERT INTO posts (lat, lng) VALUES ($1, $2);', [lat, lng]);

  // 2. Mid migration query
  // await pool.query(
  //   'INSERT INTO posts (lat, lng, loc) VALUES ($1, $2, $3);', 
  //   [lat, lng, `(${lng}, ${lat})`]
  // );

  // 3. New query shape
 await pool.query('INSERT INTO posts (loc) VALUES ($1);', [`(${lng}, ${lat})`]);

  res.redirect('/posts');
});

app.listen(3005, () => {
  console.log('Listening on port 3005');
});