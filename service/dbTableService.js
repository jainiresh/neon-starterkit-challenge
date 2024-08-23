const sql = require("../config/pgConfig");


async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

async function createTableOnDb({ dbName, tables }) {
    console.log("Starting")
    // Use a separate connection for the specific database if needed
    const db = postgres({
      host: PGHOST,
      database: dbName,
      username: PGUSER,
      password: PGPASSWORD,
      port: 5432,
      ssl: 'require',
      connection: {
        options: `project=${ENDPOINT_ID}`,
      },
    });
  
    try {
      // Iterate over table definitions
      for (const table of tables) {
        const { name, columns } = table;
  
        // Generate column definitions for the table
        const columnDefinitions = columns
          .map(col => `${col.name} ${col.type}${col.primary ? ' PRIMARY KEY' : ''}`)
          .join(', ');
  
        // Create table SQL command
        const createTableSQL = `CREATE TABLE IF NOT EXISTS ${name} (${columnDefinitions});`;
  
        console.log(`Executing: ${createTableSQL}`);
  
        // Execute the SQL command
        await db.unsafe(createTableSQL);
      }
  
      console.log('Tables created successfully.');
    } catch (error) {
      console.error('Error creating tables:', error);
    } finally {
      await db.end();
    }
  }

async function getDbs(){
    try {
        // Query to get the list of databases
        const query = 'SELECT datname FROM pg_database WHERE datistemplate = false;';
        const result = await sql.unsafe(query);
    
        // Extract database names from the result
        const dbNames = result.map(row => row.datname);
        
        console.log('Databases:', dbNames);
        return dbNames;
      } catch (error) {
        console.error('Error fetching databases:', error);
        throw error; // Re-throw the error for higher-level handling
      } finally {
        await sql.end(); // Close the connection
      }
}

async function getTables(dbName) {  
    try {
      // Query to get the list of tables
      const query = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
      `;
      const result = await sql.unsafe(query);
  
      // Extract table names from the result
      const tableNames = result.map(row => row.table_name);
  
      console.log(`Tables in ${dbName}:`, tableNames);
      return tableNames;
    } catch (error) {
      console.error('Error fetching tables:', error);
      throw error; // Re-throw the error for higher-level handling
    } finally {
      await sql.end(); // Close the connection
    }
  }
  
  async function createDatabase(dbName) {
    try {
        // Query to create a new database
        const query = `CREATE DATABASE ${dbName};`;
        await sql.none(query);
        console.log(`Database ${dbName} created successfully.`);
    } catch (error) {
        console.error('Error creating database:', error);
        throw error; // Re-throw the error for higher-level handling
    } finally {
        await sql.end(); // Close the connection
    }
}


async function dropDatabase(dbName) {
    try {
        // Query to drop a database
        const query = `DROP DATABASE ${dbName};`;
        await sql.none(query);
        console.log(`Database ${dbName} dropped successfully.`);
    } catch (error) {
        console.error('Error dropping database:', error);
        throw error; // Re-throw the error for higher-level handling
    } finally {
        await sql.end(); // Close the connection
    }
}


async function dropTable(dbName, tableName) {
    try {
        // Connect to the specified database
        await sql.connect(dbName);

        // Query to drop a table
        const query = `DROP TABLE ${tableName};`;
        await sql.none(query);

        console.log(`Table ${tableName} dropped successfully from ${dbName}.`);
    } catch (error) {
        console.error('Error dropping table:', error);
        throw error; // Re-throw the error for higher-level handling
    } finally {
        await sql.end(); // Close the connection
    }
}

async function insertDataOnTable(dbName, tableName, data) {
    try {
        // Connect to the specified database
        await sql.connect(dbName);

        // Construct the query for inserting data
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(v => `'${v}'`).join(', ');
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
        await sql.none(query);

        console.log(`Data inserted into ${tableName} in ${dbName}.`);
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error; // Re-throw the error for higher-level handling
    } finally {
        await sql.end(); // Close the connection
    }
}

async function selectDataOnTable(dbName, tableName, columns = '*') {
    try {
        // Connect to the specified database
        await sql.connect(dbName);

        // Query to select data
        const query = `SELECT ${columns} FROM ${tableName};`;
        const result = await sql.any(query);

        console.log(`Data from ${tableName} in ${dbName}:`, result);
        return result;
    } catch (error) {
        console.error('Error selecting data:', error);
        throw error; // Re-throw the error for higher-level handling
    } finally {
        await sql.end(); // Close the connection
    }
}

async function updateDataOnTable(dbName, tableName, data, condition) {
    try {
        // Connect to the specified database
        await sql.connect(dbName);

        // Construct the query for updating data
        const updates = Object.entries(data).map(([key, value]) => `${key} = '${value}'`).join(', ');
        const query = `UPDATE ${tableName} SET ${updates} WHERE ${condition};`;
        await sql.none(query);

        console.log(`Data updated in ${tableName} in ${dbName}.`);
    } catch (error) {
        console.error('Error updating data:', error);
        throw error; // Re-throw the error for higher-level handling
    } finally {
        await sql.end(); // Close the connection
    }
}

async function deleteData(dbName, tableName, condition) {
    try {
        // Connect to the specified database
        await sql.connect(dbName);

        // Query to delete data
        const query = `DELETE FROM ${tableName} WHERE ${condition};`;
        await sql.none(query);

        console.log(`Data deleted from ${tableName} in ${dbName}.`);
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error; // Re-throw the error for higher-level handling
    } finally {
        await sql.end(); // Close the connection
    }
}

module.exports = {getTables, createTableOnDb, insertDataOnTable, updateDataOnTable, deleteData, selectDataOnTable, dropTable, getDbs, createDatabase, dropDatabase}