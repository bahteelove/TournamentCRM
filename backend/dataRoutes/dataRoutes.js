const express = require("express");
const router = express.Router();

const { 
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
    deleteTournamentNull
} = require("../controllers/dataController")

/* creation of users table */
/* do not use them */
// to create users table
router.route('/usersinfo').get(getUsersData)

// to create users table
router.route('/adduser').get(addUser)

// to create users table
router.route('/createusertable').get(createUsers)

/* handling teams */
/* do use them */
// to see tournament info
router.route('/teaminfo').get(getData);

// delete
router.route('/:team_name').delete(deleteTeam);

// to add a new team
router.route('/submitForm').post(addTeam)

/* handling tournaments */
/* do use them */
router.route('/createtournamenttable').get(crateTournamentTable);

// to see tournament info
router.route('/tournamentsinfo').get(getTournamentsData);

// delete tournament
router.route('/t/:tournament_name').delete(deleteTournament);

router.route('/tt/').get(deleteTournamentNull);

// to add a new tournament
router.route('/addtournament').post(addTournament)





module.exports = router;