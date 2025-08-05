import { showWizardHelpStep } from '../wizard';
import { getElement } from './dom';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip);

const undoChart = getElement<HTMLButtonElement>('#result__graphic__button--undo');
const redoChart = getElement<HTMLButtonElement>('#result__graphic__button--redo');
const cleanChart = getElement<HTMLButtonElement>('#result__graphic__button--clean');
const resetChart = getElement<HTMLButtonElement>('#result__graphic__button--reset');
const displayGraphic = getElement<HTMLElement>('.result__graphic');
const ctx = getElement<HTMLCanvasElement>('#result__graphic-chart');
const helpButton = getElement<HTMLButtonElement>('#result__graphic__button--help');

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

helpButton.addEventListener('click', () => {
    wizardGraphic()
});

const dataChart = {
    datasets: [{
        label: 'Relação Fn x Vcr/Vest',
        data: [] as { x: number, y: number} [],
        backgroundColor: '#32A28C',
        borderColor: '#32A28C',
        pointHoverBackgroundColor: '#1D4C4C',
        pointHoverBorderColor: '#1D4C4C',
        borderWidth: 2,
        tension: 0.1
    }]
};

const dataStrouhal = {
    datasets: [{
        label: 'Número de Strouhal para Estruturas Retangulares',
        data: [
            { x: 0 , y: 0.12 },
            { x: 1 , y: 0.12 },
            { x: 2 , y: 0.06 },
            { x: 3 , y: 0.06 },
            { x: 3.5 , y: 0.15 },
            { x: 5 , y: 0.11 },
            { x: 10 , y: 0.09 },
            { x: 12 , y: 0.09 },
        ],
        backgroundColor: '#5B5959',
        borderColor: '#5B5959',
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 2,
        tension: 0
    }]
};

let mainStock: {x: number, y: number }[] = [];
let redoStock: {x: number, y: number }[] = [];

const graphicChart = new Chart (ctx, {
    type: 'line',
    data: dataChart,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                align: 'center',
                text: 'Frequência Natural x Velocidade Crítica/Velocidade na Estrutura',
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
                    text: 'Fn (Hz)',
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
                    text: 'Vcr / Vest',
                    font: {
                        family: 'Inter',
                        size: 15,
                    }
                }
            }
        }
    }
});

export let graphicStrouhal: Chart<'line'>;

export function initializeStrouhalChart() {
    const ctx = getElement<HTMLCanvasElement>('#result__graphic-strouhal')
    if (graphicStrouhal) {
        graphicStrouhal.destroy(); // <-- ISSO É ESSENCIAL
    }

    graphicStrouhal = new Chart (ctx, {
        type: 'line',
        data: dataStrouhal,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    align: 'center',
                    text: 'Número de Strouhal para Estruturas Retangulares',
                    font: {
                        family: 'Montserrat',
                        size: 15,
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    min: 0,
                    max: 12,
                    title: {
                        display: true,
                        text: 'b/a',
                        font: {
                            family: 'Inter',
                            size: 15,
                        }
                    }
                },
                y: {
                    min: 0,
                    max: 0.16,
                    title: {
                        display: true,
                        text: 'St',
                        font: {
                            family: 'Inter',
                            size: 15,
                        }
                    }
                }
            }
        }
    });
}

export function highlightStrouhalPoint(strouhalRatio: number, st: number) {
  // Remove o ponto anterior (índice 1 se for sempre o destaque)
  if (graphicStrouhal.data.datasets.length > 1) {
    graphicStrouhal.data.datasets.pop(); // ou .splice(1, 1);
  }

  // Adiciona novo ponto
    graphicStrouhal.data.datasets.push({
    label: 'Valor calculado',
    data: [{ x: strouhalRatio, y: st }],
    backgroundColor: '#25A18E',
    borderColor: '#25A18E',
    pointRadius: 6,
    borderWidth: 0,
    showLine: false, // <- ESSENCIAL: impede que desenhe linha ligando
    });

  graphicStrouhal.update();
}

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

function wizardGraphic() : void {
    showWizardHelpStep(13);
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

function updateChart(): void {
  const validPoints = mainStock.filter(point =>
    point && typeof point.x === 'number' && typeof point.y === 'number'
  );

  undoChart.disabled = mainStock.length <= 1;
  redoChart.disabled = redoStock.length <= 1;

  dataChart.datasets[0].data = validPoints;
  graphicChart.update();
}
