$(function () {

  var filename = "nemo_rv_top10";
  var title = 'bwForCluster NEMO Usage';
  var subtitle = "Top 10 projects usage last year";
  var csv = "https://cloud.nemo.uni-freiburg.de/anon/usage/chart/statistics/" + filename + ".csv" + "?q=" + Math.random();
  var credits = "2020 HPC Team, University of Freiburg";
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
        //pointFormat: '<tr><b><th style="color: {series.color}">{series.name}: </b></th>' + '<td style="text-align: right"><b>{point.y:.0f}</b></td></tr><br/>',
        //pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
        pointFormat: '<span style="color:{point.color}">●</span>  <b>{point.y}</b><br/>',
        //footerFormat: '<tr><th>Summe: </th>' + '<td style="text-align:right"><b>{point.total}%</b></td></tr>' + '</tbody></table>',
        footerFormat: '<tr><th>Summe: </th>' + '<td style="text-align:right">{point.total:.2f}%</td></tr>' + '</tbody></table>',
        // Datumsformat
        xDateFormat: '%B %Y',
        valueSuffix: ' %',
        // split: true,
        padding: 2
      },

      chart: {
        type: 'pie',
        // height: 800,
      },

      title: {
        text: title
      },

      subtitle: {
        text: subtitle
      },

      xAxis: {
        type: "category",
        stackLabels: {
          enabled: true,
          align: 'center',
          // style: {
          //   fontSize: '12px',
          //   color: 'gray'
          // },
          formatter: function () {
            return (this.total);
          }
        }
      },

      data: {
        csvURL: csv,
        dataLabels: {
          enabled: true,
          padding: 0
        },
      },

      plotOptions: {
        "pie": {
          "allowPointSelect": true,
          "cursor": true
        },
        "series": {
          "dataLabels": {
            "enabled": true,
            "format": "{key}: {y:.2f}%"
          }
        }
      },

    });

  // Update title and subtitle
  function getRVTopTitle(callback) {
    $.get(csv, function (data) {
      callback(data);
    });
  }

  getRVTopTitle(function (data) {
    var update = data.match(/#Date: .*/)[0].split(/Date: */)[1];
    var period = data.match(/#Period: .*/)[0].split(/Period: */)[1];
    chart.options.exporting.filename = filename;
    chart.setTitle({
      text: title
    }, {
      text: subtitle + ", period: " + period,
    });
    chart.credits.update({
      text: credits + ", update: " + update,
    });
  });

});