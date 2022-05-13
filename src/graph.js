import React, { useEffect, useState } from "react";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import Data from './Data/data';


  // detailStart = data[0][0];

const LineChart = (props) => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={props.options} />
      <MasterChart />
    </div>
  );
};

const MasterChart = (props) => {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: 350,
          width: '100%',
        }}
      >
        <HighchartsReact highcharts={Highcharts} options={props.options} />
      </div>
    </div>
  );
};

const Charts = ({DataAzukiGraph, kongxDataGraph}) => {




  useEffect(() => {



    console.log('kongxDataGraph', kongxDataGraph)
    let newchartLineOptions = {... chartLineOptions}

    newchartLineOptions.series[0].data = kongxDataGraph
    newchartLineOptions.series[1].data = DataAzukiGraph

    let newchartOptions = {... chartOptions}

    newchartOptions.series[0].data = kongxDataGraph
    // newchartOptions.series[1].data = DataAzukiGraph

    newchartOptions.series[0].pointStart = kongxDataGraph[0][1]
    newchartOptions.series[1].pointStart = DataAzukiGraph[0][1]

    setChartOptions(newchartOptions)

    setLineChartOptions(newchartLineOptions)


  }, [DataAzukiGraph])

  let data = DataAzukiGraph

  const [chartLineOptions, setLineChartOptions] = useState({
    chart: {
      marginBottom: 120,
      reflow: false,
      marginLeft: 50,
      marginRight: 20,
      style: {
        position: 'absolute',
      },
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Crypto Graph',
      align: 'left',
    },
    subtitle: {
      text: 'Select an area by dragging across the lower chart',
      align: 'left',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: null,
      },
      maxZoom: 0.1,
    },
    tooltip: {
      formatter: function () {

        console.log('this.points', this.points)
        var point = this.points[0];
        var point1 = this.points[1];
        return (
          '<b>' +
          'Graph' +
          '</b><br/>' +
          Highcharts.dateFormat('%A %B %e %Y', this.x) +
          ':<br/>' +
          point.series.name + ' = ' +
          Highcharts.numberFormat(point.y, 2) 
          +'<br/>' +
          ( point1 ? point1.series.name + ' = ' +
          Highcharts.numberFormat(point1.y, 2) : '') 
        );
      },
      shared: true,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              radius: 3,
            },
          },
        },
      },
    },
    series: [

      {
        name: 'kongxData',
        // pointStart: kongxDataGraph[0][0],
        pointInterval: 24 * 3600 * 1000,
        data: kongxDataGraph,
      },
      {
        name: 'DataAzuki',
        // pointStart: DataAzukiGraph[0][0],
        pointInterval: 24 * 3600 * 1000,
        data: DataAzukiGraph,
      },
    ],

    exporting: {
      enabled: false,
    },
  });

  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 100,
      reflow: false,
      borderWidth: 0,
      backgroundColor: null,
      marginLeft: 50,
      marginRight: 20,
      zoomType: 'x',
      events: {
        // listen to the selection event on the master chart to update the
        // extremes of the detail chart
        selection: function (event) {
          var extremesObject = event.xAxis[0],
            min = extremesObject.min,
            max = extremesObject.max,
            detailData = [],
            xAxis = this.xAxis[0];

          this.series[0].data.forEach((data) => {
            if (data.x > min && data.x < max) {
              detailData.push([data.x + 0.2, data.y]);
            }
          });

          // move the plot bands to reflect the new detail span
          xAxis.removePlotBand('mask-before');
          xAxis.addPlotBand({
            id: 'mask-before',
            from: data[0][0],
            to: min,
            color: 'rgba(0, 0, 0, 0.2)',
          });

          xAxis.removePlotBand('mask-after');
          xAxis.addPlotBand({
            id: 'mask-after',
            from: max,
            to: data[data.length - 1][0],
            color: 'rgba(0, 0, 0, 0.2)',
          });

          setLineChartOptions({
            series: [{ data: detailData }],
          });
          return false;
        },
      },
    },
    title: {
      text: null,
    },
    accessibility: {
      enabled: false,
    },
    xAxis: {
      type: 'datetime',
      showLastTickLabel: true,
      maxZoom: 14 * 24 * 3600000, // fourteen days
      plotBands: [
        {
          id: 'mask-before',
          from: data[0][0],
          to: data[data.length - 1][0],
          color: 'rgba(0, 0, 0, 0.2)',
        },
      ],
      title: {
        text: null,
      },
    },
    yAxis: {
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      min: 0.6,
      showFirstLabel: false,
    },
    tooltip: {
      formatter: function () {
        return false;
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        fillColor: {
          linearGradient: [0, 0, 0, 70],
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, 'rgba(255,255,255,0)'],
          ],
        },
        lineWidth: 1,
        marker: {
          enabled: false,
        },
        shadow: false,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        enableMouseTracking: false,
      },
    },

    series: [
      {
        type: 'area',
        pointInterval: 24 * 3600 * 1000,
        pointStart: kongxDataGraph[0][0],
        data: kongxDataGraph.slice(),
      },
      {
        type: 'area',
        pointInterval: 24 * 3600 * 1000,
        pointStart: DataAzukiGraph[0][1],
        data: DataAzukiGraph.slice(),
      },
    ],

    exporting: {
      enabled: false,
    },
  });

  return (
    <div>
      <LineChart options={chartLineOptions} />
      <MasterChart options={chartOptions} />
    </div>
  );
};

export default Charts
