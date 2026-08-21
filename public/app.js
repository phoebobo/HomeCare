const iconPaths = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  flask: '<path d="M10 2v6L4.5 17a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8V2"/><path d="M8.5 2h7"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  shield: '<path d="M12 3 4 6v5c0 4.5 3.4 8.3 8 10 4.6-1.7 8-5.5 8-10V6z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  sparkles: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
  printer: '<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
  rotate: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 8l5-5 5 5M12 3v12"/>',
  gauge: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M12 12l4-4"/><path d="M8.5 15.5a4 4 0 0 1 0-7"/><path d="M12 7V5"/><path d="M12 12V8"/>',
  dollar: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10"/><path d="M15 9.5c-.4-1-1.7-1.5-3-1.5-1.7 0-3 .8-3 2s1 1.6 3 2 3 .8 3 2-1.3 2-3 2c-1.3 0-2.6-.5-3-1.5"/>',
  wrench: '<path d="M14.7 6.3a5 5 0 0 0-6.7 6.2L3 17.6V21h3.4l5.1-5a5 5 0 0 0 6.2-6.7l-2.9 2.9-2.8-.6-.6-2.8z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/>'
};
document.querySelectorAll('[data-icon]').forEach(el => {
  const name = el.getAttribute('data-icon');
  if (iconPaths[name]) {
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + iconPaths[name] + '</svg>';
  }
});

const markets = {
  US: { currency: '$', label: 'United States' },
  UK: { currency: '£', label: 'United Kingdom' },
  EU: { currency: '€', label: 'Europe' }
};
const regionOptions = {
  US: states,
  UK: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  EU: ['Germany', 'France', 'Netherlands', 'Spain', 'Italy']
};
const regionClimate = {
  England: 'cold', Scotland: 'cold', Wales: 'cold', 'Northern Ireland': 'cold',
  Germany: 'cold', Netherlands: 'cold', France: 'mild', Spain: 'hot', Italy: 'hot'
};

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const currentMonth = new Date().getMonth();
let month = currentMonth;

const marketSelect = document.getElementById('marketSelect');
const regionSelect = document.getElementById('regionSelect');
const monthSelect = document.getElementById('monthSelect');

function fillRegionOptions() {
  const market = marketSelect.value;
  regionSelect.innerHTML = '';
  regionOptions[market].forEach(region => {
    const opt = document.createElement('option');
    opt.value = region;
    opt.textContent = region;
    regionSelect.appendChild(opt);
  });
}

monthNames.forEach((name, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = name;
  if (i === currentMonth) opt.selected = true;
  monthSelect.appendChild(opt);
});

function getSeason(m) {
  if (m >= 2 && m <= 4) return 'spring';
  if (m >= 5 && m <= 7) return 'summer';
  if (m >= 8 && m <= 10) return 'fall';
  return 'winter';
}

function allTasks() {
  return tasks.monthly.concat(tasks.spring, tasks.summer, tasks.fall, tasks.winter, tasks.older, tasks.climate);
}

function byId(id) {
  return allTasks().find(t => t.id === id);
}

function currentProfile() {
  const market = marketSelect.value;
  const region = regionSelect.value;
  const homeName = document.getElementById('homeName').value.trim() || `${market} home`;
  return {
    name: homeName,
    market,
    region,
    type: document.getElementById('homeType').value,
    age: document.getElementById('homeAge').value
  };
}

function climateFor(profile) {
  if (profile.market === 'US') {
    if (coldStates.has(profile.region)) return 'cold';
    if (hotStates.has(profile.region)) return 'hot';
    if (humidStates.has(profile.region)) return 'humid';
    return 'mild';
  }
  return regionClimate[profile.region] || 'mild';
}

