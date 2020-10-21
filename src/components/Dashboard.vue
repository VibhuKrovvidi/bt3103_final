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

        <div id="container">
            <div id="third">
             </div>
            <div id="fourth">
                <p id='updates'> Latest Updates </p>
            </div>
        </div>
        <div id="clear"></div>


        <div id="container">
            <div id="third">
             </div>
            <div id="fourth">
                <div id="rcorners2">

                </div>
            </div>
        </div>
        <div id="clear"></div>

        </div>

</template>

<script>
export default {
    
}
</script>

<style scoped>
    #container {
        width: 100%;
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
        float: right;
        height: 100px;

    }

    #third {
        width: 50px;
        float: left;
        height: 100px;
        align-content: left ;
        background-color: white;
    }
    #fourth {
        width: 800px;
        float: left;
        height: 100px;
        background-color:white;

    }

    #updates {
        font-family: Arial, Helvetica, sans-serif;
        text-align: left;
        font-size: 30px;
        text-decoration: underline;

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

    #rcorners2 {
        border-radius: 25px;
        border: 2px solid red;
        padding: 20px;
        width: 1000px;
        height: 300px;
}

</style>