<template>
<div class="app">
    <div class = "logo"> MySID </div>
    
    <div id="container">
        
        <div id="login">
            
            <button class="redirector" @click="redirect($event)"  @mouseover="hover3 = true" @mouseleave="hover3 = false"> 
                <h4 v-if="!hover3"> MySID: The Student Information Dashboard </h4>
                <h4 v-if="hover3"> Login </h4>
                <img class="nuslogo" src="../assets/nuslogo.png">
                
                
                </button>
        </div>
        <div id="first" @mouseover="hover1 = true" @mouseleave="hover1 = false">
            <h3 id='component_header' > Take Control Of Your Time </h3>
                <p id='time_content' v-if="hover1">
                    fkejajkanjkanna
                </p>

        </div>
        <div id="second" @mouseover="hover2 = true" @mouseleave="hover2 = false">
            <h3 id='component_header'> Information at your fingertips </h3>
            <p id='nus_content' v-if="hover2">
                ffkejajkanjkanna
            </p>

        </div>
        
        
        
</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            hover1 : false,
            hover2 : false,
            hover3 : false
        }
        
    },
    methods : {
        redirect:function(event) {
            event.preventDefault()
            this.$router.push({ path: '/login'})
        }
    }
}
</script>

<style scoped>
    #header {
        width: 100%;
        background-color: red;
        height: 30px;
    }

    #container {
        width: 1000px;
        background-color:white;
        margin: auto;
    }
    #first {
        width: 500px;
        float: left;
        height: 300px;
        background-color:#526C80;
        border-color: white;
    }
    #first:hover {
        background-color:#003D7C;
        color:white;
        height: 600px;
    }
    
    #second {
        width: 500px;
        float: left;
        height: 300px;
        background-color: #F5AD69;
        border-color: white;
    }

    #second:hover{
        background-color: #EF7C00;
        color: white;
        height: 600px;
    }
    
    #component_header {
        color: whitesmoke;
        font-size: 30px;
    }
    #clear {
        clear: both;
    }

    .nuslogo {
        width: 340px;
        height: 340px;
        object-fit: cover;
        
    }

    .redirector {
        width: 1000px;
        height: 500px;
        background: white;
        color: #003D7C;
        font-size: 30px;
        border: none;
        cursor:pointer

    }

    .redirector:hover {
        background: whitesmoke;
    }


    h4 {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-weight: bold;
        color:#003D7C;
        letter-spacing: 0.75px;
        margin-left: 0px;
        text-decoration: none;
        padding-right: 0px;
    }

</style>