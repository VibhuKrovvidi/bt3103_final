<template>
    <div>
        <navi></navi>
        <h1> Zoning </h1>
        <h3>Health and Travel Declarations</h3>

        <br><br>

        <div class=box v-on:click="redirectToHealth()">
            <h4>Health Declaration</h4>
            <p>All students who come to campus, and students staying in hostels must declare your temperature twice a day.</p>
        </div>

        <div class=box v-on:click="redirectToTravel()">
            <h4>Travel Declaration</h4>
            <p>In the light of the current public health concern relating to COVID-19, you are required to declare your travel plans if you have not previously done so.</p>
        </div>


        <button id=back v-on:click="redirectToZoning()"> Back </button>

    </div>
</template>

<script>
export default {
    methods: {
        redirectToHealth() {
            window.location.href = "https://myaces.nus.edu.sg/htd"
        },

        redirectToTravel() {
            window.location.href = "https://myaces.nus.edu.sg/OverseasTravelDecl/"
        },

        redirectToZoning() {
            this.$router.push({path: '/zoning'})
        }
    }
    
}
</script>


<style scoped>

.box {
  padding: 20px;
  width: 24%;
  position: relative;
  float: left;
  border-radius: 20px;
  margin: 0 5px 10px 250px;
  background:#ebf1faff;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
}



p {
    font-size: 16px;
    font-weight: 500;
}

#back {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 16px;
    margin: 20px;
    text-align:'center';
    border-radius: 4px;
    right: 0;
    bottom: 0;
    position: absolute;
    width: 100px;
    height: 40px;
    color: white;
    background-color: #003D7C;
}

</style>



            