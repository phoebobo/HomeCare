const stateSelect = document.getElementById('state');
states.forEach(s => {
  const opt = document.createElement('option');
  opt.value = s;
  opt.textContent = s;
  stateSelect.appendChild(opt);
});

const iconPaths = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  flask: '<path d="M10 2v6L4.5 17a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8V2"/><path d="M8.5 2h7"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  shield: '<path d="M12 3 4 6v5c0 4.5 3.4 8.3 8 10 4.6-1.7 8-5.5 8-10V6z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  sparkles: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
  printer: '<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
  rotate: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>'
};
document.querySelectorAll('[data-icon]').forEach(el => {
  const name = el.getAttribute('data-icon');
  if (iconPaths[name]) {
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + iconPaths[name] + '</svg>';
  }
});
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const monthSelect = document.getElementById('monthSelect');
const currentMonth = new Date().getMonth();
let month = currentMonth;
monthNames.forEach((name, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = name;
  if (i === currentMonth) opt.selected = true;
  monthSelect.appendChild(opt);
});
monthSelect.addEventListener('change', () => {
  month = parseInt(monthSelect.value, 10);
  const state = document.getElementById('state').value;
  if (state && document.getElementById('taskList').children.length) buildChecklist();
});

function getSeason(m) {
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "fall";
  return "winter";
}

function allTasks() {
  return tasks.monthly.concat(tasks.spring, tasks.summer, tasks.fall, tasks.winter, tasks.older, tasks.climate);
}

function byId(id) {
  return allTasks().find(t => t.id === id);
}

function getDoneIds() {
  return new Set(JSON.parse(localStorage.getItem('homecare_m1_done') || '[]'));
}

function setDoneId(id, done) {
  const ids = getDoneIds();
  if (done) ids.add(id); else ids.delete(id);
  localStorage.setItem('homecare_m1_done', JSON.stringify([...ids]));
}

function updateProgress(tasks) {
  const done = getDoneIds();
  const count = tasks.filter(t => done.has(t.id)).length;
  const pct = tasks.length ? Math.round(count / tasks.length * 100) : 0;
  document.getElementById('progressBar').innerHTML = `<span style="width:${pct}%"></span>`;
  document.getElementById('progressText').textContent = `${count} / ${tasks.length} done`;
}

function buildChecklist() {
  const homeType = document.getElementById('homeType').value;
  const homeAge = document.getElementById('homeAge').value;
  const state = document.getElementById('state').value;
  const meta = document.getElementById('resultsMeta');
  if (!state) {
    meta.textContent = 'Select a state first.';
    return;
  }
  const season = getSeason(month);
  const ids = [];
  const add = (arr) => arr.forEach(t => {
    if (!ids.includes(t.id)) ids.push(t.id);
  });
  add(tasks.monthly);
  add(tasks[season]);
  if (homeType === 'house') add(tasks.spring.concat(tasks.summer, tasks.fall, tasks.winter).filter(t => t.tag === 'home'));
  if (homeAge === 'older') add(tasks.older);
  if (coldStates.has(state) && season === 'winter') add(tasks.climate.filter(t => t.id === 'cold-insulation'));
  if (hotStates.has(state) && season === 'summer') add(tasks.climate.filter(t => t.id === 'hot-ac'));
  if (humidStates.has(state) && (season === 'spring' || season === 'summer')) add(tasks.climate.filter(t => t.id === 'humid-mold'));
  const selected = ids.map(byId).filter(Boolean);
  render(selected, homeType, homeAge, state);
}

function render(selected, homeType, homeAge, state) {
  const list = document.getElementById('taskList');
  const meta = document.getElementById('resultsMeta');
  const typeLabel = document.getElementById('homeType').selectedOptions[0].textContent;
  const ageLabel = document.getElementById('homeAge').selectedOptions[0].textContent;
  meta.textContent = `${monthNames[month]} · ${state} · ${typeLabel} · ${ageLabel}`;
  if (!selected.length) {
    list.innerHTML = '<div class="empty-state">No tasks found for this combination yet. Try a different state or home type.</div>';
    updateProgress([]);
    return;
  }
  list.innerHTML = '';
  const doneIds = getDoneIds();
  selected.forEach(task => {
    const card = document.createElement('article');
    card.className = 'task-card';
    const tagClass = task.tag === 'home' ? 'tag-home' : (task.tag === 'age' || task.tag === 'climate') ? 'tag-season' : 'tag-all';
    const tagText = task.tag === 'home' ? 'Home type' : task.tag === 'age' ? 'Home age' : task.tag === 'climate' ? 'Climate' : 'Monthly';
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
            <div class="task-line task-cost"><strong>Cost</strong>${task.cost}</div>
            <div class="task-line task-skip"><strong>If you skip it</strong>${task.skip}</div>
          </div>
          <div class="task-line task-pro"><strong>Call a pro when</strong>${task.pro}</div>
          <div class="task-note">${task.note}</div>
        </div>
      </div>
    `;
    const check = card.querySelector('.check');
    check.checked = doneIds.has(task.id);
    card.classList.toggle('done', check.checked);
    card.querySelector('.task-title').textContent = task.title;
    check.addEventListener('change', e => {
      card.classList.toggle('done', e.target.checked);
      setDoneId(task.id, e.target.checked);
      updateProgress(selected);
    });
    list.appendChild(card);
  });
  updateProgress(selected);
  document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });

}

document.getElementById('buildBtn').addEventListener('click', buildChecklist);
document.getElementById('printBtn').addEventListener('click', () => window.print());
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('state').value = '';
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
  document.getElementById('emailMsg').textContent = 'Saved on this device. Email delivery connects in M2.';
  document.getElementById('emailInput').value = '';
});
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const el = document.getElementById(btn.getAttribute('data-scroll'));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
if (window.lucide) lucide.createIcons();
