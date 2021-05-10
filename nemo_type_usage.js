$(function () {

  var filename = "nemo_type_usage";
  var title = 'bwForCluster NEMO Usage';
  var subtitle = "Virtaul Research Environments";
  var csv = "https://cloud.nemo.uni-freiburg.de/anon/usage/chart/statistics/" + filename + ".csv" + "?q=" + Math.random();
  var credits = "2021 HPC Team, University of Freiburg";
  var web = "https://nemo-cluster.github.io/nemo/",

    chart = Highcharts.chart(filename, {

      credits: {
        enabled: true,
        href: web,
        text: credits,
      },

      // Formatierung der Tooltips (oben)
      tooltip: {
        // Formatierung der Gesamtsumme
        // pointFormat: '<tr><th style="color: {series.color}">{series.name}: </th>' + '<td style="text-align: right">{point.y}</td></tr><br/>',
        // pointFormat: '<tr><b><th style="color: {series.color}">{series.name}: </b></th>' + '<td style="text-align: right"><b>{point.y}</b></td></tr><br/>',
        //footerFormat: '<tr><th>Summe: </th>' + '<td style="text-align:right"><b>{point.total}%</b></td></tr>' + '</tbody></table>',
        footerFormat: '<tr><th>Sum: </th>' + '<td style="text-align:right">{point.total} %</td></tr>' + '</tbody></table>',
        // Datumsformat
        xDateFormat: '%B %Y',
        valueSuffix: ' %',
        shared: true,
        // split: true,
        padding: 2
      },

      rangeSelector: {
        enabled: true,
        verticalAlign: 'bottom',
        selected: 1,
        buttons: [{
          type: 'month',
          count: 6,
          text: '6m'
        }, {
          type: 'year',
          count: 1,
          text: '1y'
        }, {
          type: 'year',
          count: 2,
          text: '2y'
        }, {
          type: 'year',
          count: 3,
          text: '3y'
        }, {
          type: 'year',
          count: 4,
          text: '4y'
        }, {
          type: 'year',
          count: 5,
          text: '5y'
        }, {
          type: 'all',
          text: 'All'
        }],
      },

      navigator: {
        enabled: true,
        series: {
          includeInCSVExport: false
        },
      },

      scrollbar: {
        enabled: true,
        showFull: false,
      },

      chart: {
        type: 'column',
        zoomType: 'x'
      },

      title: {
        text: title
      },

      subtitle: {
        text: subtitle
      },

      xAxis: {
        plotLines: [{
          color: 'red',
          width: 1,
          value: Date.UTC(2016, 8, 1),
          dashStyle: 'dashdot',
          label: {
            text: 'DFG nodes: 748',
            align: 'left',
            rotation: 0,
            style: {
              color: 'red',
              // fontSize: 10,
            }
          },
        }, {
          color: 'red',
          width: 1,
          value: Date.UTC(2017, 9, 1),
          dashStyle: 'dashdot',
          label: {
            text: 'DFG + Uni nodes: 900',
            align: 'left',
            rotation: 0,
            style: {
              color: 'red',
              // fontSize: 10,
            }
          },
        }, {
          color: 'red',
          width: 1,
          value: Date.UTC(2018, 12, 1),
          dashStyle: 'dashdot',
          label: {
            text: 'DFG + Uni nodes: 920',
            align: 'right',
            x: -5,
            rotation: 0,
            style: {
              color: 'red',
              // fontSize: 10,
            }
          },
        }],
      },

      yAxis: {
        min: 0,
        max: 120,
        tickInterval: 10, // 10er Schritte
        title: {
          text: 'Usage [%]'
        },
        stackLabels: {
          enabled: true,
          align: 'center',
          // style: {
          //   fontSize: '10px',
          //   color: 'gray'
          // },
          formatter: function () {
            return (this.total) + ' %';
          }
        }
      },

      data: {
        csvURL: csv
      },

      plotOptions: {
        column: {
          stacking: 'normal',
          pointPadding: 0,
          borderWidth: 0.5,
          series: {
            colorByPoint: true
          }
        },
        series: {
          showInNavigator: true,
        },
      },

      series: [{
        //color: '#40ff00', // 05 HS
        color: '#f38400', // 05 HS
      }, {
        //color: '#0080ff', // 07 KN
        color: '#8db600', // 07 KN
      }, {
        type: 'line',
        color: '#e1f0c2', // DFG 3M
        visible: false,
        showInNavigator: false,
      }, {
        type: 'line',
        color: '#c7e48e', // DFG 37M
        visible: false,
        showInNavigator: false,
      }],
    });

  // Update title and subtitle
  function getTTitle(callback) {
    $.get(csv, function (data) {
      callback(data);
    });
  }

  getTTitle(function (data) {
    var update = data.match(/#Date: .*/)[0].split(/Date: */)[1];
    chart.options.exporting.filename = filename;
    chart.credits.update({
      text: credits + ", update: " + update,
    });
  });

});