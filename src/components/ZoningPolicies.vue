<template>
    <div>
        <navi></navi>
        <h1> Zoning </h1>
        <h3>Zoning Policies</h3>
        <h3> Filter By:
            <select v-model="selectedoption">
                <option value="Campus Policies">Campus Policies</option>
                <option value="Visitor Policies">Visitor Policies</option>
                <option value="Student Life and CCA Activities">Student Life and CCA Activities</option>
                <option value="Residential Policies">Residential Policies</option>
                <option value="Other Policies">Other Policies</option>
            </select></h3>
        
        <br><br>

        <table>
            <tr>
                <th> Date </th>
                <td> Title </td>
            </tr>
            <tr>
                <th> Date </th>
                <td> Title </td>
            </tr>
        </table>

        <button id=back v-on:click="redirectToZoning()"> Back </button>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedoption: ""
        }
    },

    methods: {
        redirectToZoning() {
            this.$router.push({path: '/zoning'})
        }
    }

    

}
</script>


<style scoped>
button {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 16px;
        margin: 20px;
        text-align:'center';
        width: 100px;
        height: 40px;
        background: orange;
        color: white;
        background-color: #EF7C00;
        border-radius: 4px;
        float: center;
    }

button:hover {
    background-color: orangered;
}

#back {
    right: 0;
    bottom: 0;
    position: absolute;
    background-color: #003D7C;

}

table {
        border-collapse:collapse;
        margin-left: auto;
        margin-right: auto;
        width: 80%;   
      }

td, th {
        border: 1px solid black;
        padding: 8px;
      }

tr:nth-child(even){
        background-color: #ebf1faff;
      }

</style>

        