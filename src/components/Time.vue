<template>
    <div>
        <navi></navi>
        <h1> Time </h1>
        <br>
        <div id=top>
            <h2 style="text-align:left" id=left_top>Good {{timeOfDay()}}!</h2>
            <div id=right_top>
                <p> <i>Log your daily events here!</i> </p>
                <button v-on:click= "redirectToForm()"> Add Event</button>
            </div> 
        </div>
        <br>
        <hr color="lightgrey">
        <s1></s1>
    </div>
</template>

<script>
//NEW
import stack1 from './Stack_Breakdown.vue'
import firebase from 'firebase'

export default {
    components: {
        's1': stack1,
    },

    data(){
        return {
            usr: firebase.auth().currentUser.email, //get name later
        }
    },

    methods: {
        redirectToForm() {
            this.$router.push({ path: '/time/form'});
        },
        timeOfDay() {
            var d = new Date()
            var h = d.getHours()
            if (h<=12) {
                return "Morning"
            } else if (h<=18) {
                return "Afternoon"
            } else {
                return "Evening"
            }
        }
    }, 
}

</script>

<style scoped>
    #left_top {
        font-size: 30px;
        float: left;
    }

    #right_top {
        float: right;
    }

    /*
    #top {
        border-style: solid;
        border-width: 1px;
        padding: 10px;
        border-radius: 16px;
    }*/

    #top:after{
        content: "";
        display: table;
        clear: both;
    }

    button {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 20px;
        text-align:'center';
        width: 200px;
        height: 50px;
        background: orange;
        color: white;
        background-color: #EF7C00;
        border-radius: 4px;
        float: right;
    }

    button:hover {
        background-color: orangered;
    }

</style>

