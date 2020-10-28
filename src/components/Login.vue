<template>
   <div class="login">
        <div class = "logo">
                MySID
        </div>
        <h1>Login</h1>
        <form class="form-group">
            <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required> <br> <br>
            <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required> <br> <br>
            <input type="submit" @click="doLogin($event)">
            <p>Don't have an account? <a href="/register">Sign up here</a>
            </p>
            
        </form>
        
    </div>
          

</template>

<script>
import firebase from 'firebase';

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
            this.$router.push('/dashboard')
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
</style>