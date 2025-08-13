import { getElement } from "./utils/dom";
import { wasResultAlreadyShown } from "./output";
import { debounce } from "./utils/validation";
import { getWindMode } from "./utils/windControl";

const wizard = getElement<HTMLElement>('#wizard');
const wizardContainer = getElement<HTMLElement>('.wizard__container');
const wizardTitle = getElement<HTMLElement>('.wizard__title');
const wizardText = getElement<HTMLElement>('.wizard__text');
const helpButton = getElement<HTMLElement>('#header-link-help');
const closeButton = getElement<HTMLButtonElement>('#wizard__button--close');
const backButton = getElement<HTMLButtonElement>('#wizard__button--back');
const nextButton = getElement<HTMLButtonElement>('#wizard__button--next');

interface WizardStep {
    title: string;
    text: string;
    selector: string;
}

const wizardSteps: WizardStep[] = [
    {   //step 0
        title: 'Bem-vindo(a)! Precisa de ajuda?',
        text: '<p>Esse guia vai te mostrar, passo a passo, como utilizar a ferramenta desenvolvida seguindo os critérios estabelecidos pela NBR 6123:2023.</p>',
        selector: '.main__title'
    },
    {   //step 1
        title: 'Cálculo da Esbeltez',
        text: '<p>A esbeltez calculada aqui é a razão entre altura (h) e a menor dimensão da estrutura (d0) e ajuda a identificar o risco de desprendimento de vórtices - se seu resultado for igual ou maior que 6, os efeitos dinâmicos da estrutura devem ser investigados.</p>',
        selector: '.inputs--slenderness'
    },
    {   //step 2
        title: 'Altura h (m)',
        text: 'Informe, em metros, a altura total da edificação a ser analisada.</p>',
        selector: '#structure-height'
    },
    {   //step 3
        title: 'Dimensão d0 (m)',
        text: '<p>Informe, em metros, a menor dimensão transversal da estrutura (perpendicular à direção do vento).</p>',
        selector: '#dimension-d0'
    },
    {   //step 4
        title: 'Parâmetros para cálculo das velocidades de vento na estrutura',
        text:  '<p>Nessa seção você irá preencher os parâmetros necessários para calcular a velocidade do vento que atua na edificação, de acordo com suas características e localização.<br>A seguir, entre com os parâmetros para cálculo da velocidade crítica do vento na edificação, de acordo com suas dimensões e frequência natural de vibração.</p>',
        selector: '.inputs--parameters'
    },
    {   //step 5
        title: 'Velocidade básica V0 (m/s)',
        text:  '<p>A velocidade básica de vento adotada pela NBR 6123:2023 é a velocidade de uma rajada de 3 segundos, a 10 m acima do terreno em campo aberto e pleno, excedida em média uma vez em 50 anos. Escolha entrar com um valor estimado por você (em metros/segundo) ou pesquisar estado e cidade de acordo com a lista de isopletas disponibilizada pela <strong>Elgin</strong>. <br>Obs.: A fonte desse índice pode ser verificada na aba Sobre.</p>',
        selector: '#input__speed-V0'
    },
    {   //step 6
        title: 'Fator topográfico S1',
        text:  '<p>Esse fator considera o escoamento do ar é determinado de acordo com a topografia do terreno. Seus valores variam de acordo com o relevo: <br><br><strong>• Plano/fracamente acidentado:</strong> S1 = 1,0 <br><strong>• Talude/morro:</strong> Valor deve ser calculado conforme a NBR 6123:2023 <br><strong>• Vale profundo/protegido de ventos de qualquer direção:</strong> S1 = 0,9.<br><br>Digite o valor que corresponde ao terreno da sua edificação.</p>',
        selector: '#topographic-factor-S1'
    },
    {   //step 7
        title: 'Rugosidade do terreno',
        text:  '<p>Utilizada na determinação do parâmetro metereológico bm e o expoente de lei potencial p, é classificada de acordo com a NBR 6123:2023 em cinco categorias de acordo com o entorno da edificação e a cota média de topo dos obstáculos ao seu redor:<br><br><strong>• Categoria I:</strong> Superfícies lisas de grandes dimensões (cota média = 0 m) <br><strong>• Categoria II:</strong> Terrenos abertos com poucos obstáculos espaçados (cota média ≤ 1,0 m) <br><strong>• Categoria III:</strong> Terrenos planos com obstáculos baixos e edificações esparsas (cota média = 3,0 m) <br><strong>• Categoria IV:</strong> Terrenos cobertos por obstáculos numerosos e pouco espaçados (cota média = 10 m)<br><strong>• Categoria V:</strong> Terrenos cobertos por obstáculos numerosos, altos e pouco espaçados (cota média ≥ 25 m)<br><br>Selecione a Categoria que melhor corresponde aos entornos do seu edifício.</p>',
        selector: '#input__structure-category'
    },
    {   //step 8
        title: 'Elevação Z (m)',
        text:  '<p>Essa é altura da seção da edificação onde você quer avaliar a ocorrência do desprendimento de vórtices. Ela é utilizada no cálculo do fator S2, que considera a influência da rugosidade do terreno, dimensões da edificação e sua altura sobre o terreno para um intervalo de tempo de atuação do vento de 10 minutos e um fator de rajada (Fr) de 0,69.<br><br>Obs.: Essa seção possui preenchimento automático da altura da edificação em metros, <strong>mas você deve avaliar se essa dimensão corresponde a sua verificação.</strong></p>',
        selector: '#elevation-Z'
    },
    {   //step 9
        title: 'Fator estatístico S3',
        text:  '<p>Esse fator considera o grau de segurança e vida útil requeridos pela edificação. Você pode digitar um valor já calculado ou escolher entre os fornecidos de acordo com os grupos de estruturas da NBR 6123:2023:<br><br><strong>• 1,11 - Grupo 1:</strong> Estruturas (e suas vedações) que, em caso de ruína, podem afetar a segurança ou possibilidade de socorro após desastres naturais, que abrigam substâncias inflamáveis/tóxicas/explosivas ou pontes <br><strong>• 1,06 - Grupo 2:</strong> Estruturas (e suas vedações) que, em caso de ruína, representam risco substancial à vida humana devido a aglomeração de pessoas <br><strong>• 1,00 - Grupo 3:</strong> Edificações (e suas vedações) para residências, hotéis, comércio e indústrias ou desmontáveis para reutilização <br><strong>• 0,95 - Grupo 4:</strong> Edificações (e suas vedações) não destinadas à ocupação humana e sem circulação de pessoas no seu entorno <br><strong>• 0,83 - Grupo 5:</strong> Edificações temporárias não reutilizáveis </p>',
        selector: '#statistical-factor-S3'
    },
    {   //step 10
        title: 'Dimensão L (m)',
        text:  '<p>Aqui, informe o valor da dimensão característica da seção transversal da sua edificação em metros.<br>Para estruturas alteadas de seção circular, adotar o diâmetro médio do terço superior da estrutura.<br><br>Obs.: Essa seção possui preenchimento automático da menor dimensão transversal da estrutura em metros, <strong>mas você deve avaliar se essa dimensão corresponde a sua verificação.</strong></p>',
        selector: '#transversal-dimension-L'
    },
    {   //step 11
        title: 'Frequência Natural da Estrutura fn (Hz)',
        text:  '<p>Nesse campo deve ser preenchida a frequência natural da estrutura associada ao modo de vibração. Você pode obter esse valor por meio de softwares de análise modal estrutural ou por métodos de estimativa baseados em literatura técnica. A NBR 6123:2023 recomenda que a frequência considerada seja compatível com o modo de vibração predominante na direção do vento analisada.</p>',
        selector: '#structure-frequency-Fn'
    },
    {   //step 12
        title: 'Número de Strouhal (St)',
        text:  '<p>Esse é um parâmetro adimensional utilizado para descrever o fênomeno de desprendimento de vórtices, dependende da forma da seção transversal da estrutura e do regime de escoamento. A NBR 6123:2023 fornece valores típicos por geometria, os quais você pode selecionar ou substituir por um valor calculado ou proveniente de outras fontes.</p>',
        selector: '#strouhal-input'
    },
    {   //step 13
        title: 'Gráfico Relação Vest (m/s) x Elevação Z (m)',
        text:  '<p>Este gráfico auxilia na visualização de como a <strong>velocidade atuante na estrutura (Vest)</strong> cresce com a <strong>elevação Z</strong>, formando um perfil de vento ao longo da altura. A curva mostra os valores calculados de Vest para as cotas analisadas. A linha vertical <strong>0,8.Vcr</strong> marca a velocidade crítica da sua estrutura, e a faixa à direita indica a zona onde <strong>Vest ≥ Vcr</strong>. <br><br>Para montar a curva do gradiente da velocidade: inicie com elevação Z próxima a 0 metros e efetue o cálculo da verificação, repetindo esse processo para elevações cada vez maiores (a cada 5 m, 10 m, ou o valor do pé-direito do seu edifício) — se a curva estiver à esquerda de Vcr, a dispensa é atendida; se encostar ou ultrapassar Vcr, a verificação dinâmica não pode ser dispensada. <br><br>Você possui como botões de comando: <br><strong>• Voltar/Avançar:</strong> permitem você navegar pelos pontos já inseridos, possibilitando eventuais correções<br><strong>• Limpar:</strong> Limpa os pontos inseridos, zerando o gráfico <br><strong>• Resetar:</strong> Restaura os últimos pontos presentes no gráfico</p>',
        selector: '.result__graphic'
    },
    {   //step 14
        title: 'Agora é com você!',
        text:  '<p>Esperamos que essa ferramenta o(a) auxilie no cálculo da sua estrutura. <br><br><strong>Bom trabalho!</strong></p>',
        selector: '.input__calculate--button'
    },
    {   //step 15 -- out of wizard
        title: 'Sobre as Velocidades Fornecidas',
        text:  '<p>A lista de velocidades fornecida pela <strong>Elgin</strong> não interpola os valores das isopletas. Caso deseje valor mais preciso ao da localização da edificação, recomendamos a análise do mapa de isopletas fornecido pela NBR 6123:2023.</p>',
        selector: '#speed-V0-wrapper'
    },
];

