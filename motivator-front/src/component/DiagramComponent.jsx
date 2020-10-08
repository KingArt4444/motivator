import React, { Component } from 'react'
import Chart from 'chart.js';

class DiagramComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.drawDiagram = this.drawDiagram.bind(this)
    }

    componentDidMount() {

        this.drawDiagram();
    }

    drawDiagram() {
        var ctx = document.getElementById('myChart');
        ctx.parentNode.style.height = '500px';
        ctx.parentNode.style.width = '500px';
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Апрель', 'Май', 'Июнь'],
                datasets: [{
                    label: 'Оценка',
                    data: [8, 6, 7],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        var ctx2 = document.getElementById('myChart2');
        ctx2.parentNode.style.height = '500px';
        ctx2.parentNode.style.width = '500px';
        var myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['Апрель', 'Май', 'Июнь'],
                datasets: [{
                    label: 'Динамика размера премии',
                    data: [200, 170, 180],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    render() {
        return (
            <>
            <div className="row">
                <div>
                <canvas id="myChart" width="200" height="200"></canvas>
                </div>
                <div>
                <canvas id="myChart2" width="200" height="200"></canvas>
                </div>
            </div>
            
            <div className="container">
              <select className="form-control">
                  <option>Никита Стенник</option>
              </select>
            </div>
            </>
        )
    }
}

export default DiagramComponent