$(function () {

    var filename = "nemo_queue_cores";
    var title = 'bwForCluster NEMO Queue';
    var subtitle = "NEMO Queued Cores";
    var csv = "https://cloud.nemo.uni-freiburg.de/anon/usage/chart/statistics/" + filename + ".csv" + "?q=" + Math.random();
    var credits = "2021 HPC Team, University of Freiburg";
    var web = "https://nemo-cluster.github.io/nemo/",

        chart = Highcharts.chart(filename, {
            credits: {
                enabled: true,
                href: web,
                text: credits,
            },

            tooltip: {
                borderWidth: 0,
                backgroundColor: 'none',
                shadow: false,
                style: {
                    fontSize: '16px'
                },
                // valueSuffix: '%',
                pointFormat: '{series.name}<br><span style="text-align: center; font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
                positioner: function (labelWidth) {
                    return {
                        x: (this.chart.chartWidth - labelWidth) / 2,
                        y: (this.chart.plotHeight / 2) + 40
                    };
                }
            },

            title: {
                text: title
            },

            subtitle: {
                text: subtitle
            },

            chart: {
                type: 'solidgauge',
                height: '100%',
            },

            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    outerRadius: '100%',
                    innerRadius: '76%',
                    backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, {
                    outerRadius: '75%',
                    innerRadius: '51%',
                    backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, {
                    outerRadius: '50%',
                    innerRadius: '26%',
                    backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }]
            },

            yAxis: {
                min: 0,
                lineWidth: 0,
                tickPositions: [],
                stops: [
                    [0.1, '#DF5353'], // red
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#55BF3B']  // green
                ]
            },

            data: {
                csvURL: csv,
                dataLabels: {
                    enabled: true,
                    padding: 0
                },
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },

            series: [{
                name: 'Running Cores',
                data: [{
                    radius: '100%',
                    innerRadius: '76%',
                }]
            }, {
                name: 'Idle Cores',
                data: [{
                    radius: '75%',
                    innerRadius: '51%',
                }]
            }, {
                name: 'Blocked Cores',
                data: [{
                    radius: '50%',
                    innerRadius: '26%',
                }]
            }]

        });

    // Update title and subtitle
    function getFreeCoresTitle(callback) {
        $.get(csv, function (data) {
            callback(data);
        });
    }

    getFreeCoresTitle(function (data) {
        var update = data.match(/#Date: .*/)[0].split(/Date: */)[1];
        chart.options.exporting.filename = filename;
        chart.credits.update({
            text: credits + ", update: " + update,
        });
    });

});
