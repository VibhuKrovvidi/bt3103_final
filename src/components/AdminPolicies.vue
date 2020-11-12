<template>
    <div>
        <navi></navi>
        <br><br>
        <h1> Admin </h1>
        <h3> Policies </h3>

        <br><br>

        <form>
            <label>Policy Category</label>
            <select v-model="entry.category" required>
                <option value="Campus Policies">Campus Policies</option>
                <option value="Visitor Policies">Visitor Policies</option>
                <option value="Student Life and CCA Activities">Student Life and CCA Activities</option>
                <option value="Residential Policies">Residential Policies</option>
                <option value="Other Policies">Other Policies</option>
            </select>

            <br><br>

            <label>Date</label>
            <input type=date v-model="entry.date">

            <br><br>

            <label>Title</label>
            <input type=text v-model="entry.title">

            <br><br>

            <label>Content</label>
            <textarea v-model="entry.content" rows=15></textarea>

            <br><br>

            <button v-on:click.prevent="sub" id=submit > Submit </button>
        </form>

        <button id=back v-on:click="redirectToAdmin()"> Back </button>

    </div>
    
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            entry: {
            category: "",
            date: "",
            title: "",
            content: ""
            }
        }
    },

    methods: {
        sub: function() {
            database.collection("circulars").add(this.entry)
                    this.entry.category=''
                    this.entry.date=''
                    this.entry.title=''
                    this.entry.content=''
                    this.$router.push({ path: '/admin'});
        },

        redirectToAdmin() {
            this.$router.push({path: '/admin'})
        }
    }
    
}
</script>

<style scoped>
input[type=text], input[type=date], select, textarea  {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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

#back {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 16px;
    margin: 20px;
    text-align:'center';
    width: 100px;
    height: 40px;
    color: white;
    border-radius: 4px;
    right: 0;
    bottom: 0;
    position: fixed;
    background-color: #003D7C;

}

form {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 30px;
  position: relative;
  margin: auto;
  text-align: left;
  font-size: 18px;
  width: 60%;
}

</style>
