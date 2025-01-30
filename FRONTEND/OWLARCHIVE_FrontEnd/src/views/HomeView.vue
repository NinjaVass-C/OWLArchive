<template>
  <div>
    <h1>Vue + Axios Test</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '', // We will store the "Hello World" message here
    };
  },
  mounted() {
    // Make a GET request to the Express API when the component is mounted
    axios.get('http://localhost:3000/')
      .then((response) => {
        this.message = response.data.message;  // Store the response message
      })
      .catch((error) => {
        console.error('There was an error fetching the data:', error);
      });
  },
};
</script>
