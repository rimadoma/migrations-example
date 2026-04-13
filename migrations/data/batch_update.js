import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork',
    user: 'username',
    password: 'password',
});

// TODO Run in batches
pool.query(`
    UPDATE posts
    SET loc = POINT(lng, lat)
    WHERE loc IS NULL;
    `)
    .then(() => {
        console.log('Update complete');
        pool.end();
    })
    .catch((err) => console.error(err.message));