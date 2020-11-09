$(function () {
  var highchartsOptions = Highcharts.setOptions({
    
    exporting: {
      csv: {
        dateFormat: '%Y-%m',
        itemDelimiter: ';',
      },
      chartOptions: {
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        credits: {
          enabled: false
        },
        navigator: {
          enabled: false
        },
        rangeSelector: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        series: {
          dataLabels: {
            style: {
              fontSize: "14px",
              color: '#000000',
            },
          },
        },
        xAxis: {
          labels: {
            style: {
              fontSize: "14px",
              color: '#000000',
            },
          },
        },
        yAxis: {
          //tickInterval: 20,
          //gridLineColor: 'gray',
          //gridLineWidth: 0.5,
          title: {
            style: {
              fontSize: "16px",
              color: '#000000',
            },
          },
          labels: {
            style: {
              fontSize: "14px",
              color: '#000000',
            },
          },
          stackLabels: {
            style: {
              fontSize: '12px',
              color: '#000000',
            },
            // simple value without suffix
            formatter: function () {
              return (this.total);
            }
          },
        },
        legend: {
          itemHiddenStyle: {
            display: 'none',
            color: '#ffffff',
          },
          itemStyle: {
            fontSize: "14px",
            color: '#000000',
          },
        },
      },
      filename: 'nemo',
      printMaxWidth: 1920,
      sourceWidth: 1024,
      //width: 1024,
      //scale: 2,
    }
  });

});
