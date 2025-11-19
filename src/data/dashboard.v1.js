import {
    scatterDatetimeChild,
    dataSeries,
    generateDayWiseTimeSeries,
    randomizeArray,
    sparklineData,
} from '@/data/apexDataSeries'

export const dashboardOne = {
    series: [
        {
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
    ],
    chartOptions: {
        colors: ['rgba(196, 181, 253, 1)', '#8b5cf6'],
        chart: {
            type: 'bar',

            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 10,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: [
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
            ],
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return '$ ' + val + ' thousands'
                },
            },
        },
    },
}
export const baseColors = [
    '#a2ecf8ff',
    '#00d9ffff',
    '#2df800ff',
    '#f4e400ff',
    '#f50000ff',
]

export const dashboardBuckets = {
    chartOptions: {
        chart: { type: 'pie', height: 350 },
        dataLabels: { enabled: false },
        legend: { show: false },
        tooltip: {
            y: {
                formatter: (val) => {
                    return `${val}字节`
                },
            },
        },
    },
}

export const splineAreaWidgetTwo = {
    series: [
        {
            name: 'series2',
            data: [11, 90, 45, 32, 34, 52, 41],
        },
    ],

    chartOptions: {
        chart: {
            width: '90%',
            height: 100,
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        legend: {
            show: false,
        },

        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00',
                '2018-09-19T01:30:00',
                '2018-09-19T02:30:00',
                '2018-09-19T03:30:00',
                '2018-09-19T04:30:00',
                '2018-09-19T05:30:00',
                '2018-09-19T06:30:00',
            ],
            labels: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        grid: {
            show: false,
        },
        tooltip: {
            enabled: true,
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
        colors: ['#8b5cf6'],
        stroke: {
            curve: 'smooth',
            width: 1,
        },
    },
}
export const splineAreaWidgetThree = {
    series: [
        {
            name: 'series2',
            data: [41, 52, 34, 32, 45, 90, 11],
        },
    ],

    chartOptions: {
        chart: {
            width: '100%',
            height: 100,
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        legend: {
            show: false,
        },

        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00',
                '2018-09-19T01:30:00',
                '2018-09-19T02:30:00',
                '2018-09-19T03:30:00',
                '2018-09-19T04:30:00',
                '2018-09-19T05:30:00',
                '2018-09-19T06:30:00',
            ],
            labels: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        grid: {
            show: false,
        },
        tooltip: {
            enabled: true,
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
        colors: ['#f59e0b'],
        stroke: {
            curve: 'smooth',
            width: 1,
        },
    },
}
