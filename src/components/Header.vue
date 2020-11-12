
<template>
  <div class="navbar">
      <div class = "topHead">
        <div class = "logo"> MySID </div>
        <div>
            
            <p class="logout_btn"> {{currentUser.email}}
            
            <button class = "btn" @click="logoutUser"> Logout </button>
            </p>
        </div> 
      </div>
        <nav class="pagecontents">
            
            
            <router-link v-if="!isAdmin" class="custom-nav-item" to="/dashboard" exact>Home</router-link>
            <router-link v-if="isAdmin" class="custom-nav-item" to="/admin" exact>Admin Dashboard </router-link>
            <router-link v-if="isAdmin" class="custom-nav-item" to='/admin/policies'> Update Policies </router-link>
            <router-link v-if="isAdmin" class="custom-nav-item" to='/admin/FAQ'> Update FAQ </router-link>
            <router-link v-if="isAdmin" class="custom-nav-item" to='/admin/feedback'> View Feedback </router-link>
            <router-link v-if="!isAdmin" class="custom-nav-item" to="/faq" exact>FAQ</router-link>
            <router-link v-if="!isAdmin" class="custom-nav-item" to="/feedback" exact>Feedback</router-link>
            <router-link v-if="!isAdmin" class="custom-nav-item" to="/modules" exact>Modules</router-link>
            <router-link v-if="!isAdmin" class="custom-nav-item" to="/time" exact>Time</router-link>
            <router-link v-if="!isAdmin" class="custom-nav-item" to="/zoning" exact>Zoning</router-link>
            
            
        </nav> 
  </div>
</template>


<script>
import firebase from 'firebase'
export default {
    data:function() {
        return {
            isLoggedIn: false,
            currentUser : false,
            isAdmin: false
        }
    },
    created:function() {
        if(firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser;
            if(this.currentUser.email == "admin@nus.com") {
                this.isAdmin = true;
                console.log("Admin Account Logged In")
            }
        }

    },

    methods: {
        logoutUser() {
            firebase.auth().signOut().then(function() {
            // Sign-out successful.
            }).catch(function(error) {
            alert(error)
            });

            this.$router.push('/')
        },
        
    }
}
</script>

<!-- Need to removed scoped here to remove the white borders around our navi bar -->
<style>
    body {
        margin: 0 !important;
    }

    .navbar {
        background-color: whitesmoke;
        margin: 0 !important;
    }

    .topHead:after {
        content: "";
        display: table;
        clear: both;
    }
    .logo {
        font-size: 3em;
        color : #003D7C;
        text-align: left;
        float: left;
        width: 40%;
        margin-top: 10px;
        margin-left: 25px;
        padding-left: 0px;
        padding-top: 0px;
    }
    /*.logo:after {
        content: "";
        display: table;
        clear: both;
    }*/
    
    .custom-nav-item {
        font-size: 1.3em;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-weight: bold;
        color:#003D7C;
        letter-spacing: 0.75px;
        margin-left: 0px;
        text-decoration: none;
        padding-right: 20px;
    }

    .custom-nav-item:hover {
        border-bottom : #EF7C00;
    }

    .router-link-exact-active {
      color : #EF7C00;
    }

    .pagecontents {
        background-color: whitesmoke; 
        width: 100%;
        text-align:right;
        float: right;
        padding-bottom: 20px;
        margin: 0 !important;
        margin-top: 15px;
        margin-right: 25px;
        padding-right: 0px;
        padding-top: 0px;
    }
    .pagecontents:after {
        content: "";
        display: table;
        clear: both;
    }

    .logout_btn {
        float: right;
        font-size: 1.25em ;
        color:  #003D7C;
        margin-top: 20px;
        margin-right: 28px;
        padding-right: 0px;
        padding-top: 0px;
        
    }

    .logout_btn:hover {
        color: #EF7C00;
        cursor: pointer;
    }

    .btn {
        background-color: orange;
        color: white;
        padding: 7px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .btn:hover {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

/*
    .logout_btn {
        text-decoration: none;
        float: right;
        padding: 12px;
        margin: 15px;
        
        color: #EF7C00;
        width: 200px;
        background-color: white;
        transition: width .35s;
        -webkit-transition: width .35s;
        overflow: hidden;
        position: relative;
    }    

    .logout_btn:hover {
        width: 250px;
    }

    .btn {
        font-size: .8em;
        font-family: 'Oswald', sans-serif;
            position: relative;
        right: -18px;
        bottom: -4px;
        overflow: hidden;
        letter-spacing: 3px;
        opacity: 100%;
        transition: opacity .45s;
        -webkit-transition: opacity .35s;
        color:#EF7C00;
    }
*/
</style>
