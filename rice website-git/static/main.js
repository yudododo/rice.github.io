var barCtx = document.getElementById('barChart').getContext('2d');

function createChart(ctx, data, label, chartType) {
    console.log(data)
    console.log(label)
    return new Chart(ctx, {
        type: chartType,
        data: {
            labels: label, 
            datasets: [{
                label: 'Frequency',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: chartType === 'bar' ? false : true
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
}

fetch('/get_chart_data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Received data:', data);

        const labels = ['Mood', 'Weather', 'Price']; 
        count_data = data.patterns_data.data
        const chartData = [count_data.mood, count_data.weather, count_data.price]; 

        

        createChart(barCtx, chartData, labels, 'bar'); 
    })
    .catch(error => console.error('获取数据出错：', error));
