import { getElement } from './dom';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip);

const undoChart = getElement<HTMLButtonElement>('#result__graphic__button--undo');
const redoChart = getElement<HTMLButtonElement>('#result__graphic__button--redo');
const cleanChart = getElement<HTMLButtonElement>('#result__graphic__button--clean');
const resetChart = getElement<HTMLButtonElement>('#result__graphic__button--reset');
const displayGraphic = getElement<HTMLElement>('.result__graphic');
const ctx = getElement<HTMLCanvasElement>('#resultChart');


cleanChart.addEventListener('click', () => {
    cleanChartPoints();
});

resetChart.addEventListener('click', () => {
    resetChartPoints();
});

undoChart.addEventListener('click', () => {
    undoChartPoints();
});

redoChart.addEventListener('click', () => {
    redoChartPoints();
});

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

let mainStock: {x: number, y: number }[] = [];
let redoStock: {x: number, y: number }[] = [];

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

export function initializeChart() : void {
    mainStock = [ { x: 0, y: 0 }];
    redoStock = [...mainStock];
    updateChart();
}

export function addChartPoint(x: number, y: number): void {
    displayGraphic.style.display = 'block';
    mainStock.push({ x, y });
    redoStock = [...mainStock];
    updateChart();
    updateChart();
}

function cleanChartPoints() : void {
    mainStock = [];
    updateChart();
}

function resetChartPoints() : void {
    if (mainStock.length < redoStock.length) mainStock = [...redoStock];
    updateChart();
}

function undoChartPoints() : void {
    if (mainStock.length === 0) return;
    const pointRemoved = mainStock.pop()!;
    redoStock.push(pointRemoved);
    updateChart();
}

function redoChartPoints() : void {
    if (mainStock.length === 0) return;
    const pointRestored = redoStock.pop()!;
    mainStock.push(pointRestored);
    updateChart();
}

function updateChart() : void {
    data.datasets[0].data = mainStock;
    graphicChart.update();
}
