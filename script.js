(function(){
  const LS_CLUBS = 'aumClubs';
  const LS_REGS = 'aumRegistrations';

  window.getClubs = function(){ try { return JSON.parse(localStorage.getItem(LS_CLUBS)) || []; } catch(e){ console.error(e); return []; } };
  window.setClubs = function(arr){ localStorage.setItem(LS_CLUBS, JSON.stringify(arr || [])); };

  window.getRegs = function(){ try { return JSON.parse(localStorage.getItem(LS_REGS)) || []; } catch(e){ console.error(e); return []; } };
  window.setRegs = function(arr){ localStorage.setItem(LS_REGS, JSON.stringify(arr || [])); };

  window.genId = function(){ return 'c_' + Math.random().toString(36).slice(2,9); };

  
  const categoryRepresentativeImages = {
    'Tech': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1500&q=80',
    'Sports': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1500&q=80',
    'Cultural': 'https://images.unsplash.com/photo-1502920917128-1aa500764b5d?auto=format&fit=crop&w=1500&q=80',
    'Service': 'https://images.unsplash.com/photo-1520975911558-2a6fa2d4a36b?auto=format&fit=crop&w=1500&q=80',
    'Academic': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1500&q=80'
  };

  
  window.seedClubs = function(){
    const existing = getClubs();
    if(existing && existing.length) return;
    const sample = [
      {
        id: genId(),
        name: 'Computer Science Club',
        category: 'Tech',
        description: 'Projects, hackathons, workshops, study groups for CS students.',
        contact: 'csclub@aum.edu',
        tags: ['programming','ai','hackathon'],
        image: categoryRepresentativeImages['Tech']
      },
      {
        id: genId(),
        name: 'AUM Volleyball Club',
        category: 'Sports',
        description: 'Recreational & competitive volleyball — join practice and tournaments.',
        contact: 'sports@aum.edu',
        tags: ['volleyball','team'],
        image: categoryRepresentativeImages['Sports']
      },
      {
        id: genId(),
        name: 'Next Gen Innovation Club',
        category: 'Academic',
        description: 'Entrepreneurship, product workshops and startup mentorship.',
        contact: 'innovation@aum.edu',
        tags: ['entrepreneurship','design'],
        image: categoryRepresentativeImages['Academic']
      },
      {
        id: genId(),
        name: 'Community Service Corps',
        category: 'Service',
        description: 'Volunteer events and community outreach across Montgomery.',
        contact: 'service@aum.edu',
        tags: ['volunteer','community','outreach'],
        image: categoryRepresentativeImages['Service']
      },
      {
        id: genId(),
        name: 'Cultural Fusion Society',
        category: 'Cultural',
        description: 'Cultural performances, food festivals, and cross-cultural events.',
        contact: 'culture@aum.edu',
        tags: ['music','dance','festival'],
        image: categoryRepresentativeImages['Cultural']
      },
      {
        id: genId(),
        name: 'Robotics & Automation Club',
        category: 'Tech',
        description: 'Robotics projects, competitions, and learning sessions.',
        contact: 'robotics@aum.edu',
        tags: ['robotics','automation','hardware'],
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1500&q=80'
      },
      {
        id: genId(),
        name: 'Photography Club — FrameClickz',
        category: 'Cultural',
        description: 'Nature & event photography outings, editing workshops and exhibitions.',
        contact: 'photo@aum.edu',
        tags: ['photography','instagram','nature'],
        image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1500&q=80'
      },
      {
        id: genId(),
        name: 'Data Science Society',
        category: 'Academic',
        description: 'Learning sessions, kaggle competitions, and project collaborations.',
        contact: 'datasci@aum.edu',
        tags: ['data','ml','analytics'],
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1500&q=80'
      }
    ];
    setClubs(sample);
    setRegs([]);
  };

  
  function categoryColors(category){
    const map = {
      'Tech': ['#06b6d4','#0ea5e9'],
      'Sports': ['#fb923c','#f97316'],
      'Cultural': ['#f472b6','#fb7185'],
      'Academic': ['#60a5fa','#7c3aed'],
      'Service': ['#34d399','#10b981']
    };
    return map[category] || ['#7c3aed','#3b82f6'];
  }
  window.generatePlaceholderDataUrl = function(name, category){
    const initials = (name || '').split(' ').slice(0,2).map(s=>s[0]||'').join('').toUpperCase() || 'A';
    const cols = categoryColors(category || 'Tech');
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'>
      <defs>
        <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0' stop-color='${cols[0]}'/>
          <stop offset='1' stop-color='${cols[1]}'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <g>
        <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='160' fill='rgba(255,255,255,0.95)' font-weight='800'>${escapeXml(initials)}</text>
      </g>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  function escapeXml(s){ return String(s).replace(/[&<>'"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&apos;','"':'&quot;'}[c]; }); }

  
  window.deleteClub = function(id){
    const clubs = getClubs().filter(c=>c.id !== id); setClubs(clubs);
    const regs = getRegs().filter(r=>r.clubId !== id); setRegs(regs);
  };

  window.countRegistrationsForClub = function(clubId){ return (getRegs()||[]).filter(r=>r.clubId===clubId).length; };

  
  window.renderClubs = function(){
    const grid = document.getElementById('grid');
    if(!grid) return;
    const empty = document.getElementById('empty');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const clubs = getClubs() || [];
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const filter = (filterSelect ? filterSelect.value : '');
    const filtered = clubs.filter(c => {
      if(filter && c.category !== filter) return false;
      if(!q) return true;
      const combined = (c.name + ' ' + (c.tags||[]).join(' ') + ' ' + (c.description||'')).toLowerCase();
      return combined.includes(q);
    });

    grid.innerHTML = '';
    const countEl = document.getElementById('clubCount');
    if(countEl) countEl.textContent = filtered.length;

    if(filtered.length === 0){ if(empty) empty.style.display = 'block'; return; } else if(empty) empty.style.display = 'none';

    filtered.forEach(c => {
      const el = document.createElement('div'); el.className = 'card'; el.dataset.id = c.id;
      const imageSrc = c.image ? c.image : (categoryRepresentativeImages[c.category] || generatePlaceholderDataUrl(c.name, c.category));
      el.innerHTML = `
        <div class="media">
          <img src="${escapeHtmlAttr(imageSrc)}" alt="${escapeHtmlAttr(c.name)}" />
          <div class="overlay">
            <div style="flex:1">
              <div class="title">${escapeHtml(c.name)}</div>
              <div style="display:flex;gap:8px;margin-top:6px;align-items:center">
                <div class="badge ${escapeHtml(c.category)}">${escapeHtml(c.category)}</div>
                <div style="color:var(--muted);font-size:13px">${escapeHtml(c.contact||'')}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="desc">${escapeHtml(c.description||'')}</div>
          <div class="chips">${(c.tags||[]).slice(0,6).map(t=>`<span class="chip">${escapeHtml(t)}</span>`).join('')}</div>
        </div>

        <div class="card-footer">
          <div class="left-actions">
            <button class="small ghost" data-action="register">Register</button>
            <button class="small ghost" data-action="edit">Edit</button>
            <button class="small danger" data-action="delete">Delete</button>
          </div>
          <div style="text-align:right;color:var(--muted);font-size:13px">Members: <strong style="color:#cfe7ff">${countRegistrationsForClub(c.id)}</strong></div>
        </div>
      `;
      grid.appendChild(el);
    });
  };

  
  function escapeHtml(s){ if(s===undefined || s===null) return ''; return String(s).replace(/[&<>"']/g, (m)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
  function escapeHtmlAttr(s){ return escapeHtml(s).replace(/"/g,'&quot;'); }
  function escapeXmlUri(s){ return encodeURIComponent(String(s||'')).replace(/%20/g,' '); }

  
  window.DEBUG_AUM = { getClubs: ()=>getClubs(), getRegs: ()=>getRegs(), clearAll: ()=>{ localStorage.removeItem(LS_CLUBS); localStorage.removeItem(LS_REGS); location.reload(); } };

  
  window.generatePlaceholderDataUrl = generatePlaceholderDataUrl;
  window.seedClubs = window.seedClubs;
})();