let currentStep = 0;
const wizardMaxIndex = wizardSteps.length - 2;
const resultGraphicSection = getElement<HTMLElement>('.result__graphic');

function showResultGraphicSection (target: string) : void {
    if (resultGraphicSection) {
        if (target === '.result__graphic') {
            resultGraphicSection.style.display = 'block';
        } else {
            resultGraphicSection.style.display = wasResultAlreadyShown() ? 'block' : 'none';
        }
    }
}

export function showWizardStep(index: number, hideNavigation : boolean = false) : void {
    const step = wizardSteps[index];
    const target = getElement<HTMLElement>(step.selector);
    
    showResultGraphicSection(step.selector);

    if (!target) {
        console.warn(`Elemento não encontrado: ${step.selector}`);
        return;
    }

    wizardTitle.textContent = step.title;
    wizardText.innerHTML = step.text;
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            //ressets the screen
            wizardContainer.style.top = '';
            wizardContainer.style.left = '';
            wizardContainer.style.right = '';
            wizardContainer.style.bottom = '';
            wizardContainer.style.height = '';
            wizardContainer.style.maxHeight = '';
            wizardContainer.style.overflow = '';
            wizardContainer.style.transform = '';
            wizardContainer.style.position = '';
            wizardContainer.style.maxWidth = '';

            const rect = target.getBoundingClientRect();

            wizardContainer.style.position = 'absolute';

            if (currentStep === 0) {
                wizardContainer.style.top = `20%`;
                wizardContainer.style.bottom = '';
                wizardContainer.style.height = '';
                wizardContainer.style.maxHeight = '';
                wizardContainer.style.overflow = '';
                wizardContainer.style.position = 'absolute';
                
                if (window.innerWidth < 900) {
                    wizardContainer.style.left = `5%`;
                    wizardContainer.style.right = `5%`;
                    wizardContainer.style.maxWidth = `90vw`;
                    wizardContainer.style.transform = 'none';
                    wizardContainer.style.top = '30px';
                } else {
                    wizardContainer.style.left = `30%`;
                }
            }

            else {
                const isSmallScreen = window.innerWidth < 900;
                const targetTop = rect.top + window.scrollY;
                const targetBottom = rect.bottom + window.scrollY;
                const targetLeft = rect.left + window.scrollX;

                // Reset styles
                wizardContainer.style.top = '';
                wizardContainer.style.left = '';
                wizardContainer.style.right = '';
                wizardContainer.style.bottom = '';
                wizardContainer.style.transform = '';
                wizardContainer.style.position = '';

                // Se tela for pequena OU o elemento estiver muito fora da tela visível, centraliza o wizard
                if (index === 9 && getWindMode()) {
                    wizardContainer.style.position = 'fixed';
                    wizardContainer.style.left = '600px';
                    wizardContainer.style.bottom = '20px';
                    wizardContainer.style.transform = 'translateX(-50%)';
                    // evita cortar
                    const vpPadding = 24;
                    wizardContainer.style.maxHeight = `${window.innerHeight - vpPadding * 2}px`;
                    wizardContainer.style.overflow = 'auto';
                    wizardContainer.style.maxWidth = isSmallScreen ? '90vw' : '650px';
                    wizardContainer.style.width = 'auto';
                    wizardContainer.style.boxSizing = 'border-box';
                }
                else if (window.innerHeight < 900) {
                    if (isSmallScreen || targetBottom > window.innerHeight * 0.6) {
                        wizardContainer.style.position = 'fixed';
                        wizardContainer.style.bottom = '20px';
                        wizardContainer.style.left = '50%';
                        wizardContainer.style.transform = 'translateX(-50%)';
                    }
                } else {
                    wizardContainer.style.position = 'absolute';
                    wizardContainer.style.top = `${targetTop + 40}px`;
                    wizardContainer.style.left = `${targetLeft}px`;

                    if (step.selector === '.result__graphic') {
                        wizardContainer.style.left = `${targetLeft + 400}px`;
                    }
                }
            }

            clearHighlight();
            target.classList.add('wizard-highlight');

            if (hideNavigation) {
                backButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
            else {
                if (index === 0) {
                    backButton.disabled = index === 0;
                    backButton.style.display = 'none';
                    nextButton.style.display = 'flex';
                }
                else if (index === wizardMaxIndex) {
                    nextButton.disabled = true;
                    backButton.disabled = false;
                    backButton.style.display = 'flex';
                    nextButton.style.display = 'none';
                }
                else {
                    backButton.disabled = false;
                    nextButton.disabled = false;
                    backButton.style.display = 'flex';
                    nextButton.style.display = 'flex';
                }
            }

        });
    });

}

