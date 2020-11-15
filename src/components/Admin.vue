<template>
    <div> 
        <navi></navi>
        <div class="blocks">
        <br><br>
        <h1> Admin Dashboard </h1>
        
        <br>
        
            <div class=row>
                <div class="chart">
                    <login></login>
                </div>
                <div class="chart">
                    <user ></user>
                </div>
                <div class="chart">
                    <aggtime></aggtime>
                </div>

                <br><br><br><br>

                <div class="chart" @click="redirectFB()" style="cursor:pointer;">
                    
                    <fback></fback>
                    <br>
                    Click Chart To Access Feedback
                </div>
                <div class="chart" @click="redirectFAQ()" style="cursor:pointer;">
                    
                    <faqpie ></faqpie>
                    <br>
                    Click Chart To Access FAQs
                </div><br>
            </div>

            <br>

        </div>
    </div>
</template>

<script>
import LoginLine from '../LoginLine.js'
import UserBar from '../UserBar.js'
import Time from '../AggregateTime.js'
import FBack from '../FeedbackPie.js'
import FAQChart from '../FAQPie.js'

export default {
    components: {
        'login': LoginLine,
        'user': UserBar,
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