function buildForMonth(profile, selectedMonth) {
  const season = getSeason(selectedMonth);
  const ids = [];
  const add = (arr) => arr.forEach(t => {
    if (!ids.includes(t.id)) ids.push(t.id);
  });
  add(tasks.monthly);
  add(tasks[season]);
  if (profile.type === 'house' || profile.type === 'mobile') add(tasks.spring.concat(tasks.summer, tasks.fall, tasks.winter).filter(t => t.tag === 'home'));
  if (profile.age === 'older') add(tasks.older);
  const climate = climateFor(profile);
  if (climate === 'cold' && season === 'winter') add(tasks.climate.filter(t => t.id === 'cold-insulation'));
  if (climate === 'hot' && season === 'summer') add(tasks.climate.filter(t => t.id === 'hot-ac'));
  if ((climate === 'humid' || climate === 'hot') && (season === 'spring' || season === 'summer')) add(tasks.climate.filter(t => t.id === 'humid-mold'));
  return ids.map(byId).filter(Boolean);
}

function profileKey(profile) {
  return [profile.market, profile.region, profile.type, profile.age, profile.name || 'home']
    .map(v => encodeURIComponent(String(v)))
    .join('_');
}

function doneKey(profile, selectedMonth) {
  return 'homeupkeep_done_' + profileKey(profile) + '_' + selectedMonth;
}

function recordKey(profile) {
  return 'homeupkeep_records_' + profileKey(profile);
}

function getDoneIds(profile, selectedMonth) {
  const key = profile ? doneKey(profile, selectedMonth) : 'homeupkeep_done_default';
  return new Set(JSON.parse(localStorage.getItem(key) || '[]'));
}

function setDoneId(id, done, profile, selectedMonth) {
  const key = profile ? doneKey(profile, selectedMonth) : 'homeupkeep_done_default';
  const ids = new Set(JSON.parse(localStorage.getItem(key) || '[]'));
  if (done) ids.add(id); else ids.delete(id);
  localStorage.setItem(key, JSON.stringify([...ids]));
}

function formatCost(cost) {
  const currency = markets[marketSelect.value].currency;
  return cost.replace(/\$/g, currency);
}

function updateProgress(tasks, profile, selectedMonth) {
  const done = getDoneIds(profile, selectedMonth);
  const count = tasks.filter(t => done.has(t.id)).length;
  const pct = tasks.length ? Math.round(count / tasks.length * 100) : 0;
  document.getElementById('progressBar').innerHTML = `<span style="width:${pct}%"></span>`;
  document.getElementById('progressText').textContent = `${count} / ${tasks.length} done`;
  renderDashboard();
}

function taskCard(task, selected, profile, selectedMonth) {
  const card = document.createElement('article');
  card.className = 'task-card';
  const tagClass = task.tag === 'home' ? 'tag-home' : (task.tag === 'age' || task.tag === 'climate') ? 'tag-season' : 'tag-all';
  const tagText = task.tag === 'home' ? 'Home type' : task.tag === 'age' ? 'Home age' : task.tag === 'climate' ? 'Climate' : 'Monthly';
  const marketNote = marketSelect.value === 'UK' ? 'UK note: check local supplier guidance and metric units.' : marketSelect.value === 'EU' ? 'EU note: check local manufacturer guidance and metric units.' : '';
  card.innerHTML = `
    <div class="task-top">
      <input class="check" type="checkbox" aria-label="Mark done">
      <div class="task-body">
        <h3 class="task-title"></h3>
        <div class="tag-row"><span class="tag ${tagClass}">${tagText}</span></div>
        <div class="task-grid">
          <div class="task-line task-why"><strong>Why</strong>${task.why}</div>
          <div class="task-line task-when"><strong>When</strong>${task.when}</div>
          <div class="task-line task-how"><strong>How</strong>${task.how.join(' → ')}</div>
          <div class="task-line task-time"><strong>Time</strong>${task.duration}</div>
          <div class="task-line task-cost"><strong>Cost</strong>${formatCost(task.cost)}</div>
          <div class="task-line task-skip"><strong>If you skip it</strong>${task.skip}</div>
        </div>
        <div class="task-line task-pro"><strong>Call a pro when</strong>${task.pro}</div>
        <div class="task-note">${task.note}${marketNote ? " " + marketNote : ""}</div>
      </div>
    </div>
  `;
  const check = card.querySelector('.check');
  const doneIds = getDoneIds(profile, selectedMonth);
  check.checked = doneIds.has(task.id);
  card.classList.toggle('done', check.checked);
  card.querySelector('.task-title').textContent = task.title;
  check.addEventListener('change', e => {
    card.classList.toggle('done', e.target.checked);
    setDoneId(task.id, e.target.checked, profile, selectedMonth);
    if (selected) updateProgress(selected, profile, selectedMonth);
  });
  return card;
}

