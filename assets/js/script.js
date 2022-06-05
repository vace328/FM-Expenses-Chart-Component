// Get data
let days = [];
let amounts = [];
let t = [];
let arr = [5, 9, 5, 1, 35, 4, 2];

function argMax(array) {
  // return index of the highest value in array
  return array.map((x, i) => [x, i]).reduce((r, a) => (a > r ? a : r))[1];

  // t =  array.map((x, i) => {
  //   console.log([x, i]);
  //   [x, i].reduce((r, a) => {
  //     console.log(r);
  //     console.log(a);
  //     console.log(a[0] > r[0] ? a : r);
  //     // (a[0] > r[0] ? a : r)
  //   });
  // })[0];

  // console.log(array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]);
}

async function displayChart() {
  const url = "../../data.json";
  try {
    const response = await fetch(url);
    let data = [];
    data = await response.json();
    days = data.map((a) => a.day);
    amounts = data.map((a) => a.amount);
    // Bar colors
    let color = amounts.map((x) => "#32a852");
    color[argMax(amounts)] = "red";
    // Bar hover colors
    let hoverColor = amounts.map((x) => "#b57772");
    hoverColor[argMax(amounts)] = "blue";

    // Create chart
    const ctx = document.getElementById("chart");
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
              padding: 0
            },
          },
          x: {
            offset: -50,                        
            grid: {
              display: false,
              drawBorder: false,
              drawTicks: false
            },
            ticks: {
              padding: 14
            }
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
  } catch (error) {
    console.log(error);
  }
}

displayChart();
