import { getElement } from "./utils/dom";

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
    {
        title: 'Bem-vindo(a)! Precisa de ajuda?',
        text: 'Esse guia vai te mostrar, passo a passo, como utilizar a ferramenta desenvolvida seguindo os critérios estabelecidos pela NBR 6123:2023.',
        selector: '.main__title'
    },
    {
        title: 'Cálculo da Esbeltez',
        text: 'A esbeltez calculada aqui é a razão entre altura (h) e a menor dimensão da estrutura (d0) e ajuda a identificar o risco de desprendimento de vórtices - se seu resultado for igual ou maior que 6, os efeitos dinâmicos da estrutura devem ser investigados.',
        selector: '.inputs--slenderness'
    },
    {
        title: 'Altura h (m)',
        text: 'Informe aqui, em metros, a altura total da edificação a ser analisada.',
        selector: '#structure-height'
    },
    {
        title: 'Dimensão d0 (m)',
        text: 'Informe, em metros, a menor dimensão transversal da estrutura em relação à direção do vento. Ela compõe o cálculo da esbeltez.',
        selector: '#dimension-d0'
    },
    {
        title: 'Parâmetros para cálculo das velocidades de vento na estrutura',
        text:  'Nessa seção você irá preencher os parâmetros necessários para calcular a velocidade do vento que atua na edificação, de acordo com suas características e localização.<br>A seguir, entre com os parâmetros para cálculo da velocidade crítica do vento na edificação, de acordo com suas dimensões e frequência natural de vibração.',
        selector: '.inputs--parameters'
    },
    {
        title: 'Velocidade básica V0 (m/s)',
        text:  'Escolha entrar com um valor estimado por você (em metros/segundo) ou pesquisar estado e cidade de acordo com a lista de isopletas disponibilizada pela <strong>elgin</strong>. <br>Obs.: A fonte desse índice pode ser verificada na aba Sobre.',
        selector: '#speed-V0'
    },
    {
        title: 'Fator topográfico S1',
        text:  'Esse fator considera o escoamento do ar é determinado de acordo com a topografia do terreno. Seus valores variam de acordo com o relevo: <br><br><strong>• Plano/fracamente acidentado:</strong> S1 = 1,0 <br><strong>• Talude/morro:</strong> Valor deve ser calculado conforme a NBR 6123:2023 <br><strong>• Vale profundo/protegido de ventos de qualquer direção:</strong> S1 = 0,9.<br><br>Digite o valor que corresponde ao terreno da sua edificação',
        selector: '#topographic-factor-S1'
    },
    {
        title: 'Rugosidade do terreno',
        text:  'É classificada de acordo com a NBR 6123:2023 em cinco categorias de acordo com o entorno da edificação e a cota média de topo dos obstáculos ao seu redor:<br><br><strong>• Categoria I:</strong> Superfícies lisas de grandes dimensões (cota média = 0 m) <br><strong>• Categoria II:</strong> Terrenos abertos com poucos obstáculos espaçados (cota média ≤ 1,0 m) <br><strong>• Categoria III:</strong> Terrenos planos com obstáculos baixos e edificações esparsas (cota média = 3,0 m) <br><strong>• Categoria IV:</strong> Terrenos cobertos por obstáculos numerosos e pouco espaçados (cota média = 10 m)<br><strong>• Categoria V:</strong> Terrenos cobertos por obstáculos numerosos, altos e pouco espaçados (cota média ≥ 25 m)<br><br>Selecione a Categoria que melhor corresponde aos entornos do seu edifício.',
        selector: '#structure-category'
    },
    {
        title: 'Elevação Z (m)',
        text:  'Essa é altura da seção da edificação onde você quer avaliar a ocorrência do desprendimento de vórtices. Ela é utilizada no cálculo do fator S2, que considera a influência da rugosidade do terreno, dimensões da edificação e sua altura sobre o terreno para um intervalo de tempo de atuação do vento de 10 minutos e um fator de rajada (Fr) de 0,69.<br><br>Obs.: Essa seção possui preenchimento automático da altura da edificação em metros, <strong>mas você deve avaliar se essa dimensão corresponde a sua verificação.</strong>',
        selector: '#elevation-Z'
    },
    {
        title: 'Fator estatístico S3',
        text:  'Esse fator considera o grau de segurança e vida útil requeridos pela edificação. Você pode digitar um valor já calculado ou escolher entre os fornecidos de acordo com os grupos de estruturas da NBR 6123:2023:<br><br><strong>• Grupo 1:</strong> Estruturas (e suas vedações) que, em caso de ruína, podem afetar a segurança ou possibilidade de socorro após desastres naturais, que abrigam substâncias inflamáveis/tóxicas/explosivas ou pontes (1,11)<br><strong>• Grupo 2:</strong> Estruturas (e suas vedações) que, em caso de ruína, representam risco substancial à vida humana devido a aglomeração de pessoas (1,06)<br><strong>• Grupo 3:</strong> Edificações (e suas vedações) para residências, hotéis, comércio e indústrias ou desmontáveis para reutilização (1,00)<br><strong>• Grupo 4:</strong> Edificações (e suas vedações) não destinadas à ocupação humana e sem circulação de pessoas no seu entorno (0,95)<br><strong>• Grupo 5:</strong> Edificações temporárias não reutilizáveis (0,83)',
        selector: '#statistical-factor-S3'
    },
    {
        title: 'Dimensão L (m)',
        text:  'Aqui, informe o valor da dimensão característica da seção transversal da sua edificação em metros.<br><br>Obs.:Para estruturas alteadas de seção circular, adotar o diâmetro médio do terço superior da estrutura.',
        selector: '#transversal-dimension-L'
    },
    {
        title: 'Frequência Natural da Estrutura Fn (Hz)',
        text:  'Nesse campo deve ser preenchida a frequência natural da estrutura associada ao modo de vibração. Você pode obter esse valor por meio de softwares de análise modal estrutural ou por métodos de estimativa baseados em literatura técnica. A NBR 6123:2023 recomenda que a frequência considerada seja compatível com o modo de vibração predominante na direção do vento analisada.',
        selector: '#structure-frequency-Fn'
    },
    {
        title: 'Número de Strouhal (St)',
        text:  'Esse é um parâmetro adimensional que depende da forma da seção transversal da estrutura e do regime de escoamento. A NBR 6123:2023 fornece valores típicos por geometria, os quais você pode selecionar ou substituir por um valor calculado ou proveniente de outras fontes.',
        selector: '#strouhal-input'
    },
    {
        title: 'Gráfico Relação Fn x Vcr/Vest',
        text:  'O gráfico abaixo do resultado e memória de cálculo relaciona a Frequência Natural do Edifício com a razão Velocidade Crítica calculada / Velocidade atuante na estrutura. Essa variação do Fn em função da razão adimensional das velocidades permite avaliar a proximidade da velocidade crítica em relação à estimada de vento na edificação.<br>Você possui como botões de comando: <br><br><strong>• Voltar/Avançar:</strong> permitem você navegar pelos pontos já inseridos, possibilitando eventuais correções<br><strong>• Limpar:</strong> Limpa os pontos inseridos, zerando o gráfico <br><strong>• Resetar:</strong> Restaura os últimos pontos presentes no gráfico',
        selector: '.result__graphic'
    },
    {
        title: 'Agora é com você!',
        text:  'Esperamos que essa ferramenta o(a) auxilie no cálculo da sua estrutura. <br><br><strong>Bom trabalho!</strong>',
        selector: '.input__button'
    },
];

