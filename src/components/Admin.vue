<template>
    <div> 
        <navi></navi>
        <div class="blocks">
        <h1> Admin Dashboard </h1>
        <br><br>
            <div class="chart">
                <login></login>
            </div>

            <div class="chart">
                <user></user>
            </div>

            <div class="chart">
                <aggtime></aggtime>
            </div>


            <div class=box v-on:click="redirectToPolicies()">
                <h4>Update Policies</h4>
            </div>

            <div class=box v-on:click="redirectToFAQ()">
                <h4>Update FAQ</h4>
            </div>

            <div class=box v-on:click="redirectToFeedback()">
                <h4>View Feedback</h4>
            </div>
        </div>
    </div>
</template>

<script>
import LoginLine from '../LoginLine.js'
import UserPie from '../UserPie.js'
import Time from '../AggregateTime.js'

export default {
    components: {
        'login': LoginLine,
        'user': UserPie,
        'aggtime': Time
    },

    methods: {
        redirectToPolicies() {
            this.$router.push('/admin/policies')
        },

        redirectToFAQ() {
            this.$router.push('/admin/FAQ')
        },

        redirectToFeedback() {
            this.$router.push('/admin/feedback')
        }

    }
    
}
</script>

<style scoped>

.chart {
    width: 30%;
    padding: 20px;
    float: left;
}

.box {
  padding: 20px;
  width: 24%;
  position: relative;
  float: left;
  border-radius: 20px;
  margin: 0 5px 10px 80px;
  background:#ebf1faff;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
}

.box:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


</style>
