<template>
  <div>
    <div class = "logo">
                MySID
      </div>
    <h1> Register </h1>
    <form class="form-group">
            Enter Your NUS Email: <br>
            <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required> <br> <br>
            Enter Your Password: <br>
            <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required> <br> <br>
            Re-enter Password for Confirmation <br>
            <input v-model="passwordCheck" type="password" class="form-control" placeholder="Password" required> <br>
            
            <input type="submit" @click="registerUser($event)">
            
           
            
        </form>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data:function() {
    return {
      registerActive: false,
      emailLogin: "",
      passwordLogin: "",
      passwordCheck: "",
    }
   
  },

  methods: {
    registerUser(event) {
      
      console.log(this.emailLogin)
      console.log(this.passwordLogin)
      alert("Registered")

      firebase.auth().createUserWithEmailAndPassword(this.emailLogin, this.passwordLogin)
      .then(user => { 
        console.log(user.emailLogin)
        this.$router.push('/login')
      },
      err => {
        alert(err.message)
      });
      
      
      event.preventDefault()
    },
    
  }
}
</script>

<style>
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

h1 {
    font-size: 2em;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color:#003D7C;
    text-decoration: none;
    text-align: center;
    padding-left: 8%;
    padding-right: 8%;
}
</style>