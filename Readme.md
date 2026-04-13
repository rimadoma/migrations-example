Simple PostgreSQL migration script examples for Node.js. Includes a toy web server for testing the migration process of coordinate data.

The migrations also create a `pgmigrations` metadata table that keeps track of which migrations have been run. 

# Setup
* Node.js from https://nodejs.org/en/download/
* `npm install node-pg-migrate pg` for PostGres migrations
* `npm install express` for Web server (express) in index.js

# Running the web server
1. Update pg.Pool config in `index.js`
2. `npm start`
3. Navigate to `localhost:3005/posts`

# Playbook
Synopsis: Migrating coordinates from numeric latitude and longitude to a single point column. Includes both schema and data migration.

You can test things work with the web server.

1. Create 'posts' table with lat, lng columns  `1775817691207_table-posts.js`
2. Add a point type column `1775821859962_add-loc-to-posts.js`
3. Update `index.js` & restart the server
4. Run the data migration `batch_update.js`
5. Drop old columns wtih `1776065451414_drop-lng-lat.js`
6. Update `index.js` & restart the server -- sorted

# Cheatsheet
Before running migrations set your DATABASE_URL environment variable, e.g. `set DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/dbname` on Windows CMD

* `npm run migrate create <script name>`
* `npm run migrate up` - runs all migrations that haven't been applied yet, in filename order (note timestamps)
* `npm run migrate down` - rolls back the most recent applied migration (one at a time)
* You can add numbers after up/down to control how many migrations are run, or call by name