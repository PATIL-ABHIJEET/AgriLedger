const profit = document.getElementById('profitChart');

new Chart(profit, {

    type: 'line',

    data: {

        labels: ['Jan','Feb','Mar','Apr','May','Jun'],

        datasets: [{

            label:'Profit',

            data:[12000,18000,15000,22000,28000,35000],

            borderColor:'#2D6A4F',

            backgroundColor:'rgba(45,106,79,.2)',

            fill:true,

            tension:.4

        }]

    }

});

const expense = document.getElementById('expenseChart');

new Chart(expense,{

    type:'doughnut',

    data:{

        labels:['Seeds','Fertilizer','Labor','Fuel'],

        datasets:[{

            data:[25,35,20,20],

            backgroundColor:[

                '#2D6A4F',

                '#40916C',

                '#74C69D',

                '#95D5B2'

            ]

        }]

    }

});