function render(selected, profile) {
  const list = document.getElementById('taskList');
  const meta = document.getElementById('resultsMeta');
  const typeLabel = document.getElementById('homeType').selectedOptions[0].textContent;
  const ageLabel = document.getElementById('homeAge').selectedOptions[0].textContent;
  meta.textContent = `${monthNames[month]} · ${markets[profile.market].label} · ${profile.region} · ${typeLabel} · ${ageLabel}`;
  list.innerHTML = '';
  if (!selected.length) {
    list.innerHTML = '<div class="empty-state">No tasks found for this combination yet. Try a different market or home type.</div>';
    updateProgress([], profile, month);
    return;
  }
  selected.forEach(task => list.appendChild(taskCard(task, selected, profile, month)));
  updateProgress(selected, profile, month);
  document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildChecklist() {
  const profile = currentProfile();
  if (!profile.region) {
    document.getElementById('resultsMeta').textContent = 'Select a state or region first.';
    return;
  }
  render(buildForMonth(profile, month), profile);
  renderYearGrid();
  renderRecords();
  renderHomeLibrary();
}

function renderYearGrid() {
  const grid = document.getElementById('yearGrid');
  grid.innerHTML = '';
  const profile = currentProfile();
  monthNames.forEach((name, i) => {
    const tasksForMonth = buildForMonth(profile, i);
    const card = document.createElement('div');
    card.className = 'month-card';
    card.innerHTML = `<h3>${name}</h3><div class="month-tasks"></div>`;
    const monthTasks = card.querySelector('.month-tasks');
    tasksForMonth.forEach(task => {
      const row = document.createElement('label');
      row.className = 'year-task';
      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = getDoneIds(profile, i).has(task.id);
      check.addEventListener('change', () => {
        setDoneId(task.id, check.checked, profile, i);
        renderDashboard();
      });
      const title = document.createElement('span');
      title.textContent = task.title;
      row.appendChild(check);
      row.appendChild(title);
      monthTasks.appendChild(row);
    });
    grid.appendChild(card);
  });
}

function refreshSavedHomes() {
  const select = document.getElementById('savedHomes');
  const current = document.getElementById('homeName').value.trim();
  const homes = JSON.parse(localStorage.getItem('homeupkeep_homes') || '[]');
  select.innerHTML = '<option value="">New home</option>';
  homes.forEach(h => {
    const opt = document.createElement('option');
    opt.value = h.name;
    opt.textContent = h.name;
    select.appendChild(opt);
  });
  if (current) select.value = current;
}

function loadSavedHome(name) {
  const homes = JSON.parse(localStorage.getItem('homeupkeep_homes') || '[]');
  const h = homes.find(x => x.name === name);
  if (!h) return;
  document.getElementById('homeName').value = h.name;
  document.getElementById('marketSelect').value = h.market;
  fillRegionOptions();
  document.getElementById('regionSelect').value = regionOptions[h.market].includes(h.region) ? h.region : regionOptions[h.market][0];
  document.getElementById('homeType').value = h.type;
  document.getElementById('homeAge').value = h.age;
  buildChecklist();
  renderYearGrid();
  renderRecords();
  renderHomeLibrary();
}

function saveCurrentHome() {
  const profile = currentProfile();
  const homes = JSON.parse(localStorage.getItem('homeupkeep_homes') || '[]');
  const idx = homes.findIndex(h => h.name === profile.name);
  if (idx >= 0) homes[idx] = profile; else homes.push(profile);
  localStorage.setItem('homeupkeep_homes', JSON.stringify(homes));
  refreshSavedHomes();
  const btn = document.getElementById('saveHomeBtn');
  btn.textContent = 'Saved';
  setTimeout(() => btn.textContent = 'Save home', 1200);
}

function renderRecords() {
  const records = JSON.parse(localStorage.getItem(recordKey(currentProfile())) || '[]');
  const list = document.getElementById('recordList');
  list.innerHTML = '';
  if (!records.length) {
    list.innerHTML = '<div class="empty-state">No maintenance records yet.</div>';
    return;
  }
  records.slice().reverse().forEach(record => {
    const row = document.createElement('div');
    row.className = 'record-row';
    row.innerHTML = `<strong></strong><span></span><span></span><span></span>`;
    row.children[0].textContent = record.date;
    row.children[1].textContent = record.task;
    row.children[2].textContent = formatCost(record.cost);
    row.children[3].textContent = record.notes || '';
    list.appendChild(row);
  });
  renderDashboard();
}


function formatNumberCost(value) {
  const n = Number(value) || 0;
  const currency = markets[marketSelect.value].currency;
  return currency + n.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function renderDashboard() {
  const profile = currentProfile();
  const tasksForMonth = buildForMonth(profile, month);
  const records = JSON.parse(localStorage.getItem(recordKey(profile)) || '[]');
  const done = getDoneIds(profile, month).size;
  const completion = tasksForMonth.length ? Math.round(done / tasksForMonth.length * 100) : 0;
  const recordBonus = Math.min(30, records.length * 3);
  const score = tasksForMonth.length ? Math.min(100, Math.round(completion * 0.75 + recordBonus)) : 0;
  document.getElementById('scoreValue').textContent = score + ' / 100';
  document.getElementById('doneValue').textContent = done + ' / ' + tasksForMonth.length;
  document.getElementById('recordValue').textContent = String(records.length);
  const totalCost = records.reduce((sum, r) => sum + Number(r.cost || 0), 0);
  document.getElementById('costValue').textContent = formatNumberCost(totalCost);
}

function itemKey(profile) {
  return 'homeupkeep_items_' + profileKey(profile);
}

function providerKey(profile) {
  return 'homeupkeep_providers_' + profileKey(profile);
}

function warrantyStatus(value) {
  if (!value) return { label: 'No expiry', cls: 'status-ok' };
  const parts = value.split('-').map(Number);
  const now = new Date();
  const expiry = new Date(parts[0], parts[1] - 1, 1);
  const months = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
  if (months < 0) return { label: 'Expired', cls: 'status-expired' };
  if (months <= 3) return { label: 'Expiring soon', cls: 'status-warn' };
  return { label: 'Active', cls: 'status-ok' };
}

function renderHomeLibrary() {
  const profile = currentProfile();
  const items = JSON.parse(localStorage.getItem(itemKey(profile)) || '[]');
  const itemList = document.getElementById('itemList');
  itemList.innerHTML = '';
  if (!items.length) {
    itemList.innerHTML = '<div class="library-empty">No appliances tracked yet.</div>';
  } else {
    items.slice().reverse().forEach(item => {
      const row = document.createElement('div');
      row.className = 'library-item';
      const info = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = item.name;
      info.appendChild(title);
      const sub = document.createElement('small');
      sub.textContent = [item.model, item.warranty].filter(Boolean).join(' · ');
      info.appendChild(sub);
      const status = warrantyStatus(item.warranty);
      const meta = document.createElement('div');
      meta.className = 'library-meta';
      const badge = document.createElement('span');
      badge.className = status.cls;
      badge.textContent = status.label;
      meta.appendChild(badge);
      info.appendChild(meta);
      const remove = document.createElement('button');
      remove.className = 'delete-btn';
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        const next = JSON.parse(localStorage.getItem(itemKey(profile)) || '[]').filter(x => x.id !== item.id);
        localStorage.setItem(itemKey(profile), JSON.stringify(next));
        renderHomeLibrary();
      });
      row.appendChild(info);
      row.appendChild(remove);
      itemList.appendChild(row);
    });
  }

  const providers = JSON.parse(localStorage.getItem(providerKey(profile)) || '[]');
  const providerList = document.getElementById('providerList');
  providerList.innerHTML = '';
  if (!providers.length) {
    providerList.innerHTML = '<div class="library-empty">No service providers saved yet.</div>';
  } else {
    providers.slice().reverse().forEach(provider => {
      const row = document.createElement('div');
      row.className = 'library-item';
      const info = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = provider.name;
      info.appendChild(title);
      const sub = document.createElement('small');
      sub.textContent = [provider.type, provider.phone].filter(Boolean).join(' · ');
      info.appendChild(sub);
      const remove = document.createElement('button');
      remove.className = 'delete-btn';
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        const next = JSON.parse(localStorage.getItem(providerKey(profile)) || '[]').filter(x => x.id !== provider.id);
        localStorage.setItem(providerKey(profile), JSON.stringify(next));
        renderHomeLibrary();
      });
      row.appendChild(info);
      row.appendChild(remove);
      providerList.appendChild(row);
    });
  }
}

