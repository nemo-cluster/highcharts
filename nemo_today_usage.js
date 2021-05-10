$(function () {

  var filename = "nemo_today_usage";
  var title = 'bwForCluster NEMO Usage';
  var subtitle = "Usage today";
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
        selected: 3,
        buttons: [{
          type: 'hour',
          count: 3,
          text: '3h'
        }, {
          type: 'hour',
          count: 6,
          text: '6h'
        }, {
          type: 'hour',
          count: 12,
          text: '12h'
        }, {
          type: 'hour',
          count: 18,
          text: '18h'
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
        //tickInterval: 3600 * 1000,
      },

      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 10, // 10er Schritte
        title: {
          text: 'Node Usage [%]'
        },
      },

      data: {
        csvURL: csv
      },

      series: [{
        color: '#40ff00', // 02 FR
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