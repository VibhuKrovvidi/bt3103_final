<template>
  <div>
    <div class = "logo">
                MySID
      </div>
    <h1> Register </h1>
    <div class="form">
      <form>
      
            Enter Your NUS Email: <br>
            <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required> <br> <br>
            
            Enter Your Password: <br>
            <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required> <br> <br>
            
            Enter Your Name:<br>
            <input v-model="entry.name" type="text" class="form-control" placeholder="Name" required> <br> <br>
            
            Select Your Activity Zone:<br>
            <select id="select_act" name="select_act" style="font-size:1em; color:#003D7C" v-model="entry.act_zone" required>
              <option value="A"> A </option>
              <option value="B"> B </option>
              <option value="C"> C </option>
              <option value="D"> D </option>
            </select> <br><br>

            Select Your Residential Zone:<br>
            <select id="select_res" name="select_res" style="font-size:1em; color:#003D7C" v-model="entry.res_zone" required>
              <option value="A"> A </option>
              <option value="B"> B </option>
              <option value="C"> C </option>
              <option value="D"> D </option>
            </select> <br><br>
            
            Select Your Residency: <br>
            <select id="resi" name="resi" style="font-size:1em; color:#003D7C" 
                    v-model="entry.residency">
                    <option value="NA"> NA </option>
                    <option value="Cinnamon"> Cinnamon College </option>
                      <option value="Tembusu"> Tembusu College </option>
                      <option value="RC4"> RC4 </option>
                      <option value="CAPT"> College of Alice & Peter Tan </option>
                      <option value="UTR"> UTown Residences </option>
                      <option value="RVRC"> Ridge View RC </option>
                      <option value="EH"> Eusoff Hall </option>
                      <option value="KRH"> Kent Ridge Hall </option>
                      <option value="KEH"> King Edward VII Hall </option>
                      <option value="RH"> Raffles Hall </option>
                      <option value="SH"> Sheares Hall </option>
                      <option value="TH"> Temasek Hall </option>
                      <option value="PGPH"> PGP House </option>
                      <option value="PGPR"> PGP Residences </option>
                      <option value="UTR"> UTown Residences </option>
              </select> <br> <br> 


            
            
            <input class="box" id="submit" type="submit" @click="registerUser($event)">

        </form>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import database from '../firebase.js'

export default {

  data:function() {
    return {
      registerActive: false,
      emailLogin: "",
      passwordLogin: "",
      entry: {
        name:"",
        act_zone:"",
        res_zone:"",
        residency:""
      }
      
    }
   
  },

  methods: {
    registerUser(event) {
      event.preventDefault()
      //console.log(this.emailLogin)
      //console.log(this.passwordLogin)
      alert("Registered")

      firebase.auth().createUserWithEmailAndPassword(this.emailLogin, this.passwordLogin)
      .then(user => { 
        console.log(user.emailLogin)
        this.$router.push({ path: '/'})
      },
      err => {
        alert(err.message)
      });
      

      //Update user's profile details.
      database.collection("users").doc(this.emailLogin).set({
          //user doucment require a field to exist
          dummy: "x",
      })
      database.collection("users").doc(this.emailLogin).collection("profile").add(
        this.entry
      )


      //console.log(this.entry)
      
      
    },

    
    
  }
}
</script>

<style scoped>
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

select {
  width : 150px;
}

input {
  width : 150px;
}

#form {
  padding: 30px;
  width: 40%;
  position: relative;
  float: left;
  margin: auto;
  border-radius: 20px;
  background:#ebf1faff;
  transition: all 0.2s ease-in-out;
  text-align: center;
}

.box {
  
  width: 180px;
  height: 50px;
  border-radius: 20px;
  background:#ebf1faff;
  transition: all 0.2s ease-in-out;
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  
}

.box:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
