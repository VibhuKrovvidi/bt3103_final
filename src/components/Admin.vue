<template>
    <div> 
        <navi></navi>
        <div class="blocks">
        <br><br>
        <h1> Admin Dashboard </h1>
        
      
            <div class=row>
                <div class="chart">
                    <login></login>
                </div>
                <div class="chart">
                    <user></user>
                </div>
                <div class="chart">
                    <aggtime></aggtime>
                </div><br>
                <div class="chart" @click="redirectFB()" style="cursor:pointer;">
                    
                    <fback></fback>
                    Click Chart To Access Feedback
                </div>
                <div class="chart" @click="redirectFAQ()" style="cursor:pointer;">
                    
                    <faqpie ></faqpie>
                    Click Chart To Access FAQs
                </div><br>
            </div>



        </div>
    </div>
</template>

<script>
import LoginLine from '../LoginLine.js'
import UserPie from '../UserPie.js'
import Time from '../AggregateTime.js'
import FBack from '../FeedbackPie.js'
import FAQChart from '../FAQPie.js'

export default {
    components: {
        'login': LoginLine,
        'user': UserPie,
        'aggtime': Time,
        'fback' : FBack,
        'faqpie': FAQChart
    },

    methods: {
       redirectFB : function() {
           this.$router.push({ path: '/admin/feedback'})
       },
       redirectFAQ : function() {
           this.$router.push({ path: '/admin/FAQ'})
       }

    }
    
}
</script>

<style scoped>

.chart {
    width: 30%;
    padding: 0%;
    float: center;
    position: relative;
    display: inline-block;
    margin: 0% 1.5%;
    border:black;
    
}



.box {
  padding: 20px;
  width: 24%;
  position: relative;
  float: center;
  border-radius: 20px;
  margin: 0% 1.5%;
  background:#ebf1faff;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  display: inline-block;
}

.box:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.row {
    margin: 0 2.5% 0 2.5%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}


</style>
