const file = '../data.json';

class ChartData {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  getChartData() {
    fetch(this.dataFile)
    .then(response => response.json())
    .then(result => {
      const chartBlock = document.querySelector('.chart-block');
      let minData = Infinity;
      let maxData = 0;

      result.forEach(data => {
        if (data.amount < minData) minData = data.amount;
        if (data.amount > maxData) maxData = data.amount;
      });

      result.forEach(data => {
        let htmlContent = 
          `
          <div class="chart-bar-block">
            <div class="bar" style="height: ${(data.amount / maxData) * 100}px">${data.amount}</div>
            <p class="days">${data.day}</p>
          </div>
          `
        chartBlock.innerHTML += htmlContent;
      })
    });
  }
}

let chart = new ChartData(file);

chart.getChartData();
