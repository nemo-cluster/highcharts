$(function () {

  var filename = "nemo_rv_usage";
  var title = 'bwForCluster NEMO Usage';
  var subtitle = "Projects";
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
        // formatter: function (tooltip) {
        //   var items = this.points || splat(this),
        //     series = items[0].series,
        //     s;
        //   // sort the values
        //   items.sort(function (a, b) {
        //     return ((a.y < b.y) ? -1 : ((a.y > b.y) ? 1 : 0));
        //   });
        //   items.reverse();
        //   return tooltip.defaultFormatter.call(this, tooltip);
        // },
        // Formatierung der Gesamtsumme
        // pointFormat: '<tr><th style="color: {series.color}">{series.name}: </th>' + '<td style="text-align: right">{point.y}</td></tr><br/>',
        // pointFormat: '<tr><b><th style="color: {series.color}">{series.name}: </b></th>' + '<td style="text-align: right"><b>{point.y}</b></td></tr><br/>',
        // footerFormat: '<tr><th>Summe: </th>' + '<td style="text-align:right"><b>{point.total}%</b></td></tr>' + '</tbody></table>',
        footerFormat: '<tr><th>All projects: </th>' + '<td style="text-align:right">{point.total} %</td></tr>' + '</tbody></table>',
        // Datumsformat
        xDateFormat: '%B %Y',
        valueSuffix: ' %',
        // shared: true,
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
        // height: (1 / 2 * 100) + '%',
        zoomType: 'xy'
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
            text: 'DFG + Shareholder nodes: 900',
            align: 'right', // x: -5
            x: -5,
            rotation: 0,
            style: {
              color: 'red',
            }
          },
        }, {
          color: 'red',
          width: 1,
          value: Date.UTC(2022, 7, 1), // -1 month
          dashStyle: 'dashdot',
          label: {
            text: '836',
            align: 'right',
            x: -12,
            y: 23,
            rotation: 90, //align: 'right', x: -12, y: 23
            style: {
              color: 'red',
            }
          },
        }, {
          color: 'red',
          width: 1,
          value: Date.UTC(2022, 8, 1), // -1 month
          dashStyle: 'dashdot',
          label: {
            text: '625',
            align: 'left',
            y: 0,
            rotation: 90, // y: 0
            style: {
              color: 'red',
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
          //   // fontSize: '10px',
          //   // color: 'gray'
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

    });

  // Update title and subtitle
  function getRVTitle(callback) {
    $.get(csv, function (data) {
      callback(data);
    });
  }

  getRVTitle(function (data) {
    var update = data.match(/#Date: .*/)[0].split(/Date: */)[1];
    chart.options.exporting.filename = filename;
    chart.rangeSelector.update({
      // allButtonsEnabled: true,
      selected: 1,
    });
    chart.credits.update({
      text: credits + ", update: " + update,
    });
  });

});
