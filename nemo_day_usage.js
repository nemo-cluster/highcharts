$(function () {

  var filename = "nemo_day_usage";
  var title = 'bwForCluster NEMO Usage';
  var subtitle = "Daily usage";
  var csv = "https://cloud.nemo.uni-freiburg.de/anon/usage/chart/statistics/" + filename + ".csv" + "?q=" + Math.random();
  var credits = "2021 HPC Team, University of Freiburg";
  var web = "https://nemo-cluster.github.io/nemo/",

    chart = Highcharts.chart(filename, {

      credits: {
        enabled: true,
        href: web,
        text: credits,
      },

      rangeSelector: {
        enabled: true,
        verticalAlign: 'bottom',
        selected: 1,
        buttons: [{
          type: 'week',
          count: 1,
          text: '1w'
        }, {
          type: 'month',
          count: 1,
          text: '1m'
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        }, {
          type: 'month',
          count: 6,
          text: '6m'
        }, {
          type: 'month',
          count: 9,
          text: '9m'
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
          type: 'ytd',
          text: 'YTD'
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
        type: 'area',
        zoomType: 'x'
      },

      title: {
        text: title
      },

      subtitle: {
        text: subtitle
      },

      xAxis: {
        type: 'datetime',
        tickInterval: 30 * 24 * 3600 * 1000,
      },

      yAxis: {
        min: 0,
        max: 110,
        tickInterval: 10, // 10er Schritte
        title: {
          text: 'Node Usage [%]'
        },
      },

      data: {
        csvURL: csv
      },

      series: [{
        color: '#0080ff',
      }],

    });

  // Update title and subtitle
  function getDayTitle(callback) {
    $.get(csv, function (data) {
      callback(data);
    });
  }

  getDayTitle(function (data) {
    var update = data.match(/#Date: .*/)[0].split(/Date: */)[1];
    chart.options.exporting.filename = filename;
    chart.credits.update({
      text: credits + ", update: " + update,
    });
  });

});