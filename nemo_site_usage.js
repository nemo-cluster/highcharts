$(function () {

  var filename = "nemo_site_usage";
  var title = 'bwForCluster NEMO Usage';
  var subtitle = "Sites";
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
        // selected: 1,
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
          value: Date.UTC(2016, 8, 1), // -1 month
          dashStyle: 'dashdot',
          label: {
            text: 'DFG + SH nodes: 748',
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
          value: Date.UTC(2017, 9, 1), // -1 month
          dashStyle: 'dashdot',
          label: {
            text: 'DFG + SH nodes: 900',
            align: 'left',
            rotation: 0,
            style: {
              color: 'red',
            }
          },
        }, {
          color: 'red',
          width: 1,
          value: Date.UTC(2018, 12, 1), // -1 month
          dashStyle: 'dashdot',
          label: {
            text: 'DFG + Shareholder nodes: 920',
            align: 'left',
            rotation: 0,
            style: {
              color: 'red',
            }
          },
        }, {
          color: 'red',
          width: 1,
          value: Date.UTC(2022, 2, 1), // -1 month
          dashStyle: 'dashdot',
          label: {
            text: 'DFG + SH nodes: 900',
            align: 'right',
            x: -5,
            rotation: 0,
            style: {
              color: 'red',
            }
          },
        }],
      },

      //    yAxis: [{ // Primary yAxis
      yAxis: { // Primary yAxis
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
      //    }, { // Secondary yAxis
      //      min: 0,
      //      //max: 700,
      //      tickInterval: 50, // 50er Schritte
      //      title: {
      //        text: 'DFG Nodes',
      //      },
      //      labels: {
      //        format: '{value}',
      //      },
      //      opposite: true
      //    }],

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
        //      //color: '#740aff', // 01 HAW
        color: '#8DB600', // 01 HAW
        //      //  visible: false
      }, {
        //color: '#ccff00', // 02 FR
        color: '#f3c300', // 02 FR
      }, {
        //color: '#ff0000', // 11 UL
        color: '#0067A5', // 03 HD
      }, {
        //      //color: '#00998f', // 07 KN
        color: '#e68fac', // 04 HO
      }, {
        //color: '#0066ff', // 06 KA
        color: '#008856', // 05 KA
      }, {
        //      //color: '#ff9800', // 09 ST
        color: '#c2b280', // 06 KN
      }, {
        //      //color: '#33ff00', // 03 HD
        color: '#be0032', // 07 MA
      }, {
        //color: '#ff0099', // 10 TU
        color: '#a1caf1', // 08 ST
      }, {
        //color: '#00fffe', // 04 HO
        color: '#f38400', // 09 TU
      }, {
        //      //color: '#990000', // 08 MA
        color: '#875692', // 10 UL
      }, {
        //color: '#808080', // 12 Sonstige
        color: '#222222' // 11 Sonstige
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
  function getSTitle(callback) {
    $.get(csv, function (data) {
      callback(data);
    });
  }

  getSTitle(function (data) {
    var update = data.match(/#Date: .*/)[0].split(/Date: */)[1];
    chart.options.exporting.filename = filename;
    chart.credits.update({
      text: credits + ", update: " + update,
    });
  });

});