let currentStep = 0;
const wizardMaxIndex = wizardSteps.length - 1;

function showWizardStep(index: number) : void {
    const step = wizardSteps[index];
    const target = getElement<HTMLElement>(step.selector);

    const resultGraphicSection = getElement<HTMLElement>('.result__graphic');

    if (resultGraphicSection) {
    if (step.selector === '.result__graphic') {
        resultGraphicSection.style.display = 'block';
    } else {
        resultGraphicSection.style.display = 'none';
    }
    }

    if (!target) {
        console.warn(`Elemento não encontrado: ${step.selector}`);
        return;
    }

    wizardTitle.textContent = step.title;
    wizardText.innerHTML = step.text;

    const rect = target.getBoundingClientRect();

    wizardContainer.style.position = 'absolute';

    if (currentStep === 0) {
        wizardContainer.style.top = `20%`;
        wizardContainer.style.left = `35%`;
    }
    else {
        wizardContainer.style.top = `${rect.top + window.scrollY + 40}px`;
        wizardContainer.style.left = `${rect.left + window.scrollX + 0}px`;
        if (step.selector === '.result__graphic') {
            wizardContainer.style.top = `${rect.top + window.scrollY + 40}px`;
            wizardContainer.style.left = `${rect.left + window.scrollX + 400}px`;
        }
    }

    clearHighlight();
    target.classList.add('wizard-highlight');

    if (index === 0) {
        backButton.disabled = index === 0;
        backButton.style.display = 'none';
    }
    else if (index === wizardMaxIndex) {
        nextButton.disabled = index === wizardMaxIndex;
        nextButton.style.display = 'none';
    }
    else {
        backButton.style.display = 'flex';
        nextButton.style.display = 'flex';
    }


}

export function setupWizard(): void {
    helpButton.addEventListener('click', () => {
        wizard.classList.remove('wizard--hidden');
        showWizardStep(0);
        console.log(`currentStep = ${currentStep}`);
    });

    closeButton.addEventListener('click', () => {
        closeWizard();
        console.log(`currentStep = ${currentStep}`);
    });

    nextButton.addEventListener('click', () => {
        nextStep();
        console.log(`currentStep = ${currentStep}`);
    });

    backButton.addEventListener('click', () => {
        backStep();
        console.log(`currentStep = ${currentStep}`);
    });

    document.addEventListener('keydown', (event) => {
        if (wizard.classList.contains('wizard--hidden')) return;

        if (event.key === 'ArrowLeft') backStep();
        
        if (event.key === 'ArrowRight') nextStep();

        if (event.key === 'Escape') closeWizard();
    });
}


function clearHighlight(): void {
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
    wizard.classList.add('wizard--hidden');
    currentStep = 0;
    clearHighlight();
}
