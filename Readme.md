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
TBD

# Cheatsheet
Before running migrations set your DATABASE_URL environment variable, e.g. `set DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/dbname` on Windows CMD

* `npm run migrate create <script name>`
* `npm run migrate up` - runs all migrations that haven't been applied yet, in filename order (note timestamps)
* `npm run migrate down` - rolls back the most recent applied migration (one at a time)
* You can add numbers after up/down to control how many migrations are run, or call by name