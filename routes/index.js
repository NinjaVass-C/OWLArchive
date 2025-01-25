var express = require('express');
var router = express.Router();

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'owlproject'
})



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/matches/:teamOne/:teamTwo', function(req, res){
  let teamOne = req.params.teamOne;
  let teamTwo = req.params.teamTwo;
  connection.query('select team_id from teams_table where team_name = ? or team_name = ?', [teamOne, teamTwo], (err, result) =>{
    if (err) throw err

    if(result.length < 2){
      return res.status(404).send("Error, invalid team combinations");
    }
    else{
       let teamOneId = result[0].team_id
       let teamTwoId = result[1].team_id
       connection.query('SELECT * FROM match_table WHERE (team_one_id = ? AND team_two_id = ?) OR (team_one_id = ? AND team_two_id = ?)',[teamOneId, teamTwoId, teamTwoId, teamOneId], (err, result)=>{
        if(err) throw err
        return res.json(result);
       })
    }
  })
})

module.exports = router;



