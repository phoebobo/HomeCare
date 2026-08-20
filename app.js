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
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 8l5-5 5 5M12 3v12"/>'
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

function getDoneIds() {
  return new Set(JSON.parse(localStorage.getItem('homecare_m1_done') || '[]'));
}

function setDoneId(id, done) {
  const ids = getDoneIds();
  if (done) ids.add(id); else ids.delete(id);
  localStorage.setItem('homecare_m1_done', JSON.stringify([...ids]));
}

function formatCost(cost) {
  const currency = markets[marketSelect.value].currency;
  return cost.replace(/\$/g, currency);
}

function updateProgress(tasks) {
  const done = getDoneIds();
  const count = tasks.filter(t => done.has(t.id)).length;
  const pct = tasks.length ? Math.round(count / tasks.length * 100) : 0;
  document.getElementById('progressBar').innerHTML = `<span style="width:${pct}%"></span>`;
  document.getElementById('progressText').textContent = `${count} / ${tasks.length} done`;
}

function taskCard(task, selected) {
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
  const doneIds = getDoneIds();
  check.checked = doneIds.has(task.id);
  card.classList.toggle('done', check.checked);
  card.querySelector('.task-title').textContent = task.title;
  check.addEventListener('change', e => {
    card.classList.toggle('done', e.target.checked);
    setDoneId(task.id, e.target.checked);
    if (selected) updateProgress(selected);
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
    updateProgress([]);
    return;
  }
  selected.forEach(task => list.appendChild(taskCard(task, selected)));
  updateProgress(selected);
  document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildChecklist() {
  const profile = currentProfile();
  if (!profile.region) {
    document.getElementById('resultsMeta').textContent = 'Select a state or region first.';
    return;
  }
  render(buildForMonth(profile, month), profile);
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
      check.checked = getDoneIds().has(task.id);
      check.addEventListener('change', () => {
        setDoneId(task.id, check.checked);
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

function saveCurrentHome() {
  const profile = currentProfile();
  const homes = JSON.parse(localStorage.getItem('homecare_homes') || '[]');
  const idx = homes.findIndex(h => h.name === profile.name);
  if (idx >= 0) homes[idx] = profile; else homes.push(profile);
  localStorage.setItem('homecare_homes', JSON.stringify(homes));
  const btn = document.getElementById('saveHomeBtn');
  btn.textContent = 'Saved';
  setTimeout(() => btn.textContent = 'Save home', 1200);
}

function renderRecords() {
  const records = JSON.parse(localStorage.getItem('homecare_records') || '[]');
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
}

function enableReminders() {
  if (!('Notification' in window)) {
    document.getElementById('reminderStatus').textContent = 'This browser does not support notifications.';
    return;
  }
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      localStorage.setItem('homecare_reminders', 'on');
      document.getElementById('reminderStatus').textContent = 'Reminders enabled. A test reminder was sent.';
      new Notification('HomeCarePilot', { body: 'Your monthly home checklist is ready.' });
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
  downloadBlob('homecare-profile.json', new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' }));
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
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//HomeCarePilot//M5//EN', 'CALSCALE:GREGORIAN'];
  monthNames.forEach((name, i) => {
    const tasksForMonth = buildForMonth(profile, i);
    const date = new Date(Date.UTC(year, i, 1, 9, 0, 0));
    const stamp = date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    tasksForMonth.forEach(task => {
      const safeTitle = task.title.replace(/[;,]/g, '');
      lines.push('BEGIN:VEVENT');
      lines.push('UID:' + task.id + '@homecarepilot');
      lines.push('DTSTAMP:' + stamp);
      lines.push('DTSTART:' + stamp);
      lines.push('DTEND:' + stamp);
      lines.push('SUMMARY:HomeCarePilot - ' + safeTitle);
      lines.push('DESCRIPTION:' + task.why.replace(/[;,]/g, ''));
      lines.push('END:VEVENT');
    });
  });
  lines.push('END:VCALENDAR');
  downloadBlob('homecare-reminders.ics', new Blob([lines.join('\r\n')], { type: 'text/calendar' }));
}

function downloadCsv() {
  const profile = currentProfile();
  const rows = [['Month','Task','Why','When','Time','Cost']];
  monthNames.forEach((name, i) => {
    buildForMonth(profile, i).forEach(task => {
      rows.push([name, task.title, task.why, task.when, task.duration, formatCost(task.cost)]);
    });
  });
  const records = JSON.parse(localStorage.getItem('homecare_records') || '[]');
  if (records.length) {
    rows.push([]);
    rows.push(['Record date','Task or service','Cost','Notes']);
    records.forEach(r => rows.push([r.date, r.task, formatCost(r.cost), r.notes || '']));
  }
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'homecare-plan.csv';
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
document.getElementById('printBtn').addEventListener('click', () => window.print());
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('taskList').innerHTML = '';
  document.getElementById('resultsMeta').textContent = '';
  document.getElementById('progressBar').innerHTML = '';
  document.getElementById('progressText').textContent = '0 / 0 done';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.getElementById('emailForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('emailInput').value.trim();
  if (!email) return;
  const saved = JSON.parse(localStorage.getItem('homecare_m1_emails') || '[]');
  if (!saved.includes(email)) saved.push(email);
  localStorage.setItem('homecare_m1_emails', JSON.stringify(saved));
  document.getElementById('emailMsg').textContent = 'Saved on this device. Email delivery connects in production.';
  document.getElementById('emailInput').value = '';
});
document.getElementById('reminderBtn').addEventListener('click', enableReminders);
document.getElementById('recordForm').addEventListener('submit', e => {
  e.preventDefault();
  const records = JSON.parse(localStorage.getItem('homecare_records') || '[]');
  records.push({
    date: document.getElementById('recordDate').value,
    task: document.getElementById('recordTask').value.trim(),
    cost: document.getElementById('recordCost').value,
    notes: document.getElementById('recordNotes').value.trim()
  });
  localStorage.setItem('homecare_records', JSON.stringify(records));
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
renderYearGrid();
renderRecords();
