function renderHomePatientsTable() {
  const tb = document.getElementById('home-patients-tbl');
  tb.innerHTML = PATIENTS.slice(0, 5).map(p => {
    const fc  = parseInt(p.fc) > 100 ? 'hi' : 'ok';
    const spo = parseFloat(p.spo) < 95 ? 'lo' : 'ok';
    return `<tr>
      <td><div class="td-row">
        <div class="p-av-sm" style="background:${p.color}">${p.initials}</div>
        <div><div class="td-name">${p.name}</div><div class="td-room">${p.room}</div></div>
      </div></td>
      <td><span class="vital-val ${fc}">${p.fc} bpm</span></td>
      <td><span class="vital-val ${spo}">${p.spo}</span></td>
      <td><span class="vital-val">${p.pa}</span></td>
      <td><span class="chip ${chipMap[p.status]}">${chipLbl[p.status]}</span></td>
      <td>${p.nextDose}</td>
      <td><button class="tbl-btn" onclick="openPatient('${p.id}')">Ver perfil</button></td>
    </tr>`;
  }).join('');
}

function renderAllPatientsTable(filter = '') {
  const tb = document.getElementById('all-patients-tbl');
  const list = filter
    ? PATIENTS.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.room.toLowerCase().includes(filter.toLowerCase()))
    : PATIENTS;

  tb.innerHTML = list.map(p => {
    const fc  = parseInt(p.fc) > 100 ? 'hi' : 'ok';
    const spo = parseFloat(p.spo) < 95 ? 'lo' : 'ok';
    return `<tr>
      <td><div class="td-row">
        <div class="p-av-sm" style="background:${p.color}">${p.initials}</div>
        <div><div class="td-name">${p.name}</div><div class="td-room">${p.age} años</div></div>
      </div></td>
      <td>${p.room}</td>
      <td><span class="vital-val ${fc}">${p.fc} bpm</span></td>
      <td><span class="vital-val ${spo}">${p.spo}</span></td>
      <td>${p.pa}</td>
      <td><span class="chip ${chipMap[p.status]}">${chipLbl[p.status]}</span></td>
      <td>${p.doc}</td>
      <td><button class="tbl-btn" onclick="openPatient('${p.id}')">Ver perfil</button></td>
    </tr>`;
  }).join('');
}

function renderAlerts(containerId, items, withResolve) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map(a => {
    const cls = a.sev === 'crit' ? 'crit' : 'watch';
    const dot = a.sev === 'crit' ? 'red' : 'amber';
    return `<div class="alert-item ${cls}" id="alert-${a.id}">
      <div class="al-dot ${dot}"></div>
      <div class="al-body">
        <div class="al-t">${a.title}</div>
        <div class="al-s">${a.sub}</div>
      </div>
      <div class="al-time">${a.time}</div>
      ${withResolve ? `<button class="al-resolve" onclick="resolveAlert('${a.id}')">Resolver</button>` : ''}
    </div>`;
  }).join('');
}

function renderMeds(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map(m => `
    <div class="med-row-item">
      <div class="med-ico ${m.ico}"><i class="ti ${m.icn}"></i></div>
      <div class="med-info">
        <div class="med-name">${m.name}</div>
        <div class="med-pat">${m.pat}</div>
      </div>
      <div class="med-time-lbl ${m.cls}">${m.time}<small>${m.sub}</small></div>
    </div>`).join('');
}

function renderHistorial() {
  const el = document.getElementById('historial-list');
  if (!el) return;
  el.innerHTML = HIST_DATA.map(h => `
    <div class="hist-item">
      <div class="hist-ico"><i class="ti ti-pill"></i></div>
      <div class="hist-info">
        <div class="hist-title">${h.name}</div>
        <div class="hist-sub">${h.pat}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:12px;font-weight:700;color:var(--text);">${h.time}</div>
        <div style="font-size:10px;color:var(--text3);font-weight:600;margin-top:2px;">${h.nurse}</div>
      </div>
    </div>`).join('');
}

function openPatient(id) {
  const p = PATIENTS.find(x => x.id === id);
  if (!p) return;
  document.getElementById('m-av').textContent   = p.initials;
  document.getElementById('m-av').style.background = p.color;
  document.getElementById('m-name').textContent = p.name;
  document.getElementById('m-room').textContent = `${p.room} · ${p.age} años`;
  const chip = document.getElementById('m-chip');
  chip.className   = 'chip ' + chipMap[p.status];
  chip.textContent = chipLbl[p.status];
  document.getElementById('m-fc').textContent  = p.fc;
  document.getElementById('m-spo').textContent = p.spo;
  document.getElementById('m-pa').textContent  = p.pa;
  document.getElementById('m-note').textContent = p.note;
  document.getElementById('m-meds').innerHTML = p.meds.map(m => `
    <div class="med-row-item" style="padding:8px 0;">
      <div class="med-ico ${m.ico}"><i class="ti ${m.icn}"></i></div>
      <div class="med-info">
        <div class="med-name">${m.name}</div>
        <div class="med-pat">${m.dose}</div>
      </div>
      <div class="med-time-lbl ${m.cls}">${m.time}</div>
    </div>`).join('');
  document.getElementById('patient-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('patient-modal').classList.remove('open');
}
