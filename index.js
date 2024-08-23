const express = require('express');
const bodyParser = require(`body-parser`);
const { createTableOnDb, getDbs, getTables } = require('./service/dbTableService');
const { getProject, listSharedProjects, listProjects } = require('./service/projectService');
const app = express();

app.use(bodyParser());

const port = 3001

// async function createTableOnDatabase({dbName}){
// await createTableOnDb({
//     dbName,
//     tables: [
//       {
//         name: 'users',
//         columns: [
//           { name: 'id', type: 'SERIAL', primary: true },
//           { name: 'username', type: 'VARCHAR(100)' },
//           { name: 'email', type: 'VARCHAR(255)' },
//           { name: 'created_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
//         ],
//       },
//       {
//         name: 'posts',
//         columns: [
//           { name: 'id', type: 'SERIAL', primary: true },
//           { name: 'title', type: 'VARCHAR(255)' },
//           { name: 'content', type: 'TEXT' },
//           { name: 'author_id', type: 'INTEGER' },
//         ],
//       },
//     ],
//   });
// }


app.listen(port, () => {
    console.log(`Server connected on port : ${port}`)
})