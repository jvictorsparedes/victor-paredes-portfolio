/* ============================================================================
   ui_base.js — Componentes de UI compartilhados (Design System v3)
   Painel de Ocupação de Depósito — Demo de Portfólio

   Expõe globais:
     showConfirm(mensagem, callbackConfirmar, destrutivo, opts)
     toast(msg, tipo)   (alias: showToast)

   Auto-suficiente: injeta o próprio CSS e markup na primeira utilização.
   Não depende de markup pré-existente na página. Incluir com:
     <script src="ui_base.js"></script>   (antes do script principal)
   ============================================================================ */
(function () {
  'use strict';
  if (window.__uiBaseCarregado) return;
  window.__uiBaseCarregado = true;

  // ---- CSS (injetado uma vez) ----------------------------------------------
  var CSS =
    '#uiConfirmOverlay{position:fixed;inset:0;background:rgba(1,33,68,.55);display:none;align-items:center;justify-content:center;z-index:10000}' +
    '#uiConfirmOverlay.show{display:flex}' +
    '#uiConfirmBox{background:#fff;border-radius:16px;box-shadow:var(--sombra-lg,0 18px 50px rgba(1,33,68,.16));border-top:4px solid var(--laranja,#F37020);padding:24px;max-width:420px;width:90%}' +
    '#uiConfirmMsg{font:600 15px Inter,system-ui,sans-serif;color:var(--texto,#1A2433);margin:0 0 16px;line-height:1.45}' +
    '#uiConfirmInputWrap{display:none;margin:0 0 16px}' +
    '#uiConfirmInput{width:100%;height:38px;border:1px solid var(--borda,#DCE3EC);border-radius:8px;padding:0 12px;font:600 14px Inter,system-ui,sans-serif;color:var(--texto,#1A2433);box-sizing:border-box}' +
    '#uiConfirmInput:focus{outline:none;border-color:var(--laranja,#F37020);box-shadow:0 0 0 3px rgba(243,112,32,.12)}' +
    '.uiConfirmAcoes{display:flex;gap:10px;justify-content:flex-end}' +
    // botões estilizados por ID para vencer qualquer .btn/.btn-danger local dos sistemas
    '#uiConfirmOverlay .uiBtn{height:40px;border-radius:10px;border:none;padding:0 20px;font:800 13px Inter,system-ui,sans-serif;cursor:pointer;transition:.18s;display:inline-flex;align-items:center;justify-content:center;letter-spacing:.3px}' +
    '#uiConfirmOverlay .uiBtn:disabled{opacity:.5;cursor:not-allowed}' +
    '#uiConfirmCancel{background:#fff;border:1px solid var(--borda,#DCE3EC);color:var(--azul,#012144)}' +
    '#uiConfirmCancel:hover{border-color:var(--laranja,#F37020);color:var(--laranja,#F37020)}' +
    '#uiConfirmOk{background:var(--vermelho,#DC2626);color:#fff}' +
    '#uiConfirmOk.ui-primary{background:var(--azul,#012144)}' +
    '#uiConfirmOk:hover{filter:brightness(1.08)}' +
    '#uiToast{position:fixed;top:78px;left:50%;transform:translateX(-50%) translateY(-16px);background:var(--vermelho,#DC2626);color:#fff;padding:12px 42px 12px 16px;border-radius:10px;box-shadow:var(--sombra-lg,0 18px 50px rgba(1,33,68,.16));font:600 14px Inter,system-ui,sans-serif;z-index:10001;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;max-width:90vw}' +
    '#uiToast.show{opacity:1;transform:translateX(-50%) translateY(0);pointer-events:auto}' +
    '#uiToast.ui-ok{background:var(--verde,#16A34A)}' +
    '#uiToast.ui-erro{background:var(--vermelho,#DC2626)}' +
    '#uiToast.ui-aviso{background:var(--amarelo,#D97706)}' +
    '#uiToast.ui-info{background:var(--azul,#012144)}' +
    '#uiToastX{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;font-size:18px;line-height:1;cursor:pointer;opacity:.8;padding:0}';

  function injetarCSS() {
    if (document.getElementById('uiBaseCSS')) return;
    var st = document.createElement('style');
    st.id = 'uiBaseCSS';
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  // ---- Modal de confirmação -------------------------------------------------
  function garantirConfirm() {
    injetarCSS();
    var ov = document.getElementById('uiConfirmOverlay');
    if (ov) return ov;
    ov = document.createElement('div');
    ov.id = 'uiConfirmOverlay';
    ov.innerHTML =
      '<div id="uiConfirmBox">' +
      '<p id="uiConfirmMsg"></p>' +
      '<div id="uiConfirmInputWrap"><input id="uiConfirmInput" type="text" autocomplete="off"></div>' +
      '<div class="uiConfirmAcoes">' +
      '<button type="button" class="uiBtn" id="uiConfirmCancel">Cancelar</button>' +
      '<button type="button" class="uiBtn" id="uiConfirmOk">Confirmar</button>' +
      '</div></div>';
    document.body.appendChild(ov);
    // fecha ao clicar no fundo
    ov.addEventListener('click', function (e) { if (e.target === ov) fecharConfirm(); });
    return ov;
  }

  function fecharConfirm() {
    var ov = document.getElementById('uiConfirmOverlay');
    if (ov) ov.classList.remove('show');
  }

  /**
   * showConfirm — abre o modal de confirmação padrão DS v3.
   * @param {string}   mensagem            texto exibido
   * @param {Function} callbackConfirmar   executado ao confirmar
   * @param {boolean}  destrutivo          true (padrão) = botão vermelho; false = azul
   * @param {Object}   [opts]              { confirmarTexto, okLabel, cancelLabel }
   *        opts.confirmarTexto: exige digitar a palavra informada para liberar o OK
   */
  function showConfirm(mensagem, callbackConfirmar, destrutivo, opts) {
    opts = opts || {};
    var ov = garantirConfirm();
    var ok = document.getElementById('uiConfirmOk');
    var cancel = document.getElementById('uiConfirmCancel');
    var inputWrap = document.getElementById('uiConfirmInputWrap');
    var input = document.getElementById('uiConfirmInput');

    document.getElementById('uiConfirmMsg').textContent = mensagem;
    ok.textContent = opts.okLabel || 'Confirmar';
    cancel.textContent = opts.cancelLabel || 'Cancelar';
    ok.className = 'uiBtn' + (destrutivo === false ? ' ui-primary' : '');

    var precisaTexto = opts.confirmarTexto;
    function checarTexto() {
      if (precisaTexto) ok.disabled = (input.value.trim().toUpperCase() !== String(precisaTexto).toUpperCase());
    }
    if (precisaTexto) {
      inputWrap.style.display = 'block';
      input.value = '';
      input.placeholder = 'Digite "' + precisaTexto + '" para confirmar';
      ok.disabled = true;
      input.oninput = checarTexto;
    } else {
      inputWrap.style.display = 'none';
      ok.disabled = false;
      input.oninput = null;
    }

    ov.classList.add('show');
    if (precisaTexto) setTimeout(function () { input.focus(); }, 60);

    function limpar() {
      ov.classList.remove('show');
      ok.onclick = null;
      cancel.onclick = null;
      input.oninput = null;
    }
    ok.onclick = function () {
      if (precisaTexto && ok.disabled) return;
      limpar();
      if (typeof callbackConfirmar === 'function') callbackConfirmar();
    };
    cancel.onclick = function () { limpar(); };
  }

  // ---- Toast ----------------------------------------------------------------
  var TIPO_MAP = {
    ok: 'ui-ok', success: 'ui-ok', 't-success': 'ui-ok', sucesso: 'ui-ok',
    err: 'ui-erro', erro: 'ui-erro', error: 'ui-erro', 't-error': 'ui-erro', danger: 'ui-erro',
    warn: 'ui-aviso', warning: 'ui-aviso', aviso: 'ui-aviso', 't-warn': 'ui-aviso', 't-warning': 'ui-aviso',
    info: 'ui-info', 't-info': 'ui-info'
  };

  function garantirToast() {
    injetarCSS();
    var t = document.getElementById('uiToast');
    if (t) return t;
    t = document.createElement('div');
    t.id = 'uiToast';
    t.setAttribute('role', 'alert');
    document.body.appendChild(t);
    return t;
  }

  /**
   * toast — notificação flutuante padrão DS v3.
   * @param {string} msg   texto
   * @param {string} tipo  ok|erro|aviso|info (aceita apelidos: success, err, warn, t-success, etc.)
   */
  function toast(msg, tipo) {
    var t = garantirToast();
    var cls = TIPO_MAP[tipo] || 'ui-info';
    t.className = '';
    t.classList.add(cls, 'show');
    t.textContent = String(msg);
    var x = document.createElement('button');
    x.id = 'uiToastX';
    x.type = 'button';
    x.textContent = '×';
    x.onclick = function () { t.classList.remove('show'); };
    t.appendChild(x);
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('show'); }, 3200);
  }

  // ---- Exporta globais ------------------------------------------------------
  window.showConfirm = showConfirm;
  window.fecharConfirm = fecharConfirm;
  window.toast = toast;
  window.showToast = toast; // alias de compatibilidade
})();