function enableReminders() {
  if (!('Notification' in window)) {
    document.getElementById('reminderStatus').textContent = 'This browser does not support notifications.';
    return;
  }
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      localStorage.setItem('homeupkeep_reminders', 'on');
      document.getElementById('reminderStatus').textContent = 'Reminders enabled. A test reminder was sent.';
      new Notification('HomeUpkeep', { body: 'Your monthly home checklist is ready.' });
    } else {
      document.getElementById('reminderStatus').textContent = 'Notifications are blocked in this browser.';
    }
  });
}

function downloadBlob(filename, blob) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function exportHomeProfile() {
  const profile = currentProfile();
  downloadBlob('homeupkeep-profile.json', new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' }));
}

function importHomeProfile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const profile = JSON.parse(reader.result);
      if (!profile.market || !regionOptions[profile.market] || !profile.type || !profile.age) throw new Error('invalid');
      document.getElementById('homeName').value = profile.name || '';
      document.getElementById('marketSelect').value = profile.market;
      fillRegionOptions();
      document.getElementById('regionSelect').value = regionOptions[profile.market].includes(profile.region) ? profile.region : regionOptions[profile.market][0];
      document.getElementById('homeType').value = profile.type;
      document.getElementById('homeAge').value = profile.age;
      buildChecklist();
    } catch (error) {
      document.getElementById('resultsMeta').textContent = 'Import failed: invalid home profile.';
    }
  };
  reader.readAsText(file);
}

