let url = "../../data.json";
const ctx = document.getElementById("chart");
let allData = [];
let days = [];
let amounts = [];
let maxAmount = 0;
let color = [];
let hoverColor = [];

function getLargestNum(array) {
  const max = Math.max(...array);
  const index = array.indexOf(max);
  return index;
}

function isSmallScreen() {
  if (screen.width < 375) {
    return true;
  } else {
    return false;
  }
}
const tooltipFontSize = () => {
  let fSize = {};
  if (isSmallScreen()) {
    fSize.size = 15;
  } else {
    fSize.size = 20;
  }
  return fSize;
};

const xLabelsFont = () => {
  let fSize = {};
  if (isSmallScreen()) {
    fSize.size = 12;
  } else {
    fSize.size = 15;
  }
  return fSize;
};

function createChart(amounts, color, hoverColor) {
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: days,
      datasets: [
        {
          label: "",
          data: amounts,
          barThickness: "flex",
          backgroundColor: color,
          hoverBackgroundColor: hoverColor,
          borderRadius: 3,
          borderSkipped: false,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: 32,
          left: 2,
          bottom: 0,
          right: 0,
        },
      },
      scales: {
        y: {
          grid: {
            display: false,
            drawBorder: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
            padding: 0,
          },
        },
        x: {
          // offset: -50,
          grid: {
            display: false,
            drawBorder: false,
            drawTicks: false,
          },
          ticks: {
            padding: 14,
            font: xLabelsFont,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          displayColors: false,
          caretSize: 0,
          caretPadding: 8,
          xAlign: "center",
          yAlign: "bottom",
          bodyFont: tooltipFontSize,
          callbacks: {
            title: function (tooltipItems, data) {
              return "";
            },
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
    },
  });
}

async function getDataAndDisplayChart() {
  try {
    const response = await fetch(url);
    allData = await response.json();
    days = allData.map((a) => a.day);
    amounts = allData.map((a) => a.amount);
    maxAmount = getLargestNum(amounts);
    // console.log(allData);
    color = amounts.map((x) => "hsl(10, 79%, 65%)");
    color[maxAmount] = "hsl(186, 34%, 60%)";
    hoverColor = amounts.map((x) => "#FF9B87");
    hoverColor[maxAmount] = "#B4DFE5";
    createChart(amounts, color, hoverColor);
  } catch (error) {
    console.log(error);
  }
}

getDataAndDisplayChart();
