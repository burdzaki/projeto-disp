describe('Verificador - Stress do gráfico H×Vcr', () => {
  it('executa múltiplos cálculos em sequência e o canvas atualiza sem quebrar', () => {
    cy.visit('http://localhost:5173/');
    cy.viewport(1200, 900);

    // Captura erros de runtime (console.error/onerror) para falhar se algo quebrar
    cy.window().then((win) => {
      (win as any).__errs = [];
      const origErr = win.console.error.bind(win.console);
      win.console.error = (...a: any[]) => { (win as any).__errs.push(a.join(' ')); origErr(...a); };
      const origOnErr = win.onerror;
      win.onerror = function (...a: any[]) {
        (win as any).__errs.push(a.join(' '));
        return origOnErr ? (origOnErr as any).apply(win, a as any) : false;
      };
    });

    // ---------- Preenche parâmetros fixos uma única vez ----------
    // Esbeltez base (d0 pode ser necessário para habilitar o cálculo final)
    cy.get('#dimension-d0').clear().type('10.3');

    // Velocidade do vento (modo: Digite um valor)
    cy.get('#speed-V0').select('Digite um valor'); // value = wind-user-input

    // Parâmetros do vento na estrutura
    cy.get('#topographic-factor-S1').clear().type('1');
    cy.get('#structure-category').select('II');
    cy.get('#elevation-Z').clear().type('30');
    cy.get('#statistical-factor-S3').clear().type('1.00');

    // Dados para cálculo do número de Strouhal
    cy.get('#transversal-dimension-L').clear().type('1.3');
    cy.get('#structure-frequency-Fn').clear().type('1.85');
    cy.get('#strouhal-input').select('Digite um valor'); // value = StrouhalUserInput
    cy.get('#strouhal-user-input').should('be.visible').clear().type('0.20');

    // ---------- Casos de estresse (variam h e V0 manual) ----------
    const casos = [
      { h: 20, v0: 30 }, { h: 30, v0: 32 }, { h: 40, v0: 35 },
      { h: 50, v0: 28 }, { h: 60, v0: 33 }, { h: 70, v0: 31 },
      { h: 80, v0: 29 }, { h: 90, v0: 34 }, { h: 100, v0: 36 },
      { h: 120, v0: 38 },
    ];

    let prevSignature = -1;

    cy.wrap(casos).each((c: { h: number; v0: number }, idx: number) => {
      // Entradas variáveis
      cy.get('#structure-height').clear().type(String(c.h));
      cy.wait(350); // debounce da validação de esbeltez
      cy.get('#speed-V0-user-input').should('be.visible').clear().type(String(c.v0));

      // Cálculo
      cy.get('.input__calculate--button').click();

      // Resultado exibido (aceita qualquer uma das duas áreas de saída)
      cy.get('body').then(($b) => {
        const hasCriteria = $b.find('.result__output__criteria').length > 0;
        const hasSlender = $b.find('.result__output__slenderness').length > 0;
        if (hasCriteria) cy.get('.result__output__criteria').should('be.visible');
        else if (hasSlender) cy.get('.result__output__slenderness').should('be.visible');
      });

      // Gráfico existe e o canvas muda entre execuções
      cy.get('.result__graphic').should('exist');
      cy.get('#result__graphic-chart').should('exist').then(($c) => {
        const canvas = $c.get(0) as HTMLCanvasElement;
        let sig = 0;
        try { sig = canvas.toDataURL('image/png').length; } catch { sig = 0; }
        if (idx > 0 && sig > 0 && prevSignature > 0) {
          expect(sig, `assinatura do canvas mudou no passo ${idx}`).to.not.eq(prevSignature);
        }
        prevSignature = sig;
      });

      // A cada 3 execuções, abre/fecha o wizard para tentar reproduzir regressões
      if (idx % 3 === 0) {
        cy.get('#header-link-help').click();
        cy.get('#wizard').should('be.visible');
        cy.get('#wizard__button--close').click();
        cy.get('#wizard').should('not.be.visible');
      }

      // Pequena espera para garantir estabilização entre ciclos (opcional)
      cy.wait(50);
    });

    // Sem erros de runtime
    cy.window().then((win) => {
      const errs = (win as any).__errs as string[];
      expect(errs, `erros capturados:\n${(errs || []).join('\n')}`).to.have.length(0);
    });
  });
});