function downloadIcs() {
  const profile = currentProfile();
  const year = new Date().getFullYear();
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//HomeUpkeep//EN', 'CALSCALE:GREGORIAN'];
  monthNames.forEach((name, i) => {
    const tasksForMonth = buildForMonth(profile, i);
    const date = new Date(Date.UTC(year, i, 1, 9, 0, 0));
    const stamp = date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    tasksForMonth.forEach(task => {
      const safeTitle = task.title.replace(/[;,]/g, '');
      lines.push('BEGIN:VEVENT');
      lines.push('UID:' + task.id + '@homeupkeeppilot');
      lines.push('DTSTAMP:' + stamp);
      lines.push('DTSTART:' + stamp);
      lines.push('DTEND:' + stamp);
      lines.push('SUMMARY:HomeUpkeep - ' + safeTitle);
      lines.push('DESCRIPTION:' + task.why.replace(/[;,]/g, ''));
      lines.push('END:VEVENT');
    });
  });
  lines.push('END:VCALENDAR');
  downloadBlob('homeupkeep-reminders.ics', new Blob([lines.join('\r\n')], { type: 'text/calendar' }));
}

function downloadCsv() {
  const profile = currentProfile();
  const rows = [['Month','Task','Why','When','Time','Cost']];
  monthNames.forEach((name, i) => {
    buildForMonth(profile, i).forEach(task => {
      rows.push([name, task.title, task.why, task.when, task.duration, formatCost(task.cost)]);
    });
  });
  const records = JSON.parse(localStorage.getItem(recordKey(profile)) || '[]');
  if (records.length) {
    rows.push([]);
    rows.push(['Record date','Task or service','Cost','Notes']);
    records.forEach(r => rows.push([r.date, r.task, formatCost(r.cost), r.notes || '']));
  }
  const items = JSON.parse(localStorage.getItem(itemKey(profile)) || '[]');
  if (items.length) {
    rows.push([]);
    rows.push(['Item','Model','Warranty expiry']);
    items.forEach(i => rows.push([i.name, i.model || '', i.warranty || '']));
  }
  const providers = JSON.parse(localStorage.getItem(providerKey(profile)) || '[]');
  if (providers.length) {
    rows.push([]);
    rows.push(['Provider','Type','Phone']);
    providers.forEach(p => rows.push([p.name, p.type || '', p.phone || '']));
  }
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'homeupkeep-plan.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

fillRegionOptions();
marketSelect.addEventListener('change', () => {
  fillRegionOptions();
  if (document.getElementById('taskList').children.length) buildChecklist();
});
regionSelect.addEventListener('change', () => {
  if (document.getElementById('taskList').children.length) buildChecklist();
});
monthSelect.addEventListener('change', () => {
  month = parseInt(monthSelect.value, 10);
  if (document.getElementById('taskList').children.length) buildChecklist();
});
document.getElementById('buildBtn').addEventListener('click', buildChecklist);
document.getElementById('saveHomeBtn').addEventListener('click', saveCurrentHome);
document.getElementById('savedHomes').addEventListener('change', e => { if (e.target.value) loadSavedHome(e.target.value); });
document.getElementById('printBtn').addEventListener('click', () => window.print());
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('taskList').innerHTML = '';
  document.getElementById('resultsMeta').textContent = '';
  document.getElementById('progressBar').innerHTML = '';
  document.getElementById('progressText').textContent = '0 / 0 done';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.getElementById('itemForm').addEventListener('submit', e => {
  e.preventDefault();
  const profile = currentProfile();
  const items = JSON.parse(localStorage.getItem(itemKey(profile)) || '[]');
  items.push({
    id: Date.now(),
    name: document.getElementById('itemName').value.trim(),
    model: document.getElementById('itemModel').value.trim(),
    warranty: document.getElementById('itemWarranty').value
  });
  localStorage.setItem(itemKey(profile), JSON.stringify(items));
  document.getElementById('itemForm').reset();
  renderHomeLibrary();
});

document.getElementById('providerForm').addEventListener('submit', e => {
  e.preventDefault();
  const profile = currentProfile();
  const providers = JSON.parse(localStorage.getItem(providerKey(profile)) || '[]');
  providers.push({
    id: Date.now(),
    name: document.getElementById('providerName').value.trim(),
    phone: document.getElementById('providerPhone').value.trim(),
    type: document.getElementById('providerType').value.trim()
  });
  localStorage.setItem(providerKey(profile), JSON.stringify(providers));
  document.getElementById('providerForm').reset();
  renderHomeLibrary();
});

document.getElementById('emailForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('emailInput').value.trim();
  if (!email) return;
  const saved = JSON.parse(localStorage.getItem('homeupkeep_emails') || '[]');
  if (!saved.includes(email)) saved.push(email);
  localStorage.setItem('homeupkeep_emails', JSON.stringify(saved));
  document.getElementById('emailMsg').textContent = 'Saved on this device. Email delivery connects in production.';
  document.getElementById('emailInput').value = '';
});
document.getElementById('reminderBtn').addEventListener('click', enableReminders);
document.getElementById('recordForm').addEventListener('submit', e => {
  e.preventDefault();
  const profile = currentProfile();
  const records = JSON.parse(localStorage.getItem(recordKey(profile)) || '[]');
  records.push({
    date: document.getElementById('recordDate').value,
    task: document.getElementById('recordTask').value.trim(),
    cost: document.getElementById('recordCost').value,
    notes: document.getElementById('recordNotes').value.trim()
  });
  localStorage.setItem(recordKey(profile), JSON.stringify(records));
  document.getElementById('recordForm').reset();
  renderRecords();
});
document.getElementById('exportCsvBtn').addEventListener('click', downloadCsv);
document.getElementById('exportIcsBtn').addEventListener('click', downloadIcs);
document.getElementById('exportHomeBtn').addEventListener('click', exportHomeProfile);
document.getElementById('importHomeBtn').addEventListener('click', () => document.getElementById('importHomeInput').click());
document.getElementById('importHomeInput').addEventListener('change', e => { if (e.target.files[0]) importHomeProfile(e.target.files[0]); e.target.value = ''; });
document.getElementById('printFullBtn').addEventListener('click', () => {
  document.body.classList.add('print-full');
  window.print();
  setTimeout(() => document.body.classList.remove('print-full'), 200);
});
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const el = document.getElementById(btn.getAttribute('data-scroll'));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
refreshSavedHomes();
renderYearGrid();
renderRecords();
renderHomeLibrary();
renderDashboard();
