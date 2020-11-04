<template>
    <div>
        <navi></navi>
        
        <h1> Zoning </h1>
        
        <h3> {{userName}}, your Activity Zone is <span class=info> {{act_zone}}</span> and your Residential Zone is <span class=info> {{res_zone}} </span> </h3>  <!-- this info will be retrieved from firebase -->

        <br><br>

        <div class=box>
            <i class="fas fa-university"></i>
            <p class=title v-on:click="redirectToZoningPolicies()">University Policies</p>
        </div>

        <div class=box>
            <i class="fas fa-heartbeat"></i>
            <p class=title v-on:click="redirectToZoningDeclaration()">Health and Travel Declarations</p>
        </div>

        <div class=box>
            <i class="fas fa-info"></i>
            <p class=title v-on:click="redirectToZoningResources()">External Resources</p>
        </div>
    </div>
</template>

<script>
//import { database } from 'firebase'
import firebase from 'firebase'
import database from '../firebase.js'



export default {
    data:function() {
      return {
        act_zone: "",
        res_zone: "",
        userName: ""
      }
    },
    
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://kit.fontawesome.com/219ae75953.js')
        document.head.appendChild(recaptchaScript)
    },
    
    methods: {
      redirectToZoningPolicies() {
        this.$router.push({path:'zoning/policies'});
      },

      redirectToZoningDeclaration() {
        this.$router.push({path:'zoning/declaration'});
      },

      redirectToZoningResources() {
        this.$router.push({path:'zoning/resources'});
      },

      getUserActZone() {
            var emailadd = firebase.auth().currentUser.email
            database.collection("users").doc(emailadd).collection("profile").get().then(
                (querySnapShot) => {
                querySnapShot.forEach(doc => {
                    console.log(doc.data())
                    var actzone = doc.data().act_zone
                    this.act_zone = actzone
                }
            )
            
            //console.log(usr)
        }
        ).catch(function(error) {
            console.log(error)
        })
        
      },
      getUserResZone() {
          var emailadd = firebase.auth().currentUser.email
          database.collection("users").doc(emailadd).collection("profile").get().then(
              (querySnapShot) => {
              querySnapShot.forEach(doc => {
                  console.log(doc.data())
                  var reszone = doc.data().res_zone
                  this.res_zone = reszone
              }
          )
          
          //console.log(usr)
      }
      ).catch(function(error) {
          console.log(error)
      })
      
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
        this.getUserActZone(),
        this.getUserResZone(),
        this.getUserName()

    },
    
}
</script>

<style scoped>

.info {
  font-size: 40px;

}

.box {
  padding: 30px;
  width: 22%;
  position: relative;
  overflow: hidden;
  float: left;
  border-radius: 20px;
  margin: 0 20px 10px 80px;
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