<template>
    <div class="app">
        <navi></navi>
    <div id="container">
        <div id="first">
            <p id='personal_message'> Welcome back, {{userName}} </p>
        </div>
        <div id="second">
            <p id='school_term'> 
                <br>
                AY20/21 Semester 1, Week 13 </p>
        </div>
        <div id="clear"></div>
        </div>

        <div id="container">
            <div id="third">
             </div>
            <div id="fourth">
                <p id='updates'> Latest Updates </p>
            </div>
        </div>
        <div id="clear"></div>


        <div id="container">
            <div id="third">
             </div>
            <div id="fourth">
                <div id="rcorners2">
                    <updatebox class="ubox"> </updatebox><br>
                    <updatebox class="ubox"> </updatebox><br>
                    <updatebox class="ubox"> </updatebox><br>
                    <updatebox class="ubox"> </updatebox><br>
                    <updatebox class="ubox"> </updatebox><br>
                    <updatebox class="ubox"> </updatebox><br>
                    <updatebox class="ubox"> </updatebox><br>
                    <updatebox class="ubox"> </updatebox><br>
                </div>
            </div>
        </div>
        <div id="clear"></div>

        </div>

</template>

<script>
import database from '../firebase.js'
import firebase from 'firebase'
import UpdateBox from './UpdateBox.vue'

export default {
    data:function() {
        return {
            userName : ""
        }
        
    },

    methods: {
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
    components : {
        updatebox : UpdateBox
    }
}
</script>

<style scoped>
    #container {
        width: 100%;
        background-color:white;
        margin: auto;
    }
    #first {
        width: 600px;
        float: left;
        height: 100px;
        align-content: left ;
    }
    #second {
        width: 500px;
        float: right;
        height: 100px;

    }

    #third {
        width: 50px;
        float: left;
        height: 100px;
        align-content: left ;
        background-color: white;
    }
    #fourth {
        width: 800px;
        float: left;
        height: 100px;
        background-color:white;

    }

    #updates {
        font-family: Arial, Helvetica, sans-serif;
        text-align: left;
        font-size: 30px;
        text-decoration: underline;

    }

    #personal_message {
        color: black;
        font-size: 30px;
        text-align: left;
        font-weight: bold;
        
    }
    #school_term {
        color: black;
        font-size: 15px;
        text-align: right;
        
    }
    #clear {
        clear: both;
    }

    #rcorners2 {
        margin:4px, 4px; 
        padding:4px; 
        
        width: 1000px; 
        height: 400px; 
        background-color: coral;
        border-color: black;
        overflow-x: hidden; 
        overflow-y: auto; 
        text-align:justify;
        
    }      

    .ubox {
        
    } 

</style>