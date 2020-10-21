<template>
    <div class="app">
    <div id="container">
        <div id="first">
            <p id='personal_message'> Welcome back, John Doe </p>

        </div>
        <div id="second">
            <p id='school_term'> 
                <br>
                AY20/21 Semester 1, Week 13 </p>

        </div>
        
        <div id="clear"></div>
</div>
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    #container {
        width: 1500px;
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
        float: left;
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

</style>