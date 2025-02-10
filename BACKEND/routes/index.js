var express = require('express');
var router = express.Router();

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'owlproject'
})


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
       //'SELECT t1.team_name as team_one_name, t2.team_name as team_two_name, score_team_one, score_team_two from match_table join team_table t1 on match_table.team_one_id = t1.team_id join team_table t2 on match_table.team_two_id = t2.team_id where (t1.team_id = '?' AND t2.team_id = '?') OR (t2.team_id = '?' AND t1.team_n = '?')
       connection.query('SELECT t1.team_name as team_one_name, t2.team_name as team_two_name, score_team_one, score_team_two, stage from match_table join teams_table t1 on match_table.team_one_id = t1.team_id join teams_table t2 on match_table.team_two_id = t2.team_id where (t1.team_id = ? AND t2.team_id = ?) OR (t2.team_id = ? AND t1.team_id = ?)',[teamOneId, teamTwoId, teamOneId, teamTwoId], (err, result)=>{
        if(err) throw err
        return res.json(result);
       })
    }
  })
});
router.get('/teams', function(req, res){
  connection.query('select * from teams_table', (err, result)=>{
    if(err) throw err
    return res.json(result);
  })
});

module.exports = router;



