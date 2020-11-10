<template>
   <div class="login">
        <div class = "logo">
                MySID
        </div>
       
        <h1>Login</h1>
        <form class="form">
            Email Address: <br>
            <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required> <br> <br>
            Password: <br>
            <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required> <br> <br>
            <input type="submit" id="submit" @click="doLogin($event)">
            <p>Don't have an account? <a href="/register">Sign up here</a>
            </p>
            
        </form>
        
        
    </div>
          

</template>

<script>
import firebase from 'firebase';
import database from '../firebase.js'

export default {
    data:function(){
        return {
            registerActive: false,
            emailLogin: "",
            passwordLogin: "",
            emptyFields: false,
        }
    },

    methods: {
        doLogin(event) {
            event.preventDefault()
            firebase.auth().signInWithEmailAndPassword(this.emailLogin, this.passwordLogin).then(
                user => { 
            console.log(user.emailLogin)
            if(this.emailLogin == 'admin@nus.com') {
                this.$router.push('/admin')
            } else {
                this.$router.push('/dashboard')
            }
            var date = new Date()            
            var dateString = date.getFullYear() + "-" + date.getMonth() + "-" + (date.getDate()+1);
            console.log(dateString)
            database.collection("login").doc(dateString).get().then(doc => {
                if (doc.exists) {
                    var count = doc.data().count
                    var x = count + 1
                    database.collection("login").doc(dateString).update({count: x})
                } else {
                    database.collection("login").doc(dateString).set({
                        count: 1
                    })
                }
            })
            
            },
            err => {
                alert(err.message)
            });
            
            },
        

    }
}
</script>

<style>
h1 {
    font-size: 2em;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color:#003D7C;
    text-decoration: none;
    text-align: center;
    padding-left: 8%;
    padding-right: 8%;
}

.logo {
        font-size: 3em;
        color : #003D7C;
        text-align: left;
        float: left;
        width: 100%;
        padding-left: 20px;
    }
.logo:after {
    content: "";
    display: table;
    clear: both;
}

.form-control {
    font-size: 1em;
    width: 260px;
}

.form {
   border-radius: 5px;
    background-color: #ebf1faff;
    padding: 30px;
    position: relative;
    margin: auto;
    text-align: center;
    font-size: 18px;
    width: 30%;
}


#submit {
  background-color: orange;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#submit:hover {
  background-color: orangered;
}
</style>