<script>
import axios from 'axios';

export default {
  data() {
    return{
    selectedTeamOne: null,
    selectedTeamTwo: null,
    teams: [],
    matches: [],
  };
},
  mounted() {
    this.fetchTeams();
  },
  methods:{
  async fetchTeams(){
    try{
      const response = await axios.get(`http://localhost:3000/teams`);
      this.teams = response.data
    } catch (err){
      console.error(err);
    }

  },
  async fetchMatches(){
    try{
      const response = await axios.get(`http://localhost:3000/matches/${this.selectedTeamOne}/${this.selectedTeamTwo}`);
      this.matches = response.data;  
    } catch (err){
      console.error(err);
      //This is for a test commit
      this.matches = [];
    }
  }
  }
};
</script>
<template>
  <div id="container">
    <h1 id="title">Match Results</h1>

    <!-- Dropdown for Team One -->
    <div class="teamDiv">
      <label for="teamOne">Select Team One:</label>
      <select v-model="selectedTeamOne" id="teamOne">
        <option v-for="team in teams" :key="team.team_name" :value="team.team_name">
          {{ team.team_name }}
        </option>
      </select>
    </div>
    
    <!-- Dropdown for Team Two -->
    <div class="teamDiv">
      <label for="teamTwo">Select Team Two:</label>
      <select v-model="selectedTeamTwo" id="teamTwo">
        <option v-for="team in teams" :key="team.team_name" :value="team.team_name">
          {{ team.team_name }}
        </option>
      </select>
    </div>

    <!-- Button to Fetch Matches -->
    <button @click="fetchMatches" :disabled="!selectedTeamOne || !selectedTeamTwo">
      Get Matches
    </button>

    <!-- Display Match Results -->
    <ul v-if="matches.length" id="matchList">
      <li v-for="match in matches" :key="match.id">
        {{ match.stage }} - {{ match.team_one_name }} vs {{ match.team_two_name }} - Score: {{ match.score_team_one }} - {{ match.score_team_two }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
#container {
  display:flex;
  flex-direction:column;
  margin:auto;
  align-items:center;
  text-align: center;
  font-family: Arial, sans-serif;
}

#title {
  color: #2c3e50;
  background-color:gainsboro;
  font-size: 24px;
  margin-bottom:1em;
}

.teamDiv {
  margin-bottom: 15px;
  display:flex;
  flex-direction: column;
  align-items:center;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

select {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

#matchList {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

#matchList li {
  background: #00b6e3;
  color:black;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
</style>



