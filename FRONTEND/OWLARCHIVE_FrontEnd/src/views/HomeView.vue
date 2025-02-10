<template>
  <div>
    <h1>Match Results</h1>

    <!-- Dropdown for Team One -->
    <label for="teamOne">Select Team One:</label>
    <select v-model="selectedTeamOne" id="teamOne">
      <option v-for="team in teams" :key="team.team_name" :value="team.team_name">
        {{ team.team_name }}
      </option>
    </select>

    <!-- Dropdown for Team Two -->
    <label for="teamTwo">Select Team Two:</label>
    <select v-model="selectedTeamTwo" id="teamTwo">
      <option v-for="team in teams" :key="team.team_name" :value="team.team_name">
        {{ team.team_name }}
      </option>
    </select>

    <!-- Button to Fetch Matches -->
    <button @click="fetchMatches" :disabled="!selectedTeamOne || !selectedTeamTwo">
      Get Matches
    </button>

    <!-- Display Match Results -->
    <ul v-if="matches.length">
      <li v-for="match in matches" :key="match.id">
        {{match.stage }} - {{ match.team_one_name }} vs {{ match.team_two_name }} - Score: {{ match.score_team_one }} - {{ match.score_team_two }}
      </li>
    </ul>
  </div>
</template>

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
    }
  }
  }
};
</script>
