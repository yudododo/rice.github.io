// 獲取canvas元素的引用
var barCtx = document.getElementById('barChart').getContext('2d');
var lineCtx = document.getElementById('lineChart').getContext('2d');
var horizontalBarCtx = document.getElementById('horizontalBarChart').getContext('2d');

// 創建長條圖
var barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['一月', '二月', '三月', '四月', '五月'],
        datasets: [{
            label: '銷售數量',
            data: [12, 19, 3, 5, 2],
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
        labels: ['一月', '二月', '三月', '四月', '五月'],
        datasets: [{
            label: '銷售數量',
            data: [12, 19, 3, 5, 2],
            borderColor: 'rgba(75, 192, 192, 1)',
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


// 創建水平長條圖
var horizontalBarChart = new Chart(horizontalBarCtx, {
    type: 'horizontalBar',
    data: {
        labels: ['紅色', '藍色', '綠色'],
        datasets: [{
            data: [30, 20, 50],
            backgroundColor: ['red', 'blue', 'green']
        }]
    },
    options: {
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
});



