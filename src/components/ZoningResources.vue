<template>
    <div>
        <navi></navi>
        <h1> Zoning </h1>
        <h3>External Resources</h3>
        
        <br><br>
        
        <div class=box v-on:click="redirectToMOH()">
            <h4>Ministry of Health (MOH)</h4>
            <p>Latest information on the COVID-19 situation in Singapore</p>
        </div>

        <div class=box v-on:click="redirectToMFA()">
            <h4>Ministry of Foreign Affairs (MFA)</h4>
            <p>Travel Advisories</p>
        </div>


        <button id=back v-on:click="redirectToZoning()"> Back </button>

    </div>
</template>

<script>
export default {
    methods: {
        redirectToHealth() {
            window.location.href = "https://www.moh.gov.sg/covid-19"
        },

        redirectToTravel() {
            window.location.href = "https://www.mfa.gov.sg/Where-Are-You-Travelling-To"
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

.box:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
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



            