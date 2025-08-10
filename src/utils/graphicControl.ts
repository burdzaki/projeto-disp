import { showWizardHelpStep } from '../wizard';
import { getElement } from './dom';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip } from 'chart.js';
import annotationPlugin, { AnnotationOptions } from 'chartjs-plugin-annotation';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, annotationPlugin);

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
        borderWidth: 2.5,
        pointRadius: 1.25,
        tension: 0.25
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


export function addVcrLines(vcr: number): void {
    let VcrAnnotation: number = 0; 
    let VcrAnnotationReduced: number = 0;
    VcrAnnotation = vcr;
    VcrAnnotationReduced = vcr / 1.25;

    if (!graphicWind.options.plugins?.annotation?.annotations) return;

    const annotationConfig = graphicWind.options.plugins.annotation.annotations as Record<string, AnnotationOptions>;
    
    annotationConfig['vcrLine'] = {
            type: 'line',
            xMin: VcrAnnotation,
            xMax: VcrAnnotation,
            borderColor: '#641212ff',
            borderWidth: 2,
            label: {
                display: true,
                content: 'Vcr',
                position: 'start',
                rotation: 270,
                xAdjust: -10,
                color: '#fff',
                font: {
                    family: 'Inter',
                    size: 12,
                }
            },
    }
    annotationConfig['vcrLineReduced'] = {
            type: 'line',
            xMin: VcrAnnotationReduced,
            xMax: VcrAnnotationReduced,
            borderColor: '#5B5959',
            borderWidth: 2,
            label: {
                display: true,
                content: '0,8.Vcr',
                position: 'start',
                rotation: 270,
                xAdjust: -10,
                color: '#fff',
                font: {
                    family: 'Inter',
                    size: 12,
                }
            },
    };
    annotationConfig['redBox'] = {
    type: 'box',
        xMin: VcrAnnotation,
        backgroundColor: 'rgba(255, 99, 132, 0.25)'
    }

    graphicWind.update;
}

let mainStock: {x: number, y: number }[] = [];
let redoStock: {x: number, y: number }[] = [];

const graphicWind = new Chart (ctx, {
    type: 'line',
    data: dataChart,
    options: {
        responsive: true,
        plugins: {
            annotation: {
                annotations: {} as Record<string, AnnotationOptions>
            },
            title: {
                display: true,
                align: 'center',
                text: 'Velocidade do Vento na Estrutura x Elevação Z',
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
                title: {
                    display: true,
                    text: 'Vest (m/s)',
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
                    text: 'Elevação Z (m)',
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

export function initializeStrouhalChart(): void {
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

export function highlightStrouhalPoint(strouhalRatio: number, st: number): void {
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
    mainStock = [ { x: 0, y: 0 } ];
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
    mainStock = [ { x: 0, y: 0 } ];
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
  graphicWind.update();
}
