$(function () {

    var filename = "nemo_cores_free";
    var title = 'bwForCluster NEMO Queue';
    var subtitle = "Freed Cores (% of currently reserved cores for jobs) in the next 6h, 12h, 24h and 48h";
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
                valueSuffix: '%',
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
                    outerRadius: '115%',
                    innerRadius: '91%',
                    backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, {
                    outerRadius: '90%',
                    innerRadius: '66%',
                    backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, {
                    outerRadius: '65%',
                    innerRadius: '41%',
                    backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, {
                    outerRadius: '40%',
                    innerRadius: '16%',
                    backgroundColor: Highcharts.color(Highcharts.getOptions().colors[3])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }]
            },

            yAxis: {
                min: 0,
                max: 100,
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
                name: '24h',
                data: [{
                    radius: '115%',
                    innerRadius: '91%',
                }]
            }, {
                name: '12h',
                data: [{
                    radius: '90%',
                    innerRadius: '66%',
                }]
            }, {
                name: '6h',
                data: [{
                    radius: '65%',
                    innerRadius: '41%',
                }]
            }, {
                name: '1h',
                data: [{
                    radius: '40%',
                    innerRadius: '16%',
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
