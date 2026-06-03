let activeAlerts = [...ALERTS_DATA];

// ── Navegación ───────────────────────────────────────────────
function goScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('s-' + name).classList.add('active');
  document.querySelectorAll('.sb-item').forEach(s => {
    s.classList.toggle('active', s.dataset.screen === name);
  });
}

// ── Toast ────────────────────────────────────────────────────
function showToast(tt, ts) {
  document.getElementById('toast-tt').textContent = tt;
  document.getElementById('toast-ts').textContent = ts;
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Resolver alerta ──────────────────────────────────────────
function resolveAlert(id) {
  activeAlerts = activeAlerts.filter(a => a.id !== id);
  renderAlerts('home-alerts-list', activeAlerts, false);
  renderAlerts('full-alerts-list', activeAlerts, true);
  document.getElementById('active-alert-count').textContent = activeAlerts.length + ' activas';
  document.getElementById('alert-badge').textContent = activeAlerts.length;
  showToast('Alerta resuelta', 'Registrada correctamente');
}

// ── Escaneo ──────────────────────────────────────────────────
let scanStep = 1;

function initScan() {
  document.getElementById('scan-btn').addEventListener('click', () => {
    if (scanStep === 1) {
      scanStep = 2;
      document.getElementById('scan-hint').textContent = 'Escanea el medicamento';
      document.getElementById('scan-btn-lbl').textContent = 'Escanear medicamento';
      const s1 = document.getElementById('step1');
      s1.className = 'step-n done';
      s1.innerHTML = '<i class="ti ti-check" style="font-size:13px;"></i>';
    } else if (scanStep === 2) {
      scanStep = 3;
      document.getElementById('scan-hint').textContent = 'Coincidencia encontrada — confirma antes de administrar';
      document.getElementById('scan-confirm').style.display = 'block';
      document.getElementById('scan-btn').style.display = 'none';
      const s2 = document.getElementById('step2');
      s2.className = 'step-n done';
      s2.innerHTML = '<i class="ti ti-check" style="font-size:13px;"></i>';
    }
  });

  document.getElementById('scan-reset').addEventListener('click', () => {
    scanStep = 1;
    document.getElementById('scan-hint').textContent = 'Escanea la pulsera del paciente';
    document.getElementById('scan-btn-lbl').textContent = 'Escanear pulsera';
    document.getElementById('scan-confirm').style.display = 'none';
    document.getElementById('scan-btn').style.display = 'flex';
    const s1 = document.getElementById('step1');
    const s2 = document.getElementById('step2');
    const s3 = document.getElementById('step3');
    s1.className = 'step-n lav'; s1.textContent = '1';
    s2.className = 'step-n mint'; s2.textContent = '2';
    s3.className = 'step-n peach'; s3.textContent = '3';
  });

  document.getElementById('confirm-btn').addEventListener('click', () => {
    const s3 = document.getElementById('step3');
    s3.className = 'step-n done';
    s3.innerHTML = '<i class="ti ti-check" style="font-size:13px;"></i>';
    showToast('Medicamento verificado', 'Sin errores · Registro guardado');
    setTimeout(() => {
      document.getElementById('scan-reset').click();
      goScreen('home');
    }, 1800);
  });
}

// ── Login / Logout ───────────────────────────────────────────
function initAuth() {
  document.getElementById('eye-btn').addEventListener('click', () => {
    const i = document.getElementById('inp-pwd');
    i.type = i.type === 'password' ? 'text' : 'password';
  });

  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('inp-email').value;
    const pwd   = document.getElementById('inp-pwd').value;
    const err   = document.getElementById('auth-err');
    if (!email || !pwd) { err.style.display = 'block'; return; }
    err.style.display = 'none';
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display  = 'flex';
    initApp();
  });

  document.getElementById('inp-pwd').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('login-btn').click();
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    document.getElementById('app-screen').style.display  = 'none';
    document.getElementById('auth-screen').style.display = 'flex';
  });
}

// ── Cerrar modal ─────────────────────────────────────────────
function initModal() {
  document.getElementById('patient-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('patient-modal')) closeModal();
  });
}

// ── Búsqueda de pacientes ────────────────────────────────────
function initSearch() {
  document.getElementById('patient-search').addEventListener('input', e => {
    renderAllPatientsTable(e.target.value);
  });
}

// ── Sidebar nav ──────────────────────────────────────────────
function initNav() {
  document.querySelectorAll('.sb-item').forEach(el => {
    el.addEventListener('click', () => goScreen(el.dataset.screen));
  });
}

// ── Init principal ───────────────────────────────────────────
function initApp() {
  renderHomePatientsTable();
  renderAllPatientsTable();
  renderAlerts('home-alerts-list', activeAlerts, false);
  renderAlerts('full-alerts-list', activeAlerts, true);
  renderMeds('home-meds-list', MEDS_DATA);
  renderMeds('all-meds-list', MEDS_DATA);
  renderHistorial();
}

// ── Arranque ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initNav();
  initScan();
  initModal();
  initSearch();
});
