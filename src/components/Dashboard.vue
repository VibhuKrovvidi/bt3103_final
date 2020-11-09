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
        
    </div>
    <div class="bigbox">
            <button id="bx1" @mouseover="hover1 = true" @mouseleave="hover1 = false" @click="redirectFAQ($event)"> 
                <h2> FAQ </h2>
                <p v-if="hover1"> 
                    Got a question? Check out the FAQs to see if your question has already been answered. <br>
                    These FAQs come directly from the University Administrators, and keep you well informed about NUS' COVID response!
                </p>

            </button> 

            <button id="bx2" @mouseover="hover2 = true" @mouseleave="hover2 = false" @click="redirectFeedback($event)">
                 <h2> Feedback </h2>
                <p v-if="hover2"> 
                    Want to let the University know about an issue you're facing? <br>
                    Send your administrators feedback regarding your faculty, housing and activities!
                </p>
            </button>

            <button id="bx3" @mouseover="hover3 = true" @mouseleave="hover3 = false" @click="redirectModules($event)"> 
                 <h2>Modules</h2>
                <p v-if="hover3">
                    Learn about your modules, explore the NUS class catalogue and plan ahead for future semesters with MySID's module planner! 
                </p>

            </button>

            <button id="bx4" @mouseover="hover4 = true" @mouseleave="hover4 = false" @click="redirectTime($event)">
                 <h2> Time </h2>
                <p v-if="hover4">
                    It can be tough to keep track of time when working or studying from home. Track your day and ensure your life is balanced during the pandemic with MySID's Time feature!
                </p>
            </button>
            <div id="bx5"> 
                <h1> Notices </h1> 
                <ul>
                    <li v-for="fb in policies" v-bind:key="fb.category">
                        <div class="category" @click="toggleShow()">  <p><u>{{fb.title}} </u> </p>
                        <div class="details"> <p> <i> {{fb.category}}, posted on {{fb.date}} </i> </p> </div>
                        </div>
                        <div class="contents" v-if="showcontents"> <p>{{fb.content}}</p> </div>

                    </li>
                </ul>

            </div>

    </div>

       
       

    </div>

</template>

<script>
import database from '../firebase.js'
import firebase from 'firebase'
//import UpdateBox from './UpdateBox.vue'

export default {
    data:function() {
        return {
            userName : "",
            hover1 : false,
            hover2 : false,
            hover3 : false,
            hover4 : false,
            policies: [],
            showcontents: false
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
        
        },

        redirectFAQ : function(event) {
            event.preventDefault()
            this.$router.push({ path: '/faq'})
        },
        redirectFeedback : function(event) {
            event.preventDefault()
            this.$router.push({ path: '/feedback'})
        },
        redirectTime : function(event) {
            event.preventDefault()
            this.$router.push({ path: '/time'})
        },
        redirectModules : function(event) {
            event.preventDefault()
            this.$router.push({ path: '/modules'})
        },
        get_policies : function() {
            database.collection("circulars").get().then((queryDocumentSnapShot) => {           
                    let fb = {}         
                    queryDocumentSnapShot.forEach(doc => {  
                        fb = doc.data()
                        console.log(fb)
                        this.policies.push(fb)
                    })
                }
            )
        },
        toggleShow : function() {
            if(this.showcontents) {
                this.showcontents = false;
            } else {
                this.showcontents = true;
            }

        }
    },

    created : function(){
        this.getUserName(),
        this.get_policies()

    },
    components : {
        //updatebox : UpdateBox
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

    .bigbox {
        width: 100%;
        height: 580px;
        
        position: relative;
        float: left;
        float: right;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-weight: bold;

        letter-spacing: 0.75px;
        margin-left: 0px;
        text-decoration: none;
        padding-right: 0px;
    }


    #bx1 {
        position: absolute;
        height: 300px;
        width: 600px;
        top: 0;
        left: 0;
        background-color:#526C80;
        border: none;
        color: white;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        cursor: pointer;
    }

    #bx1:hover {
        background-color: #003D7C;
        
    }

    #bx2 {
        position: absolute;
        height: 300px;
        width: 300px;
        top: 0px;
        left: 600px;
        background-color: #F5AD69;
        border: none;
        color: white;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        cursor: pointer;
    }

    #bx2:hover {
        background-color: #EF7C00;
    }

    #bx3 {
        position: absolute;
        height: 300px;
        width: 300px;
        top: 300px;
        left: 0;
        background-color: #F5AD69;
        border: none;
        color: white;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        cursor: pointer;
    }

    #bx3:hover {
        background-color: #EF7C00;
    }

    #bx4 {
        position: absolute;
        height: 300px;
        width: 600px;
        top: 300px;
        left: 300px;
        background-color:#526C80;
        border: none;
        color: white;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        cursor: pointer;
    }

    #bx4:hover {
        background-color: #003D7C;
    }

    #bx5 {
        position: absolute;
        height: 600px;
        width: 600px;
        top: 0;
        left: 900px;
        border: none;
        overflow: auto;
    }

    .category {
        font-size: 1.25em;
        text-align: left;
        cursor: pointer;
        border:none;
    }

    .details {
        color: gray;
        text-align: left;
        font-size: smaller;
       

    }

    .contents {
        font-size: 1em;
        text-decoration: none;
        text-align: left;
    }

    
   

</style>