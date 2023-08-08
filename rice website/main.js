// 獲取canvas元素的引用
var barCtx = document.getElementById('barChart').getContext('2d');
var lineCtx = document.getElementById('lineChart').getContext('2d');
var barCtx2 = document.getElementById('barChart2').getContext('2d');
var barCtx3 = document.getElementById('barChart3').getContext('2d');


// 創建長條圖
var barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
            label: 'Emotion',
            data: [12, 19, 3, 5, 2, 4, 14, 43, 3, 12, 32, 42],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});





// 創建長條圖
var barChart2 = new Chart(barCtx2, {
    type: 'bar',
    data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
            label: 'Weather',
            data: [12, 19, 3, 5, 2, 4, 14, 43, 3, 12, 32, 42],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// 創建長條圖
var barChart3 = new Chart(barCtx3, {
    type: 'bar',
    data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
            label: 'Price',
            data: [12, 19, 3, 5, 2, 4, 14, 43, 3, 12, 32, 42],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



// 創建折線圖
var lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00','17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
        datasets: [{
            label: 'Cumulative Frequency',
            data: [12, 19, 3, 5, 2, 4, 14, 43, 3, 12, 32, 42, 12, 19, 3, 5, 2, 4, 14, 43, 3, 12, 32, 42],
            backgroundColor: '#b1c0e0',
            borderColor: '#4f6e9e',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// // 創建水平長條圖
// var horizontalBarChart = new Chart(horizontalBarCtx, {
//     type: 'bar',
//     data: {
//         labels: ['紅色', '藍色', '綠色'],
//         datasets: [{
//             data: [30, 20, 50],
//             backgroundColor: ['red', 'blue', 'green']
//         }]
//     },
//     options: {
//         scales: {
//             x: {
//                 beginAtZero: true
//             }
//         }
//     }
// });