export function setupWizard(): void {
    helpButton.addEventListener('click', () => {
        wizard.classList.remove('wizard--hidden');
        // ALTERADO: INCLUÍDO MODAL-OPEN
        document.body.classList.add('modal-open');
        showWizardStep(0);
    });

    closeButton.addEventListener('click', () => {
        showResultGraphicSection('');
        closeWizard();
    });

    nextButton.addEventListener('click', () => {
        nextStep();
    });

    backButton.addEventListener('click', () => {
        backStep();
    });

    document.addEventListener('keydown', (event) => {
        if (wizard.classList.contains('wizard--hidden')) return;

        if (event.key === 'ArrowLeft') backStep();
        
        if (event.key === 'ArrowRight') nextStep();

        if (event.key === 'Escape') closeWizard();
    });

    const relayout = () => showWizardStep(currentStep);
    const relayoutDebounced = debounce(relayout, 0.1);

    window.addEventListener('resize', relayoutDebounced);
    window.addEventListener('orientationchange', () => setTimeout(relayout, 0));
}


export function clearHighlight(): void {
    document.querySelectorAll('.wizard-highlight').forEach(element => {
        element.classList.remove('wizard-highlight');
    });
}

function backStep(): void {
    if (currentStep > 0) {
        currentStep--;
        showWizardStep(currentStep);
    }
}

function nextStep(): void {
    if (currentStep < wizardMaxIndex) {
        currentStep++;
        showWizardStep(currentStep)
    }
}

function closeWizard(): void {
    currentStep = 0;
    wizard.classList.add('wizard--hidden');
    // ALTERADO: REMOVIDO MODAL-OPEN
    document.body.classList.remove('modal-open');
    showResultGraphicSection('');
    clearHighlight();
}

export function showWizardHelpStep(index: number): void {
    wizard.classList.remove('wizard--hidden');
    // ALTERADO: INCLUÍDO MODAL-OPEN
    document.body.classList.add('modal-open');
    currentStep = index;
    showWizardStep(index, true);
}
