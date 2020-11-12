<template>
    <div>
        <navi></navi>
        <br><br>
        <h1> Zoning </h1>
        
        <h3> Hi {{userName}}! </h3>
        <h3> Activity Zone: <span class=info>{{act_zone}}</span> Residential Zone: <span class=info>{{res_zone}} </span> </h3>

        <br><br>

        <div class=row>
            <div class=box v-on:click="redirectToZoningPolicies()">
                <i class="fas fa-university"></i>
                <p class=title>University Policies</p>
            </div>

            <div class=box v-on:click="redirectToZoningDeclaration()">
                <i class="fas fa-heartbeat"></i>
                <p class=title>Health and Travel Declarations</p>
            </div>

            <div class=box v-on:click="redirectToZoningResources()">
                <i class="fas fa-info"></i>
                <p class=title>External Resources</p>
            </div>
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
  margin-right: 40px;

}

.box {
  padding: 30px;
  width: 22%;
  position: relative;
  overflow: hidden;
  float: center;
  border-radius: 20px;
  margin: 0% 1.5%;
  background:#ebf1faff;
  transition: all 0.3s ease-in-out;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}

.box:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.row:after {
  content: "";
  display: table;
  clear: both;
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
