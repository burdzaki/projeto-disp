import { getElement } from "./dom";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip } from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip);

const displayGraphic = getElement<HTMLElement>('.result__output__graphic');
const ctx = getElement<HTMLCanvasElement>('#resultChart');

const data = {
    datasets: [{
        label: 'Gráfico de saída',
        data: [] as { x: number, y: number} [],
        backgroundColor: '#32A28C',
        borderColor: '#32A28C',
        pointHoverBackgroundColor: '#1D4C4C',
        pointHoverBorderColor: '#1D4C4C',
        borderWidth: 2,
        tension: 0.1
    }]
};

const graphicChart = new Chart (ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                align: 'center',
                text: 'GRÁFICO DE SAÍDA',
                font: {
                    family: 'Montserrat',
                    size: 20,
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                min: 0,
                title: {
                    display: true,
                    text: 'EIXO X',
                    font: {
                        family: 'Inter',
                        size: 15,
                    }
                }
            },
            y: {
                min: 0,
                title: {
                    display: true,
                    text: 'EIXO Y',
                    font: {
                        family: 'Inter',
                        size: 15,
                    }
                }
            }
        }
    }
});

export function addChartPoint(x: number, y: number): void {
    console.log('/////PONTO ADICIONADO');
    displayGraphic.style.display = 'block';
    data.datasets[0].data.push({ x, y });
    graphicChart.update();
};
