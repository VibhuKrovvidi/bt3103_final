<template>
    <div>
        <navi></navi>
        
        <h1> Zoning </h1>
        <h3> Activity Zone: <span class=info> C </span> <!-- this info will be retrieved from firebase -->
            Residential Zone: <span class=info> D </span> </h3>  <!-- this info will be retrieved from firebase -->

        <br><br>

        <div class=box>
            <i class="fas fa-university"></i>
            <p class=title v-on:click="redirectToUniPolicies()">University Policies</p>
        </div>
      
        <div class=box>
            <i class="fas fa-swimmer"></i>
            <p class=title >Student Life and CCA Activities Policies</p>
        </div>

        <div class=box>
            <i class="fas fa-heartbeat"></i>
            <p class=title>Health and Travel Declarations</p>
        </div>

        <div class=box>
            <i class="fas fa-info"></i>
            <p class=title>Other Resources</p>
        </div>
    </div>
</template>

<script>



export default {
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://kit.fontawesome.com/219ae75953.js')
        document.head.appendChild(recaptchaScript)
    },
    methods: {
    redirectToUniPolicies() {
      this.$router.push({path: 'zoning/unipolicies'});
    }
    }
    
}
</script>

<style scoped>

.info {
  font-size: 40px;

}

.box {
  padding: 30px;
  width: 18%;
  height: 100px;
  position: relative;
  overflow: hidden;
  float: left;
  border-radius: 20px;
  margin: 0 18px 40px 30px;
  background:#ebf1faff;
  transition: all 0.3s ease-in-out;
  text-align: center;
}

.box:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

i {
  font-size: 36px;
  line-height: 1;
}

.title {
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 18px;
}


</style>