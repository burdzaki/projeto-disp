import { showWizardHelpStep } from '../wizard';
import { getElement } from './dom';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip } from 'chart.js';
import annotationPlugin, { AnnotationOptions } from 'chartjs-plugin-annotation';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, annotationPlugin);

const undoChart = getElement<HTMLButtonElement>('#result__graphic-button--undo');
const redoChart = getElement<HTMLButtonElement>('#result__graphic-button--redo');
const cleanChart = getElement<HTMLButtonElement>('#result__graphic-button--clean');
const resetChart = getElement<HTMLButtonElement>('#result__graphic-button--reset');
const displayGraphic = getElement<HTMLElement>('.result__graphic');
const ctx = getElement<HTMLCanvasElement>('#result__graphic-chart');
const helpButton = getElement<HTMLButtonElement>('#result__graphic-button--help');

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
    options: {
        responsive: true,
        display: true
    },
    datasets: [{
        label: 'Velocidade do Vento na Estrutura x Elevação Z',
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

        // Construction of the curve based on discrete points from Table 33 of NBR 6123:2023 for rectangular section buildings
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
    
    // Reduction of the increase coefficient established by the NBR 6123:2023 for the analysis of the comparison criterius
    VcrAnnotationReduced = vcr / 1.25;

    // Verifies the existente of the graphicWind before includes the annotations
    if (!graphicWind.options.plugins?.annotation?.annotations) return;

    // Creates a local reference to the Chart.ts annotations object, enabling adding new annotation elements with proper typing
    const annotationConfig = graphicWind.options.plugins.annotation.annotations as Record<string, AnnotationOptions>;
    
    annotationConfig['vcrLine'] = {
            type: 'line',
            xMin: VcrAnnotation,
            xMax: VcrAnnotation,
            yMin: 0,
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
            yMin: 0,
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

    graphicWind.update();
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
        graphicStrouhal.destroy(); // Resets the graphic
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
  // Remove the previous point
  if (graphicStrouhal.data.datasets.length > 1) {
    graphicStrouhal.data.datasets.pop();
  }

  // Add new point
    graphicStrouhal.data.datasets.push({
    label: 'Valor calculado',
    data: [{ x: strouhalRatio, y: st }],
    backgroundColor: '#25A18E',
    borderColor: '#25A18E',
    pointRadius: 6,
    borderWidth: 0,
    showLine: false,
    });

  graphicStrouhal.update();
}

export function initializeChart() : void {
    cleanChartPoints();
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

export function resetChartPoints() : void {
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

export function resizeChart(): void {
  graphicWind.resize();
}
