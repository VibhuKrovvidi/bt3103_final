<template>
    <div>
        <navi></navi>
        <br><br>
        <h1> Time </h1>
        <div id=top>
            <h2 style="text-align:left" id=left_top>Good {{timeOfDay()}}, {{userName}}!</h2>
            <div id=right_top>
                <p> <i>Log your daily events here!</i> </p>
                <button v-on:click= "redirectToForm()"> Add Event</button>
            </div> 
        </div>

        <mmt id=stackItem></mmt>

        <s1 id=stackItem></s1>
        <hr>
        <s2 id=stackItem></s2>
        <hr>
        <s3 id=stackItem></s3>
    </div>
</template>

<script>
//NEW
import momentum from './Stack_Momentum.vue'
import stack1 from './Stack_Breakdown.vue'
import stack2 from './Stack_CategoryCompare.vue'
import stack3 from './Stack_TimeOfDay.vue'

import database from '../firebase.js'
import firebase from 'firebase'

export default {
    components: {
        'mmt': momentum,
        's1': stack1,
        's2': stack2,
        's3': stack3,
    },

    data(){
        return {
            usr: firebase.auth().currentUser.email, //get name later
            userName : ""
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
        },
        getUserName() {
            var emailadd = firebase.auth().currentUser.email
            database.collection("users").doc(emailadd).collection("profile").get().then(
                (querySnapShot) => {
                querySnapShot.forEach(doc => {
                    console.log(doc.data())
                    var usrname = doc.data().name
                    this.userName = usrname
                }
            )
            
            //console.log(usr)
        }
        ).catch(function(error) {
            console.log(error)
        })
        }
    },

    created : function(){
        this.getUserName()

    },

}

</script>

<style scoped>

    hr {
        width: 98%;
        margin: 0 1% 0 1%;
        color: lightgrey;
    }

    #left_top {
        float: left;
    }

    #right_top {
        float: right;
    }

    #top {
        width: 95%;
        margin: 0 2.5% 0 2.5%;
    }

    #stackItem {
        width: 95%;
        margin: 0 2.5% 0 2.5%;
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

