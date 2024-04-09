const mysql = require("mysql")

// Create a database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "nodemysql"
});

// Connect to the database
db.connect((err) => {
    if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
    }
    console.log("MySQL is connected");
});


/*
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS nodemysql'; // Modified SQL query to avoid errors if the database already exists
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating database:", err.code, "-", err.message);
      res.status(500).send('Database creation failed');
      return;
    }
    console.log("Database created:", result);
    res.send('Database created');
  });
});

app.get('/createtournamenttable', (req, res) => {
  let sql = 'CREATE TABLE tournament (id INT AUTO_INCREMENT, team_name VARCHAR(255), team_leader VARCHAR(255), tournament_name VARCHAR(255), team_players VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating Tournament table:", err.code, "-", err.message);
      res.status(500).send('Tournament table creation has failed');
      return;
    }
    console.log("Tournament table has created:", result);
    res.send("Tournament table has created");
  });
});

*/

const createUsers = (req, res) => {
    let sql = 'CREATE TABLE users (id INT AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error creating Users table:", err.code, "-", err.message);
        res.status(500).send('Users table creation has failed');
        return;
      }
      console.log("Users table has created:", result);
      res.send("Users table has created");
    });
};

//@desc get all data
//@route GET /usersinfo
//@access public
const getUsersData = (req, res) => {
  let sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
      if (err) {
      console.error("Error fetching database info:", err.code, "-", err.message);
      res.status(500).send('Failed to fetch database info');
      return;
      }
      console.log("Database info:", result);
      res.send(result);
  });
};

//@desc add new team
//@route GET /adduser
//@access public
const addUser = (req, res) => {
  let post = { username: "admin", password: "admin" };
  let sql = 'INSERT INTO users SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Users has added...")
  })
};

//@desc get all data
//@route GET /tournamentinfo
//@access public
const getData = (req, res) => {
    let sql = 'SELECT * FROM tournament';
    db.query(sql, (err, result) => {
        if (err) {
        console.error("Error fetching database info:", err.code, "-", err.message);
        res.status(500).send('Failed to fetch database info');
        return;
        }
        console.log("Database info:", result);
        res.send(result);
    });
};


//@desc delete team
//@route DELETE /:id
//@access public
const deleteTeam = (req, res) => {
    const tournamentId = req.params.team_name;

    let sql = 'DELETE FROM tournament WHERE team_name = ?';
    db.query(sql, [tournamentId], (err, result) => {
        if (err) {
        console.error("Error deleting team:", err.code, "-", err.message);
        res.status(500).send('Failed to delete team');
        return;
        }
        console.log("team deleted successfully");
        res.send('team deleted successfully');
    });
};

//@desc endpoint
//@route POST /submitform
//@access public
const addTeam = (req, res) => {
  const { teamName, teamLeaderContacts, tournamentName, teamPlayers } = req.body;

  // Insert form data into MySQL database
  const sql = 'INSERT INTO tournament (team_name, team_leader, tournament_name, team_players) VALUES (?, ?, ?, ?)';
  db.query(sql, [teamName, teamLeaderContacts, tournamentName, teamPlayers], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).send('Failed to submit form');
      return;
    }
    console.log('Form data inserted into MySQL');
    res.send('Form submitted successfully');
  });

};

const deleteTeamNull = (req, res) => {

  let sql = `DELETE FROM tournament WHERE team_name = '' OR team_name IS NULL OR team_name = ' ';`;
  db.query(sql, (err, result) => {
      if (err) {
      console.error("Error deleting team:", err.code, "-", err.message);
      res.status(500).send('Failed to delete team');
      return;
      }
      console.log("team deleted successfully");
      res.send('team deleted successfully');
  });
};

/* Tournament */

//@desc get all data
//@route GET /createtournamenttable
//@access public
const crateTournamentTable = (req, res) => {
  let sql = 'CREATE TABLE tournaments (id INT AUTO_INCREMENT, tournament_name VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating Tournaments table:", err.code, "-", err.message);
      res.status(500).send('Tournaments table creation has failed');
      return;
    }
    console.log("Tournaments table has created:", result);
    res.send("Tournaments table has created");
  });
};

//@desc get all data
//@route GET /tournamentsinfo
//@access public
const getTournamentsData = (req, res) => {
  let sql = 'SELECT * FROM tournaments';
  db.query(sql, (err, result) => {
      if (err) {
      console.error("Error fetching database info:", err.code, "-", err.message);
      res.status(500).send('Failed to fetch database info');
      return;
      }
      console.log("Database info:", result);
      res.send(result);
  });
};

//@desc delete tournament
//@route DELETE /:id
//@access public
const deleteTournament = (req, res) => {
  const tournament_name = req.params.tournament_name;

  let sql = 'DELETE FROM tournaments WHERE tournament_name = ?';
  db.query(sql, [tournament_name], (err, result) => {
      if (err) {
      console.error("Error deleting tournament:", err.code, "-", err.message);
      res.status(500).send('Failed to delete tournament');
      return;
      }
      console.log("tournament deleted successfully");
      res.send('tournament deleted successfully');
  });
};

const deleteTournamentNull = (req, res) => {

  let sql = `DELETE FROM tournaments WHERE tournament_name = '' OR tournament_name IS NULL OR tournament_name = ' ';`;
  db.query(sql, (err, result) => {
      if (err) {
      console.error("Error deleting tournament:", err.code, "-", err.message);
      res.status(500).send('Failed to delete tournament');
      return;
      }
      console.log("tournament deleted successfully");
      res.send('tournament deleted successfully');
  });
};

//@desc add new team
//@route POST /addtournament
//@access public
const addTournament = (req, res) => {
  const { tournament_name } = req.body;

  // Insert form data into MySQL database
  const sql = 'INSERT INTO tournaments (tournament_name) VALUES (?)';
  db.query(sql, [tournament_name], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).send('Failed to submit form');
      return;
    }
    console.log('Form data inserted into MySQL');
    res.send('Form submitted successfully');
  });
};

module.exports = {
    getData,
    addTeam,
    deleteTeam,
    createUsers,
    addUser,
    getUsersData,
    addTournament,
    getTournamentsData,
    crateTournamentTable,
    deleteTournament,
    deleteTournamentNull,
    deleteTeamNull
};