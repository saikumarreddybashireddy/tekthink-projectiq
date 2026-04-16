const VIEWS = {
  management: {
    title: 'Management Dashboard',
    breadcrumb: 'Skyline Heights — Executive Overview',
    render: () => `
      <div class="alert-banner red" onclick="askSuggestion('What should I do about the Tower B concrete pour delay of 12 days? Give me an action plan.');openAI()">
        <span class="alert-banner-icon">⚠️</span>
        <div class="alert-banner-text"><strong>Tower B Delay Risk:</strong> Concrete pour is 12 days behind schedule. Supplier escalation required immediately.</div>
        <span class="alert-banner-action" onclick="event.stopPropagation();askSuggestion('What should I do about the Tower B concrete pour delay?');openAI()">Ask AI →</span>
        <button class="alert-banner-close" onclick="event.stopPropagation();this.closest('.alert-banner').remove()">✕</button>
      </div>
      <div class="alert-banner amber">
        <span class="alert-banner-icon">💰</span>
        <div class="alert-banner-text"><strong>Payments Due:</strong> ₹4.2 Cr to BuildCo due Apr 20 · ₹1.2 Cr Architect fees due Apr 30</div>
        <span class="alert-banner-action" onclick="switchView('finance')">View Finance →</span>
        <button class="alert-banner-close" onclick="this.closest('.alert-banner').remove()">✕</button>
      </div>

      <div class="quick-actions">
        <div class="quick-action" onclick="switchView('construction')">🏗️ Construction Report</div>
        <div class="quick-action" onclick="switchView('sales')">💰 Sales Pipeline</div>
        <div class="quick-action" onclick="switchView('cx')">🎯 CX Issues</div>
        <div class="quick-action" onclick="openModal('add-task-modal')">➕ Add Task</div>
        <div class="quick-action" onclick="askSuggestion('Generate a comprehensive executive summary report for Skyline Heights project for today');openAI()">🧠 AI Report</div>
      </div>

      <div class="kpi-grid">
        ${kpi('Overall Progress','68%','↑ 3% this week','up',[52,55,58,60,62,64,65,66,67,68],'Overall Progress')}
        ${kpi('Revenue Booked','₹142 Cr','↑ ₹8 Cr vs target','up',[100,110,120,128,135,138,140,142],'Revenue Booked')}
        ${kpi('Open Issues','23','↓ 5 resolved today','up',[34,30,28,26,25,24,23],'Open Issues')}
        ${kpi('RERA Status','Active','All filings current','neutral',null,'RERA Status')}
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            Construction Progress — Live
            <span class="badge badge-green" style="font-size:10px"><span class="pulse-dot"></span>&nbsp;Live</span>
          </div>
          ${PROJECT_DATA.construction.towers.map(t => progRow(t.name, t.pct, t.color, `openTowerDetail('${t.id}')`)).join('')}
          <div class="divider"></div>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--txt2)">
            <span>Tasks: ${PROJECT_DATA.construction.tasksComplete}/${PROJECT_DATA.construction.tasksTotal} complete</span>
            <span>Labour: ${PROJECT_DATA.construction.labour} on-site</span>
            <span style="color:var(--red)">⚠️ ${PROJECT_DATA.construction.delayedTasks} delayed</span>
          </div>
        </div>
        <div class="card">
          <div class="card-title">Risk & Alert Summary <button class="tbl-action" onclick="askSuggestion('Analyze all current risks and give me a prioritized mitigation plan');openAI()">🧠 AI Analyze</button></div>
          ${riskRow('Tower B — 12-day concrete pour delay','red','Escalate supplier · Notify contractor')}
          ${riskRow('Budget overrun — Overheads at 80%: ₹1.2 Cr risk','amber','Review contractor billing scope')}
          ${riskRow('RERA compliance — Fire NOC pending May 2026','amber','Finance team to follow up')}
          ${riskRow('Tower C finishing — 1 week ahead of schedule','green','Opportunity to accelerate handover',false)}
          ${riskRow('Sales velocity — 14% above monthly target','green','',false)}
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">Sales Pipeline by Phase <button class="tbl-action" onclick="switchView('sales')">View All →</button></div>
          <table class="tbl">
            <tr><th>Phase</th><th>Units</th><th>Booked</th><th>Revenue</th><th>Conv.</th></tr>
            ${PROJECT_DATA.sales.pipeline.map(p => `<tr onclick="switchView('sales')"><td><strong>${p.phase}</strong></td><td>${p.units}</td><td>${p.booked}</td><td>${p.revenue}</td><td>${Math.round(p.booked/p.units*100)}%</td></tr>`).join('')}
          </table>
          <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
            ${progRow('Overall Revenue', PROJECT_DATA.sales.pctAchieved, '#10b981')}
          </div>
        </div>
        <div class="card">
          <div class="card-title">AI Insights <span class="badge badge-purple" style="font-size:10px">Project IQ</span> <button class="tbl-action" onclick="refreshAIInsights()">🔄 Refresh</button></div>
          <div id="ai-insights-container">
            <div class="ai-insight-card" onclick="askSuggestion('Tell me more about the Tower C sales upsell opportunity for early handover premium');openAI()">
              <span class="ai-insight-icon">📈</span>
              <div><div class="ai-insight-label">Sales Signal</div><div class="ai-insight-text">Tower C velocity up 14% — finishing ahead of schedule creates upsell opportunity for early handover premium. Estimated upside: ₹2–4 Cr.</div></div>
            </div>
            <div class="ai-insight-card" onclick="askSuggestion('Explain the cascading impact of Tower B concrete delay on MEP and finishing timeline');openAI()">
              <span class="ai-insight-icon">⚠️</span>
              <div><div class="ai-insight-label">Risk Alert</div><div class="ai-insight-text">Tower B concrete delay (12 days) will cascade to MEP and finishing. Estimated total impact: 3 weeks on handover date.</div></div>
            </div>
            <div class="ai-insight-card" onclick="askSuggestion('Analyze Phase 2 pricing strategy. Current ₹5,200 vs market ₹4,900. Recommendations?');openAI()">
              <span class="ai-insight-icon">💡</span>
              <div><div class="ai-insight-label">Pricing Insight</div><div class="ai-insight-text">Phase 2 conversion dropped 8% — current pricing ₹5,200/sqft vs market avg ₹4,900. Price review recommended.</div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- TOWER MAP -->
      <div class="card mb-18">
        <div class="card-title">
          Tower & Flat Map — Skyline Heights
          <div style="display:flex;align-items:center;gap:8px">
            <select class="filter-select" style="font-size:11px;padding:4px 8px" onchange="filterFlatsByStatus(this.value)" id="flat-filter">
              <option value="all">All Flats</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="reserved">Reserved</option>
              <option value="hot-lead">Hot Lead</option>
              <option value="under-construction">Under Construction</option>
            </select>
            <button class="tbl-action" onclick="askSuggestion('Analyze the current flat booking status across all towers. Which configurations are selling fastest and what pricing strategy would maximize revenue for remaining available units?');openAI()">🧠 AI Insights</button>
          </div>
        </div>
        <div style="display:flex;gap:16px;margin-bottom:12px;flex-wrap:wrap">
          <div style="text-align:center;padding:6px 14px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;cursor:pointer" onclick="filterFlatsByStatus('booked')">
            <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#166534" id="stat-booked">190</div>
            <div style="font-size:10px;color:#166534">Booked</div>
          </div>
          <div style="text-align:center;padding:6px 14px;background:#dbeafe;border:1px solid #93c5fd;border-radius:8px;cursor:pointer" onclick="filterFlatsByStatus('available')">
            <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#1e40af" id="stat-available">62</div>
            <div style="font-size:10px;color:#1e40af">Available</div>
          </div>
          <div style="text-align:center;padding:6px 14px;background:#fef3c7;border:1px solid #fde68a;border-radius:8px;cursor:pointer" onclick="filterFlatsByStatus('reserved')">
            <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#92400e" id="stat-reserved">18</div>
            <div style="font-size:10px;color:#92400e">Reserved</div>
          </div>
          <div style="text-align:center;padding:6px 14px;background:#ffedd5;border:1px solid #fdba74;border-radius:8px;cursor:pointer" onclick="filterFlatsByStatus('hot-lead')">
            <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#c2410c" id="stat-hotlead">12</div>
            <div style="font-size:10px;color:#c2410c">Hot Leads</div>
          </div>
          <div style="text-align:center;padding:6px 14px;background:#f3f4f6;border:1px solid #d1d5db;border-radius:8px;cursor:pointer" onclick="filterFlatsByStatus('under-construction')">
            <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#6b7280" id="stat-wip">18</div>
            <div style="font-size:10px;color:#6b7280">Under Construction</div>
          </div>
        </div>
        <div class="tower-map-wrap">
          <div class="tower-map-container" id="tower-map-container"></div>
        </div>
        <div class="tower-legend">
          <div class="legend-item" onclick="filterFlatsByStatus('booked')"><div class="legend-dot" style="background:#dcfce7;border-color:#86efac"></div>Booked</div>
          <div class="legend-item" onclick="filterFlatsByStatus('available')"><div class="legend-dot" style="background:#dbeafe;border-color:#93c5fd"></div>Available</div>
          <div class="legend-item" onclick="filterFlatsByStatus('reserved')"><div class="legend-dot" style="background:#fef3c7;border-color:#fde68a"></div>Reserved</div>
          <div class="legend-item" onclick="filterFlatsByStatus('hot-lead')"><div class="legend-dot" style="background:#ffedd5;border-color:#fdba74"></div>Hot Lead</div>
          <div class="legend-item" onclick="filterFlatsByStatus('under-construction')"><div class="legend-dot" style="background:#f3f4f6;border-color:#d1d5db"></div>Under Construction</div>
          <div class="legend-item" onclick="filterFlatsByStatus('sold')"><div class="legend-dot" style="background:#ede9fe;border-color:#c4b5fd"></div>Sold (Registered)</div>
          <div class="legend-item" onclick="filterFlatsByStatus('all')" style="margin-left:auto;color:var(--accent)">Show All</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Recent Activity <button class="tbl-action" onclick="askSuggestion('Summarize what has happened on the Skyline Heights project in the last 24 hours and what needs my attention');openAI()">🧠 AI Summary</button></div>
        ${ACTIVITY_LOG.map(a => `
          <div class="activity-item">
            <div class="activity-time">${a.time}</div>
            <div class="activity-content">${a.content}</div>
          </div>`).join('')}
      </div>`
  },

  construction: {
    title: 'Construction Progress',
    breadcrumb: 'Skyline Heights · Site Operations & IoT Monitoring',
    render: () => `
      <div class="kpi-grid">
        ${kpi('Tasks Complete',`${PROJECT_DATA.construction.tasksComplete}/${PROJECT_DATA.construction.tasksTotal}`,'71.7% complete','neutral',[60,65,68,70,71,72],'Tasks Complete')}
        ${kpi('IoT Sensors','24 Active','All reporting','up',null,'IoT Sensors')}
        ${kpi('Delayed Tasks',`${PROJECT_DATA.construction.delayedTasks}`,'↑ 2 since last week','down',[3,4,5,5,6,7],'Delayed Tasks')}
        ${kpi('Labour On-site',`${PROJECT_DATA.construction.labour}`,'Peak capacity','neutral',null,'Labour On-site')}
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">Milestone Timeline <button class="tbl-action" onclick="askSuggestion('Based on current progress, what is the expected completion date for each tower?');openAI()">🧠 Forecast</button></div>
          <div class="timeline">
            ${tlItem('done','Foundation Complete — Tower A','Mar 10, 2026')}
            ${tlItem('done','Superstructure Level 8 — Tower A','Apr 1, 2026')}
            ${tlItem('wip','Superstructure Level 12 — Tower A','Apr 30, 2026')}
            ${tlItem('wip','Foundation Complete — Tower B','May 15, 2026')}
            ${tlItem('todo','MEP Works — Tower A','Jun 2026')}
            ${tlItem('todo','Finishing — Tower C','Jul 2026')}
            ${tlItem('todo','Handover — Tower C','Aug 2026',true)}
          </div>
        </div>
        <div class="card">
          <div class="card-title">Tower Progress <button class="tbl-action" onclick="switchView('management')">← Back</button></div>
          ${PROJECT_DATA.construction.towers.map(t => `
            <div class="prog-row" onclick="openTowerDetail('${t.id}')">
              <div class="prog-label" title="${t.name}">${t.name}</div>
              <div class="prog-bar-bg"><div class="prog-bar-fill" style="width:${t.pct}%;background:${t.color}"></div></div>
              <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
                <div class="prog-pct">${t.pct}%</div>
                ${statusBadge(t.status)}
              </div>
            </div>`).join('')}
          <div class="divider"></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <span class="tag" onclick="filterTower('all')">All Towers</span>
            ${PROJECT_DATA.construction.towers.map(t => `<span class="tag" onclick="filterTower('${t.id}')">${t.id}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- IoT Sensors Grid -->
      <div class="card mb-18">
        <div class="card-title">
          IoT Sensor Monitoring 
          <div style="display:flex;align-items:center;gap:8px">
            <span class="badge badge-green" style="font-size:10px"><span class="pulse-dot"></span>&nbsp;Live · Updates every 3s</span>
            <button class="tbl-action" onclick="askSuggestion('Analyze all IoT sensor readings and flag any anomalies or safety concerns');openAI()">🧠 AI Analyze</button>
          </div>
        </div>
        <div class="grid-4" style="gap:10px;margin-bottom:0" id="sensor-grid">
          ${PROJECT_DATA.construction.sensors.map(s => `
            <div class="sensor-card" onclick="openSensorDetail('${s.id}')">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <div class="sensor-name">${s.name}</div>
                <span class="badge badge-${s.status==='OK'?'green':'amber'}" style="font-size:10px">${s.status}</span>
              </div>
              <div class="sensor-val" id="sensor-val-${s.id}">${s.val}${s.unit}</div>
              <div class="sensor-loc">📍 ${s.loc}</div>
              <div class="sensor-trend">${sensorMiniChart(s.history, s.status==='OK'?'#10b981':'#f59e0b')}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="card mb-18">
        <div class="card-title">
          Delay Tracking & Risk Log
          <button class="tbl-action" onclick="askSuggestion('Analyze all construction delays and give me a comprehensive mitigation plan with specific actions for each');openAI()">🧠 AI Analysis</button>
        </div>
        <table class="tbl">
          <tr><th>ID</th><th>Task</th><th>Owner</th><th>Planned</th><th>Revised</th><th>Delay</th><th>Risk</th><th>Actions</th></tr>
          ${PROJECT_DATA.construction.delays.map(d => `
            <tr onclick="openRowDetail('delay','${d.id}')">
              <td style="font-weight:500;color:var(--txt3);font-size:10px">${d.id}</td>
              <td><strong>${d.task}</strong></td>
              <td>${d.owner}</td>
              <td>${d.planned}</td>
              <td style="color:var(--amber)">${d.revised}</td>
              <td><strong style="color:var(--red)">${d.days}d</strong></td>
              <td>${statusBadge(d.risk)}</td>
              <td style="display:flex;gap:4px">
                <button class="tbl-action" onclick="event.stopPropagation();openRowDetail('delay','${d.id}')">View →</button>
                <button class="tbl-action" onclick="event.stopPropagation();askSuggestion('How do I resolve: ${d.task.replace(/'/g,'`')} which is ${d.days} days delayed?');openAI()">🧠</button>
              </td>
            </tr>`).join('')}
        </table>
      </div>

      <div class="card">
        <div class="card-title">
          Task Board
          <div style="display:flex;gap:6px">
            <input class="search-input" style="width:180px" placeholder="Search tasks..." oninput="filterTasks(this.value)" id="task-search">
            <button class="tbl-action" onclick="openModal('add-task-modal')">+ Add Task</button>
          </div>
        </div>
        <table class="tbl" id="task-table">
          <tr><th>ID</th><th>Task</th><th>Zone</th><th>Owner</th><th>Due</th><th>Priority</th><th>Status</th><th>Action</th></tr>
          ${PROJECT_DATA.construction.tasks.map(t => `
            <tr onclick="openRowDetail('task','${t.id}')">
              <td style="color:var(--txt3);font-size:10px">${t.id}</td>
              <td><strong>${t.name}</strong></td>
              <td>${t.zone}</td>
              <td>${t.owner}</td>
              <td style="color:${t.status==='Delayed'?'var(--red)':'var(--txt2)'}">${t.due}</td>
              <td>${statusBadge(t.priority)}</td>
              <td>${statusBadge(t.status)}</td>
              <td><button class="tbl-action" onclick="event.stopPropagation();openRowDetail('task','${t.id}')">Edit</button></td>
            </tr>`).join('')}
        </table>
      </div>`
  },

  sales: {
    title: 'Sales & Lead Pipeline',
    breadcrumb: 'Skyline Heights · CRM & Revenue Analytics',
    render: () => `
      <div class="kpi-grid">
        ${kpi('Total Leads','284','↑ 38 this month','up',[220,235,250,264,270,278,284],'Total Leads')}
        ${kpi('Bookings','190','₹103 Cr locked','up',[140,155,165,175,182,188,190],'Bookings')}
        ${kpi('Site Visits','67','This week','neutral',null,'Site Visits')}
        ${kpi('Revenue Achieved','84%','₹142 / ₹170 Cr target','neutral',[70,73,78,80,82,83,84],'Revenue Achieved')}
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            Active Lead Pipeline
            <div style="display:flex;gap:6px">
              <input class="search-input" style="width:140px" placeholder="Search leads..." oninput="filterLeads(this.value)">
              <button class="tbl-action" onclick="askSuggestion('Which leads should I prioritize this week to hit revenue target? Rank by probability and value');openAI()">🧠 Prioritize</button>
            </div>
          </div>
          <div style="margin-bottom:12px">
            ${progRow('🔴 Hot — Ready to book', 42, '#ef4444', "filterByStage('Hot')")}
            ${progRow('🟡 Warm — Negotiating', 68, '#f59e0b', "filterByStage('Warm')")}
            ${progRow('🔵 Exploring', 100, '#3b82f6', "filterByStage('Exploring')")}
          </div>
          <div id="leads-container">
            ${PROJECT_DATA.sales.leads.map(l => `
              <div class="lead-card" onclick="openRowDetail('lead','${l.id}')">
                <div class="lead-card-top">
                  <div class="lead-name">${l.name}</div>
                  <div>${statusBadge(l.stage)}</div>
                </div>
                <div class="lead-meta">
                  <span>🏠 ${l.unit}</span>
                  <span style="color:var(--teal);font-weight:600">${l.value}</span>
                  <span>📞 ${l.lastContact}</span>
                  <span>📊 ${l.chance}% prob.</span>
                </div>
                <div style="margin-top:6px">
                  <div class="prog-bar-bg" style="height:4px"><div class="prog-bar-fill" style="width:${l.chance}%;background:${l.chance>70?'#10b981':l.chance>50?'#f59e0b':'#3b82f6'}"></div></div>
                </div>
              </div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-title">Monthly Revenue <button class="tbl-action" onclick="askSuggestion('Forecast revenue for next 3 months based on current sales velocity and pipeline');openAI()">🧠 Forecast</button></div>
          ${PROJECT_DATA.sales.monthly.map(m => `
            <div class="rev-row" onclick="showToast('${m.month}: ${m.val} revenue','info')">
              <div class="rev-row-top"><span class="rev-label">${m.month}</span><span class="rev-val">${m.val}</span></div>
              <div class="prog-bar-bg"><div class="prog-bar-fill" style="width:${m.pct}%;background:#3b82f6"></div></div>
            </div>`).join('')}
          
          <div class="divider"></div>
          <div class="section-title" style="font-size:11px;color:var(--txt2);text-transform:uppercase;letter-spacing:0.06em">Revenue Forecast — Next 4 Months</div>
          <div style="display:flex;align-items:flex-end;gap:6px;height:80px;margin-bottom:4px">
            ${PROJECT_DATA.sales.forecast.map(f => `
              <div class="forecast-bar" onclick="showToast('${f.month} Forecast: ₹${f.val} Cr (Target: ₹${f.target} Cr)','info')">
                <div class="forecast-val">₹${f.val}Cr</div>
                <div style="width:100%;position:relative">
                  <div class="forecast-bar-inner" style="height:${Math.round(f.val/30*60)}px;background:${f.val>=f.target?'#10b981':'#f59e0b'}"></div>
                  <div style="position:absolute;bottom:0;left:0;right:0;height:${Math.round(f.target/30*60)}px;border-top:2px dashed #ef4444;pointer-events:none"></div>
                </div>
                <div class="forecast-month">${f.month}</div>
              </div>`).join('')}
          </div>
          <div style="font-size:10px;color:var(--txt3)">Red dashed line = monthly target. Green = on/above target.</div>

          <div class="divider"></div>
          <div class="section-title" style="font-size:11px;color:var(--txt2);text-transform:uppercase;letter-spacing:0.06em">Bookings by Unit Type</div>
          ${progRow('2BHK (135 units)', 72, '#10b981', "showToast('2BHK: 97 of 135 units booked','info')")}
          ${progRow('3BHK (145 units)', 58, '#3b82f6', "showToast('3BHK: 84 of 145 units booked','info')")}
          ${progRow('Penthouse (20 units)', 45, '#8b5cf6', "showToast('Penthouse: 9 of 20 units booked','info')")}
        </div>
      </div>

      <div class="card">
        <div class="card-title">Full Lead Table <button class="tbl-action" onclick="askSuggestion('Analyze all leads and give me a conversion optimization strategy');openAI()">🧠 AI Optimize</button></div>
        <table class="tbl">
          <tr><th>Lead</th><th>Unit</th><th>Value</th><th>Stage</th><th>Visits</th><th>Last Contact</th><th>Probability</th><th>Action</th></tr>
          ${PROJECT_DATA.sales.leads.map(l => `
            <tr onclick="openRowDetail('lead','${l.id}')">
              <td><strong>${l.name}</strong></td>
              <td>${l.unit}</td>
              <td style="color:var(--teal);font-weight:600">${l.value}</td>
              <td>${statusBadge(l.stage)}</td>
              <td>${l.visits}</td>
              <td>${l.lastContact}</td>
              <td>
                <div style="display:flex;align-items:center;gap:6px">
                  <div class="prog-bar-bg" style="flex:1;height:5px"><div class="prog-bar-fill" style="width:${l.chance}%;background:${l.chance>70?'#10b981':l.chance>50?'#f59e0b':'#3b82f6'}"></div></div>
                  <span style="font-size:11px;color:var(--txt2);width:28px">${l.chance}%</span>
                </div>
              </td>
              <td style="display:flex;gap:4px">
                <button class="tbl-action" onclick="event.stopPropagation();openRowDetail('lead','${l.id}')">View</button>
                <button class="tbl-action" onclick="event.stopPropagation();askSuggestion('Give me a tailored follow-up strategy for ${l.name} (${l.stage} lead, ${l.value})');openAI()">🧠</button>
              </td>
            </tr>`).join('')}
        </table>
      </div>`
  },

  cx: {
    title: 'Customer Success (CX)',
    breadcrumb: 'Skyline Heights · Issue Resolution & Sentiment',
    render: () => `
      <div class="kpi-grid">
        ${kpi('Open Issues','23','8 escalated','down',[34,30,28,26,25,24,23],'Open Issues CX')}
        ${kpi('Avg Resolution','2.4 days','↓ 0.6 days improved','up',null,'Avg Resolution')}
        ${kpi('SLA Compliance','91%','Target: 95%','down',null,'SLA Compliance')}
        ${kpi('CSAT Score','4.2 / 5','↑ 0.3 this month','up',[3.6,3.8,3.9,4.0,4.1,4.2],'CSAT Score')}
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            Issue Log
            <div style="display:flex;gap:6px">
              <select class="filter-select" style="font-size:11px;padding:5px 8px" onchange="filterIssues(this.value)">
                <option value="all">All Status</option>
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
              </select>
              <button class="tbl-action" onclick="askSuggestion('Which customer issues are most urgent and what should I do first? Rank and give action plan');openAI()">🧠 Triage</button>
            </div>
          </div>
          <div id="issues-list">
            ${PROJECT_DATA.cx.issues.map(i => `
              <div class="issue-card ${i.priority==='High'?'high':'normal'}" onclick="openRowDetail('issue','${i.id}')">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                  <span style="font-weight:600;font-size:11px;color:var(--blue)">${i.id}</span>
                  <div style="display:flex;gap:4px">${statusBadge(i.priority)} ${statusBadge(i.status)}</div>
                </div>
                <div style="font-size:12.5px;font-weight:500;margin-bottom:3px">${i.issue}</div>
                <div style="display:flex;gap:8px;font-size:11px;color:var(--txt2)">
                  <span>👤 ${i.customer}</span>
                  <span>🏠 ${i.unit}</span>
                  <span>⏱ ${i.age}</span>
                </div>
              </div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-title">SLA Performance <button class="tbl-action" onclick="askSuggestion('Analyze our SLA performance and give recommendations to improve compliance from 91% to 95%');openAI()">🧠 Improve</button></div>
          ${PROJECT_DATA.cx.sla.map(s => slaRow(s.level, s.target, s.actual, s.status)).join('')}

          <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
            <div style="font-size:11px;color:var(--txt2);margin-bottom:8px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em">Sentiment Analysis — AI Powered</div>
            <div style="display:flex;gap:8px;margin-bottom:10px">
              <span class="badge badge-green" style="cursor:pointer" onclick="showToast('Positive sentiment: 58% of 312 reviews','info')">✓ Positive ${PROJECT_DATA.cx.sentiment.positive}%</span>
              <span class="badge badge-amber" style="cursor:pointer" onclick="showToast('Neutral sentiment: 28% of 312 reviews','info')">~ Neutral ${PROJECT_DATA.cx.sentiment.neutral}%</span>
              <span class="badge badge-red" style="cursor:pointer" onclick="showToast('Negative sentiment: 14% — 44 reviews with issues','warning')">✗ Negative ${PROJECT_DATA.cx.sentiment.negative}%</span>
            </div>
            <div class="sparkline-row" style="height:48px;cursor:pointer" onclick="askSuggestion('Analyze customer sentiment trends and what is driving negative sentiment?');openAI()">
              ${PROJECT_DATA.cx.sentimentTrend.map(v => `<div class="sparkline-bar" style="height:${v}%;background:${v>65?'#10b981':v>58?'#f59e0b':'#ef4444'}"></div>`).join('')}
            </div>
            <div style="font-size:10px;color:var(--txt3);margin-top:4px">Sentiment trend — last 12 weeks · Click to analyze</div>
          </div>

          <div class="divider"></div>
          <div class="section-title" style="font-size:11px;margin-bottom:8px">Quick Actions</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="tbl-action" onclick="bulkEscalate()">🔴 Escalate All High</button>
            <button class="tbl-action" onclick="askSuggestion('Draft a customer satisfaction improvement plan for Skyline Heights CX team');openAI()">🧠 Improve CX</button>
            <button class="tbl-action" onclick="showToast('Report exported','success')">📊 Export Report</button>
          </div>
        </div>
      </div>`
  },

  finance: {
    title: 'Project Finance',
    breadcrumb: 'Skyline Heights · Budget, Payments & Compliance',
    render: () => `
      <div class="kpi-grid">
        ${kpi('Total Budget','₹420 Cr','Approved','neutral',null,'Total Budget')}
        ${kpi('Spent to Date','₹186 Cr','44% utilized','neutral',[20,40,60,80,100,140,186],'Spent to Date')}
        ${kpi('Payments Due','₹12.4 Cr','Next 30 days','down',null,'Payments Due')}
        ${kpi('Compliance','100%','All filings current','up',null,'Compliance')}
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">Budget Utilization by Category <button class="tbl-action" onclick="askSuggestion('Analyze budget utilization across all categories and flag any overrun risks');openAI()">🧠 Analyze</button></div>
          ${PROJECT_DATA.finance.budgetBreakdown.map(b => `
            <div class="prog-row" onclick="openBudgetDetail('${b.label}','${b.budgeted}','${b.spent}',${b.pct},'${b.color}')">
              <div class="prog-label" title="${b.label}">${b.label}</div>
              <div class="prog-bar-bg"><div class="prog-bar-fill" style="width:${b.pct}%;background:${b.pct>=80?'#ef4444':b.pct>=60?'#f59e0b':b.color}"></div></div>
              <div style="display:flex;align-items:center;gap:4px;flex-shrink:0">
                <div class="prog-pct">${b.pct}%</div>
                ${b.pct>=80?`<span class="badge badge-red" style="font-size:9px">High</span>`:''}
              </div>
            </div>`).join('')}
          <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border);font-size:12px;color:var(--txt2)">
            <span style="color:var(--red);font-weight:600">⚠️ Overheads at 80%</span> — review contractor billing scope
          </div>
          <div class="divider"></div>
          <div style="display:flex;justify-content:space-between;font-size:12px">
            <div class="fin-stat" style="padding:8px"><div class="fin-stat-val" style="color:var(--teal)">₹186 Cr</div><div class="fin-stat-label">Spent</div></div>
            <div class="fin-stat" style="padding:8px"><div class="fin-stat-val" style="color:var(--amber)">₹234 Cr</div><div class="fin-stat-label">Remaining</div></div>
            <div class="fin-stat" style="padding:8px"><div class="fin-stat-val" style="color:var(--blue)">44%</div><div class="fin-stat-label">Utilized</div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">
            Vendor Payment Schedule
            <button class="tbl-action" onclick="askSuggestion('Analyze upcoming vendor payments and flag any cash flow risks or payment conflicts');openAI()">🧠 Analyze</button>
          </div>
          <table class="tbl">
            <tr><th>Vendor</th><th>Amount</th><th>Due Date</th><th>Status</th><th>Action</th></tr>
            ${PROJECT_DATA.finance.payments.map(p => `
              <tr onclick="openRowDetail('payment','${p.id}')">
                <td><strong>${p.vendor}</strong></td>
                <td style="font-weight:600;color:var(--txt)">${p.amount}</td>
                <td style="color:${p.status==='Pending'?'var(--amber)':'var(--txt2)'}">${p.due}</td>
                <td>${statusBadge(p.status)}</td>
                <td><button class="tbl-action" onclick="event.stopPropagation();openRowDetail('payment','${p.id}')">View</button></td>
              </tr>`).join('')}
          </table>
          <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
            <div class="stat-row"><div class="stat-key">Total Due (30 days)</div><div class="stat-val" style="color:var(--amber)">₹12.4 Cr</div></div>
            <div class="stat-row"><div class="stat-key">Overdue</div><div class="stat-val" style="color:var(--red)">₹0 Cr</div></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Regulatory Compliance Status <button class="tbl-action" onclick="askSuggestion('What regulatory compliance items need urgent attention and what are the risks of non-compliance?');openAI()">🧠 Review</button></div>
        <div class="comp-tags" style="margin-bottom:12px">
          ${PROJECT_DATA.finance.compliance.map(c => `
            <span class="badge badge-${c.status==='green'?'green':c.status==='amber'?'amber':'blue'}" style="cursor:pointer;font-size:12px;padding:5px 10px" onclick="showToast('${c.label}: ${c.expiry}','${c.status==='green'?'success':c.status==='amber'?'warning':'info'}')">
              ${c.status==='green'?'✓':c.status==='amber'?'⏳':'🔄'} ${c.label}
            </span>`).join('')}
        </div>
        <div class="risk-row amber" style="cursor:pointer" onclick="askSuggestion('What are the implications of Fire NOC being pending and how should we address this?');openAI()">
          <div class="risk-dot"></div>
          <div class="risk-text"><strong>⏳ Fire NOC</strong> pending — expected clearance May 2026. Click for AI analysis.</div>
        </div>
        <div class="risk-row green">
          <div class="risk-dot"></div>
          <div class="risk-text">All other 5 regulatory items current and compliant. RERA expires Dec 2027.</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Cash Flow — Monthly (₹ Cr) <button class="tbl-action" onclick="askSuggestion('Analyze the cash flow pattern and predict if there will be any cash shortage in next 6 months');openAI()">🧠 Forecast</button></div>
        <div style="display:flex;align-items:flex-end;gap:12px;height:100px">
          ${PROJECT_DATA.finance.cashflow.map(m => `
            <div style="flex:1;display:flex;flex-direction:column;gap:2px;cursor:pointer" onclick="showToast('${m.month}: Inflow ₹${m.inflow}Cr | Outflow ₹${m.outflow}Cr | Net ₹${m.inflow-m.outflow}Cr','${m.inflow>=m.outflow?'success':'warning'}')">
              <div style="font-size:10px;color:var(--teal);text-align:center">+${m.inflow}</div>
              <div style="height:${Math.round(m.inflow/30*60)}px;background:#10b981;border-radius:4px 4px 0 0;width:100%"></div>
              <div style="height:${Math.round(m.outflow/30*60)}px;background:#ef4444;border-radius:0 0 4px 4px;width:100%"></div>
              <div style="font-size:10px;color:var(--red);text-align:center">-${m.outflow}</div>
              <div style="font-size:9px;color:var(--txt3);text-align:center">${m.month}</div>
            </div>`).join('')}
          <div style="width:1px;height:80%;background:var(--border);position:absolute"></div>
        </div>
        <div style="display:flex;gap:12px;margin-top:8px;font-size:11px">
          <span style="color:var(--teal)">■ Inflow (Sales)</span>
          <span style="color:var(--red)">■ Outflow (Payments)</span>
          <span style="color:var(--amber)">Apr: Net -₹2Cr — watch closely</span>
        </div>
      </div>`
  },

  reports: {
    title: 'Reports & Analytics',
    breadcrumb: 'Skyline Heights · Weekly & Monthly Reports',
    render: () => `
      <div class="quick-actions">
        <div class="quick-action" onclick="generateReport('executive')">📊 Executive Summary</div>
        <div class="quick-action" onclick="generateReport('construction')">🏗️ Construction Report</div>
        <div class="quick-action" onclick="generateReport('sales')">💰 Sales Report</div>
        <div class="quick-action" onclick="generateReport('finance')">📈 Finance Report</div>
        <div class="quick-action" onclick="generateReport('cx')">🎯 CX Report</div>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Available Reports</div>
          ${[
            {name:'Week 15 Progress Report',date:'Apr 14, 2026',type:'Construction',status:'Ready'},
            {name:'April Sales Pipeline',date:'Apr 14, 2026',type:'Sales',status:'Ready'},
            {name:'Q1 Financial Summary',date:'Apr 1, 2026',type:'Finance',status:'Ready'},
            {name:'CX Sentiment Analysis',date:'Apr 10, 2026',type:'CX',status:'Ready'},
            {name:'RERA Quarterly Filing',date:'Mar 31, 2026',type:'Compliance',status:'Ready'},
            {name:'Week 14 Progress Report',date:'Apr 7, 2026',type:'Construction',status:'Archived'}
          ].map(r => `
            <div class="activity-item" onclick="showToast('Opening ${r.name}...','info')">
              <div class="activity-time" style="width:80px">${r.date}</div>
              <div class="activity-content">
                <strong>${r.name}</strong>
                <span class="badge badge-${r.type==='Construction'?'amber':r.type==='Sales'?'green':r.type==='Finance'?'blue':r.type==='CX'?'purple':'gray'}" style="font-size:10px;margin-left:6px">${r.type}</span>
              </div>
              <div style="display:flex;gap:4px">
                <button class="tbl-action" onclick="event.stopPropagation();showToast('Downloading ${r.name}','success')">📥</button>
                <button class="tbl-action" onclick="event.stopPropagation();askSuggestion('Summarize and analyze the key findings from the ${r.name}');openAI()">🧠</button>
              </div>
            </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-title">AI Report Generation <span class="badge badge-purple" style="font-size:10px">Project IQ</span></div>
          <div class="form-group">
            <div class="form-label">Report Type</div>
            <select class="form-select" id="report-type">
              <option>Executive Summary</option>
              <option>Construction Progress</option>
              <option>Sales & Revenue</option>
              <option>Customer Experience</option>
              <option>Financial Overview</option>
              <option>Risk Assessment</option>
            </select>
          </div>
          <div class="form-group">
            <div class="form-label">Period</div>
            <select class="form-select" id="report-period">
              <option>This Week</option><option>This Month</option><option>Last Quarter</option>
            </select>
          </div>
          <div class="form-group">
            <div class="form-label">Focus Areas</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${['Delays','Budget','Sales','Risks','Compliance','Sentiment'].map(f => `<span class="tag" onclick="this.style.background=this.style.background?'':'var(--navy)';this.style.color=this.style.color?'':'#fff'">${f}</span>`).join('')}
            </div>
          </div>
          <button class="btn btn-accent" style="width:100%" onclick="generateAIReport()">🧠 Generate AI Report</button>
          <div id="report-preview" style="margin-top:12px"></div>
        </div>
      </div>`
  },

  customer: {
    title: 'Customer Portal',
    breadcrumb: 'My Unit · Ramesh Kumar · A-1204',
    render: () => `
      <div style="max-width:600px;margin:0 auto">
        <div class="portal-hero">
          <div class="portal-hero-greeting">Welcome back,</div>
          <div class="portal-hero-name">Ramesh Kumar</div>
          <div class="portal-hero-unit">Unit A-1204 · Tower A · 3BHK · 1,480 sqft · ₹88L</div>
          <div class="portal-hero-actions">
            <button class="portal-btn portal-btn-primary" onclick="askSuggestion('Give me a detailed status update for Unit A-1204 in Tower A for Ramesh Kumar, including construction progress, next payment, and any important alerts');openAI()">🧠 Ask Project IQ</button>
            <button class="portal-btn portal-btn-ghost" onclick="showToast('Report downloading...','success')">📄 Download Report</button>
            <button class="portal-btn portal-btn-ghost" onclick="openModal('add-task-modal')">📝 Raise Issue</button>
          </div>
        </div>

        <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:14px">
          ${kpi('Unit Progress','78%','On schedule','up',[60,65,70,74,76,77,78],'Unit Progress')}
          ${kpi('Payments Made','₹52.8 L','3 of 5 paid','neutral',null,'Payments Made')}
          ${kpi('Open Issues','1','Parking query','neutral',null,'Open Issues Customer')}
        </div>

        <div class="card mb-14">
          <div class="card-title">Construction Milestones — Your Unit</div>
          <div class="timeline">
            ${PROJECT_DATA.customer.milestones.map((m, i) => tlItem(m.status, m.label, m.date, i === PROJECT_DATA.customer.milestones.length - 1)).join('')}
          </div>
        </div>

        <div class="card mb-14">
          <div class="card-title">Payment Schedule <button class="tbl-action" onclick="askSuggestion('When is the next payment due for Unit A-1204 and what are the payment details?');openAI()">🧠 Ask AI</button></div>
          <table class="tbl">
            <tr><th>Installment</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr>
            ${PROJECT_DATA.customer.payments.map(p => `
              <tr onclick="showToast('${p.name}: ${p.amount} — ${p.date}','info')">
                <td><strong>${p.name}</strong></td>
                <td>${p.amount}</td>
                <td>${p.date}</td>
                <td>${statusBadge(p.status)}</td>
                <td>${p.status==='Pending'?`<button class="tbl-action" onclick="event.stopPropagation();showToast('Redirecting to payment gateway...','info')">Pay Now →</button>`:`<span style="font-size:10px;color:var(--txt3)">${p.status==='Paid'?'Receipt ↓':'Upcoming'}</span>`}</td>
              </tr>`).join('')}
          </table>
          <div style="margin-top:10px;padding:10px;background:var(--surface2);border-radius:8px;display:flex;justify-content:space-between;font-size:12px">
            <span>Total Paid: <strong style="color:var(--teal)">₹52.8 L</strong></span>
            <span>Remaining: <strong style="color:var(--amber)">₹35.2 L</strong></span>
            <span>Progress: <strong>60% paid</strong></span>
          </div>
        </div>

        <div class="card mb-14">
          <div class="card-title">Unit Details</div>
          <div class="info-grid">
            <div class="info-item"><div class="info-label">Unit</div><div class="info-value">A-1204</div></div>
            <div class="info-item"><div class="info-label">Tower</div><div class="info-value">Tower A</div></div>
            <div class="info-item"><div class="info-label">Configuration</div><div class="info-value">3BHK</div></div>
            <div class="info-item"><div class="info-label">Floor</div><div class="info-value">12th</div></div>
            <div class="info-item"><div class="info-label">Carpet Area</div><div class="info-value">1,480 sqft</div></div>
            <div class="info-item"><div class="info-label">Possession</div><div class="info-value" style="color:var(--amber)">Sep 2026</div></div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Project Alerts & Compliance</div>
          <div class="risk-row green"><div class="risk-dot"></div><div class="risk-text">RERA registration valid — expires Dec 2027. Project ID: ${PROJECT_DATA.reraId}</div></div>
          <div class="risk-row green"><div class="risk-dot"></div><div class="risk-text">Environmental clearance obtained and valid</div></div>
          <div class="risk-row amber" style="cursor:pointer" onclick="askSuggestion('Does the pending Fire NOC affect my unit handover at A-1204?');openAI()"><div class="risk-dot"></div><div class="risk-text">Fire NOC pending — expected May 2026. Does not affect unit handover. Click to ask AI.</div></div>
        </div>
      </div>`
  },

  settings: {
    title: 'Settings',
    breadcrumb: 'TekThink Project IQ — Configuration',
    render: () => `
      <div style="max-width:600px">
        <div class="card mb-14">
          <div class="card-title">Project Settings</div>
          <div class="form-group"><div class="form-label">Project Name</div><input class="form-input" value="Skyline Heights"></div>
          <div class="form-group"><div class="form-label">Location</div><input class="form-input" value="Hyderabad, Telangana"></div>
          <div class="form-group"><div class="form-label">RERA ID</div><input class="form-input" value="${PROJECT_DATA.reraId}"></div>
          <div class="form-group"><div class="form-label">Total Units</div><input class="form-input" type="number" value="300"></div>
          <button class="btn btn-primary" onclick="showToast('Settings saved','success')">Save Changes</button>
        </div>
        <div class="card mb-14">
          <div class="card-title">Notification Preferences</div>
          ${[
            {label:'Delay Alerts', desc:'Get notified when tasks are delayed'},
            {label:'SLA Breaches', desc:'Alert on SLA threshold breach'},
            {label:'Payment Reminders', desc:'Payment due date reminders'},
            {label:'AI Insights', desc:'Daily AI-generated project insights'}
          ].map(n => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)">
              <div><div style="font-size:12.5px;font-weight:500">${n.label}</div><div style="font-size:11px;color:var(--txt2)">${n.desc}</div></div>
              <div style="width:36px;height:20px;border-radius:10px;background:var(--accent);cursor:pointer;position:relative" onclick="this.style.background=this.style.background==='rgb(249, 115, 22)'?'var(--border)':'var(--accent)'">
                <div style="width:16px;height:16px;border-radius:50%;background:#fff;position:absolute;top:2px;right:2px;transition:all 0.2s"></div>
              </div>
            </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-title">AI Configuration</div>
          <div class="form-group"><div class="form-label">AI Model</div><select class="form-select"><option>claude-haiku-4-5-20251001 (Current)</option></select></div>
          <div class="form-group"><div class="form-label">Response Style</div><select class="form-select"><option>Concise & Actionable</option><option>Detailed Analysis</option><option>Executive Brief</option></select></div>
          <div class="form-group"><div class="form-label">Auto-Insights</div>
            <div style="display:flex;align-items:center;gap:8px">
              <div style="width:36px;height:20px;border-radius:10px;background:var(--accent);cursor:pointer"><div style="width:16px;height:16px;border-radius:50%;background:#fff;margin-left:auto;margin-right:2px;margin-top:2px"></div></div>
              <span style="font-size:12px;color:var(--txt2)">Generate daily AI insights automatically</span>
            </div>
          </div>
          <button class="btn btn-accent" onclick="showToast('AI settings saved','success')">Save AI Settings</button>
        </div>
      </div>`
  },

  // ========== PORTFOLIO ==========
  portfolio:{title:'Project Portfolio',breadcrumb:'TekThink PPM — All Active Projects',render:()=>`
    <style>
      .pf-proj-row{background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden;box-shadow:var(--shadow);margin-bottom:14px;transition:box-shadow .2s}
      .pf-proj-row:hover{box-shadow:var(--shadow-md)}
      .pf-proj-header{display:flex;align-items:center;gap:14px;padding:16px 18px;cursor:pointer;user-select:none}
      .pf-proj-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
      .pf-proj-info{flex:1;min-width:0}
      .pf-proj-name{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:var(--txt)}
      .pf-proj-meta{font-size:11px;color:var(--txt2);margin-top:2px}
      .pf-proj-kpis{display:flex;gap:20px;align-items:center;flex-shrink:0}
      .pf-kpi{text-align:center}
      .pf-kpi-val{font-family:'Syne',sans-serif;font-size:15px;font-weight:800}
      .pf-kpi-lbl{font-size:9px;color:var(--txt3);text-transform:uppercase;letter-spacing:.06em;margin-top:1px}
      .pf-chevron{font-size:13px;color:var(--txt3);transition:transform .25s;flex-shrink:0;margin-left:8px}
      .pf-chevron.open{transform:rotate(90deg)}
      .pf-expand{display:none;border-top:1px solid var(--border);background:var(--surface2);padding:18px}
      .pf-expand.open{display:block;animation:slideDown .22s cubic-bezier(.16,1,.3,1)}
      @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
      .pf-section-title{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px}
      .pf-tower-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:16px}
      .pf-tower-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px;cursor:pointer;transition:all .15s}
      .pf-tower-card:hover{border-color:var(--accent);box-shadow:var(--shadow)}
      .pf-tower-name{font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:var(--txt);margin-bottom:6px}
      .pf-tower-stats{display:flex;gap:10px;margin-bottom:8px}
      .pf-tower-stat{font-size:10.5px;color:var(--txt2)}
      .pf-tower-stat span{font-weight:700;color:var(--txt)}
      .pf-flat-row{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin-top:8px}
      .pf-flat-chip{padding:3px 0;border-radius:4px;font-size:9px;font-weight:600;text-align:center;cursor:pointer;transition:opacity .12s}
      .pf-flat-chip:hover{opacity:.75}
      .pf-flat-chip.sold{background:#dcfce7;color:#166534}
      .pf-flat-chip.booked{background:#dbeafe;color:#1e40af}
      .pf-flat-chip.available{background:#f3f4f6;color:#6b7280;border:1px solid #e5e7eb}
      .pf-flat-chip.reserved{background:#fef3c7;color:#92400e}
      .pf-flat-legend{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:10px}
      .pf-legend-dot{width:10px;height:10px;border-radius:3px;flex-shrink:0}
      .pf-proj-prog{height:5px;background:var(--surface3);border-radius:10px;overflow:hidden;margin-top:8px}
      .pf-proj-prog-fill{height:100%;border-radius:10px}
    </style>

    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <div>
        <div style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--txt)">Good morning, Arjun 👋</div>
        <div style="font-size:12px;color:var(--txt2);margin-top:3px">Thursday, April 16, 2026 · TekThink Developers · 3 active projects</div>
      </div>
      <button class="ask-ai-btn" onclick="askSuggestion('Give me a comprehensive morning briefing across all 3 projects — what needs my attention today?');openAI()">🧠 Morning Briefing</button>
    </div>

    <!-- Alerts -->
    <div class="alert-banner red" onclick="askSuggestion('What should I do about the Tower B concrete pour delay of 12 days? Give me an action plan.');openAI()">
      <span class="alert-banner-icon">⚠️</span>
      <div class="alert-banner-text"><strong>Tower B Delay Risk:</strong> Concrete pour is 12 days behind schedule. Supplier escalation required immediately.</div>
      <span class="alert-banner-action" onclick="event.stopPropagation();askSuggestion('What should I do about the Tower B concrete pour delay?');openAI()">Ask AI →</span>
      <button class="alert-banner-close" onclick="event.stopPropagation();this.closest('.alert-banner').remove()">✕</button>
    </div>
    <div class="alert-banner amber">
      <span class="alert-banner-icon">💰</span>
      <div class="alert-banner-text"><strong>Payments Due:</strong> ₹4.2 Cr to BuildCo due Apr 20 · ₹1.2 Cr Architect fees due Apr 30</div>
      <span class="alert-banner-action" onclick="switchView('finance')">View Finance →</span>
      <button class="alert-banner-close" onclick="this.closest('.alert-banner').remove()">✕</button>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions" style="margin-bottom:16px">
      <div class="quick-action" onclick="switchView('sales')">💰 Sales</div>
      <div class="quick-action" onclick="switchView('cx')">🎯 CX Issues</div>
      <div class="quick-action" onclick="switchView('finance')">📈 Finance</div>
      <div class="quick-action" onclick="askSuggestion('Generate a comprehensive executive summary report for all 3 projects for today');openAI()">🧠 AI Report</div>
    </div>

    <!-- Construction + AI Insights -->
    <div class="grid-2" style="margin-bottom:20px">
      <div class="card">
        <div class="card-title">Construction Progress — Skyline Heights</div>
        ${PROJECT_DATA.construction.towers.map(t => progRow(t.name, t.pct, t.color)).join('')}
        <div class="divider"></div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--txt2)">
          <span>Tasks: ${PROJECT_DATA.construction.tasksComplete}/${PROJECT_DATA.construction.tasksTotal}</span>
          <span>Labour: ${PROJECT_DATA.construction.labour} on-site</span>
          <span style="color:var(--red)">⚠️ ${PROJECT_DATA.construction.delayedTasks} delayed</span>
        </div>
      </div>
      <div class="card">
        <div class="card-title">AI Portfolio Insights</div>
        <div class="ai-insight-card" onclick="askSuggestion('Marina Bay Villas has CRZ and soil issues — what urgent actions should I take?');openAI()">
          <span class="ai-insight-icon">🚨</span><div><div class="ai-insight-label">Urgent — Marina Bay</div><div class="ai-insight-text">CRZ clearance pending + soil collapse near Zone 2. Risk of 3-month delay. Escalate immediately.</div></div>
        </div>
        <div class="ai-insight-card" onclick="askSuggestion('Prestige Gardens is at 59% revenue vs target. How do we accelerate bookings?');openAI()">
          <span class="ai-insight-icon">💡</span><div><div class="ai-insight-label">Opportunity — Prestige</div><div class="ai-insight-text">Only 59% to revenue target. NRI referral incentive +0.5% could add ₹18 Cr.</div></div>
        </div>
        <div class="ai-insight-card" onclick="askSuggestion('Skyline Heights Tower C is ahead of schedule — how do I monetize this?');openAI()">
          <span class="ai-insight-icon">📈</span><div><div class="ai-insight-label">Win — Skyline Heights</div><div class="ai-insight-text">Tower C 1 week ahead. Early handover premium could yield ₹3–4 Cr additional revenue.</div></div>
        </div>
      </div>
    </div>

    <!-- Portfolio KPIs -->
    <div class="kpi-grid" style="margin-bottom:20px">
      ${kpi('Active Projects','3','Hyderabad · Bengaluru · Chennai','neutral',null)}
      ${kpi('Total Revenue','₹252 Cr','vs ₹440 Cr target','neutral',[180,200,220,240,252])}
      ${kpi('Total Units','570','Across all projects','neutral',null)}
      ${kpi('Alerts','6','Delays & issues pending','down',null)}
    </div>

    <!-- Project Rows -->
    ${(()=>{
      const PROJ_TOWERS = {
        P1: [
          { name:'Tower A', floors:18, totalFlats:100, sold:42, booked:28, reserved:8, available:22 },
          { name:'Tower B', floors:16, totalFlats:96,  sold:18, booked:12, reserved:14, available:52 },
          { name:'Tower C', floors:15, totalFlats:104, sold:58, booked:32, reserved:6,  available:8  }
        ],
        P2: [
          { name:'Block A', floors:14, totalFlats:96, sold:52, booked:18, reserved:10, available:16 },
          { name:'Block B', floors:12, totalFlats:84, sold:24, booked:8,  reserved:12, available:40 }
        ],
        P3: [
          { name:'Zone 1 — 30 Villas', floors:2, totalFlats:30, sold:10, booked:4, reserved:2, available:14 },
          { name:'Zone 2 — 30 Villas', floors:2, totalFlats:30, sold:4,  booked:2, reserved:4, available:20 },
          { name:'Zone 3 — 30 Villas', floors:2, totalFlats:30, sold:2,  booked:0, reserved:2, available:26 }
        ]
      };
      const gradients = {P1:'linear-gradient(135deg,#1e3a5f,#f97316)',P2:'linear-gradient(135deg,#064e3b,#10b981)',P3:'linear-gradient(135deg,#1e3a8a,#3b82f6)'};
      const healthStyle = h => h==='green'?{bg:'#dcfce7',c:'#166534',txt:'On Track'}:h==='amber'?{bg:'#fef3c7',c:'#92400e',txt:'Attention'}:{bg:'#fee2e2',c:'#991b1b',txt:'At Risk'};
      const alerts = {P1:'⚠️ Tower B concrete pour — 12 days delayed',P2:'✅ On track — minor lift shaft delay',P3:'🚨 CRZ compliance & soil issues critical'};

      return ALL_PROJECTS.map(p => {
        const towers = PROJ_TOWERS[p.id]||[];
        const health = healthStyle(p.health);
        const totalSold = towers.reduce((s,t)=>s+t.sold,0);
        const totalBooked = towers.reduce((s,t)=>s+t.booked,0);
        const totalAvail = towers.reduce((s,t)=>s+t.available,0);
        const towersHtml = towers.map(t => {
          // Generate flat chips: show up to 20 representative chips
          const slots = Math.min(t.totalFlats, 20);
          const scale = t.totalFlats / slots;
          const soldSlots = Math.round(t.sold/scale);
          const bookedSlots = Math.round(t.booked/scale);
          const reservedSlots = Math.round(t.reserved/scale);
          const availSlots = slots - soldSlots - bookedSlots - reservedSlots;
          const chips = [
            ...Array(soldSlots).fill('<div class="pf-flat-chip sold">✓</div>'),
            ...Array(bookedSlots).fill('<div class="pf-flat-chip booked">B</div>'),
            ...Array(Math.max(0,reservedSlots)).fill('<div class="pf-flat-chip reserved">R</div>'),
            ...Array(Math.max(0,availSlots)).fill('<div class="pf-flat-chip available">○</div>')
          ];
          return `
          <div class="pf-tower-card" onclick="enterProject('${p.id}');showToast('Opening ${t.name} in ${p.name}','info')">
            <div class="pf-tower-name">🏢 ${t.name}</div>
            <div class="pf-tower-stats">
              <div class="pf-tower-stat"><span>${t.floors}</span> Floors</div>
              <div class="pf-tower-stat"><span>${t.totalFlats}</span> Units</div>
            </div>
            <div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap">
              <span style="font-size:9.5px;padding:2px 7px;border-radius:4px;background:#dcfce7;color:#166534;font-weight:600">${t.sold} Sold</span>
              <span style="font-size:9.5px;padding:2px 7px;border-radius:4px;background:#dbeafe;color:#1e40af;font-weight:600">${t.booked} Booked</span>
              <span style="font-size:9.5px;padding:2px 7px;border-radius:4px;background:#fef3c7;color:#92400e;font-weight:600">${t.reserved} Reserved</span>
              <span style="font-size:9.5px;padding:2px 7px;border-radius:4px;background:#f3f4f6;color:#6b7280;font-weight:600">${t.available} Available</span>
            </div>
            <div class="pf-flat-row">${chips.join('')}</div>
            <div class="pf-proj-prog" style="margin-top:8px">
              <div class="pf-proj-prog-fill" style="width:${Math.round((t.sold+t.booked)/t.totalFlats*100)}%;background:${p.accent}"></div>
            </div>
            <div style="font-size:9px;color:var(--txt3);margin-top:3px">${Math.round((t.sold+t.booked)/t.totalFlats*100)}% absorbed</div>
          </div>`;
        }).join('');

        return `
        <div class="pf-proj-row" id="pfrow-${p.id}">
          <div class="pf-proj-header" onclick="togglePfProject('${p.id}')">
            <div class="pf-proj-icon" style="background:${gradients[p.id]}">${p.image}</div>
            <div class="pf-proj-info">
              <div class="pf-proj-name">${p.name}</div>
              <div class="pf-proj-meta">📍 ${p.location} &nbsp;·&nbsp; ${p.type} &nbsp;·&nbsp; RERA: ${p.rera}</div>
              <div class="pf-proj-prog" style="width:180px;margin-top:6px">
                <div class="pf-proj-prog-fill" style="width:${p.overview.progress}%;background:${p.accent}"></div>
              </div>
              <div style="font-size:9.5px;color:var(--txt3);margin-top:3px">${p.overview.progress}% complete · ${alerts[p.id]}</div>
            </div>
            <div class="pf-proj-kpis">
              <div class="pf-kpi"><div class="pf-kpi-val" style="color:${p.accent}">${towers.length}</div><div class="pf-kpi-lbl">${p.id==='P3'?'Zones':'Towers'}</div></div>
              <div class="pf-kpi"><div class="pf-kpi-val">${p.totalUnits}</div><div class="pf-kpi-lbl">Total Units</div></div>
              <div class="pf-kpi"><div class="pf-kpi-val" style="color:var(--teal)">${totalSold}</div><div class="pf-kpi-lbl">Sold</div></div>
              <div class="pf-kpi"><div class="pf-kpi-val" style="color:var(--blue)">${totalBooked}</div><div class="pf-kpi-lbl">Booked</div></div>
              <div class="pf-kpi"><div class="pf-kpi-val" style="color:var(--txt2)">${totalAvail}</div><div class="pf-kpi-lbl">Available</div></div>
              <div class="pf-kpi"><div class="pf-kpi-val" style="color:var(--teal)">${p.overview.revenue}</div><div class="pf-kpi-lbl">Revenue</div></div>
              <span style="background:${health.bg};color:${health.c};padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;white-space:nowrap">${health.txt}</span>
            </div>
            <div style="display:flex;gap:6px;margin-left:8px">
              <button class="tbl-action" onclick="event.stopPropagation();enterProject('${p.id}')" style="white-space:nowrap;padding:6px 10px">Open →</button>
              <button class="tbl-action" onclick="event.stopPropagation();askSuggestion('AI briefing for ${p.name}: health, towers, sales, risks today');openAI()" style="padding:6px 8px">🧠</button>
            </div>
            <div class="pf-chevron" id="pfchev-${p.id}">▶</div>
          </div>
          <div class="pf-expand" id="pfexp-${p.id}">
            <div class="pf-flat-legend" style="margin-bottom:12px">
              <div style="display:flex;align-items:center;gap:5px;font-size:10.5px"><div class="pf-legend-dot" style="background:#dcfce7;border:1px solid #86efac"></div> Sold/Registered</div>
              <div style="display:flex;align-items:center;gap:5px;font-size:10.5px"><div class="pf-legend-dot" style="background:#dbeafe;border:1px solid #93c5fd"></div> Booked</div>
              <div style="display:flex;align-items:center;gap:5px;font-size:10.5px"><div class="pf-legend-dot" style="background:#fef3c7;border:1px solid #fcd34d"></div> Reserved</div>
              <div style="display:flex;align-items:center;gap:5px;font-size:10.5px"><div class="pf-legend-dot" style="background:#f3f4f6;border:1px solid #e5e7eb"></div> Available</div>
            </div>
            <div class="pf-section-title">${p.id==='P3'?'Villa Zones':'Tower Breakdown'} — ${p.name}</div>
            <div class="pf-tower-grid">${towersHtml}</div>
            <div style="display:flex;gap:8px;margin-top:4px">
              <button class="btn btn-accent" onclick="enterProject('${p.id}')">Open Full Dashboard →</button>
              <button class="btn btn-ghost" onclick="enterProject('${p.id}');setTimeout(()=>switchView('management'),100)">View Dashboard</button>
              <button class="btn btn-ghost" onclick="askSuggestion('Full tower-wise sales analysis for ${p.name} — which towers need focus?');openAI()">🧠 AI Tower Analysis</button>
            </div>
          </div>
        </div>`;
      }).join('');
    })()}

    <div id="pf-autoopen"></div>`
  },
  // ========== FUNNEL ==========
  funnel:{title:'Sales Conversion Funnel',breadcrumb:'Skyline Heights · Lead to Registration Analytics',render:()=>`
    <div class="kpi-grid">
      ${kpi('Total Inquiries','284','All channels','neutral',null)}
      ${kpi('Site Visit Rate','65%','186 of 284','neutral',null)}
      ${kpi('Visit→Agreement','22%','30 of 142 visits','down',null)}
      ${kpi('Overall Conv.','14.8%','42 agreements','down',[10,11,12,13,14,14.8])}
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Conversion Funnel <button class="tbl-action" onclick="askSuggestion('Analyze sales funnel drop-off at each stage and give specific interventions');openAI()">🧠 Analyze</button></div>
        ${PROJECT_DATA.funnel.map((stage,i)=>{const drop=i>0?PROJECT_DATA.funnel[i-1].count-stage.count:0;return`
          <div class="funnel-stage-row" onclick="askSuggestion('Why do leads drop at ${stage.stage}? How to improve?');openAI()">
            <div style="width:140px;font-size:10.5px;color:var(--txt2);text-align:right;padding-right:8px;flex-shrink:0">${stage.stage}</div>
            <div style="flex:1;position:relative;height:28px">
              <div class="funnel-fill" style="width:${stage.pct}%;background:${stage.color}">${stage.count}</div>
            </div>
            <div style="width:90px;font-size:10px;color:var(--red);text-align:right;flex-shrink:0">${i>0&&drop>0?`-${drop} (${Math.round(drop/PROJECT_DATA.funnel[i-1].count*100)}% drop)`:''}</div>
          </div>`}).join('')}
        <div style="font-size:10.5px;color:var(--txt2);margin-top:8px">Click any stage for AI improvement suggestions</div>
      </div>
      <div class="card">
        <div class="card-title">Drop-off Analysis</div>
        ${PROJECT_DATA.funnel.slice(1).map((stage,i)=>{const prev=PROJECT_DATA.funnel[i];const drop=prev.count-stage.count;const pct=Math.round(drop/prev.count*100);return`
          <div class="risk-row ${pct>50?'red':pct>30?'amber':'green'}" onclick="askSuggestion('Reduce ${pct}% drop between ${prev.stage} and ${stage.stage}?');openAI()">
            <div class="risk-dot"></div>
            <div style="flex:1"><div class="risk-text">${prev.stage} → ${stage.stage}</div><div class="risk-action-text">${drop} leads lost · ${pct}% drop</div></div>
            <span style="font-size:11px;font-weight:700;color:${pct>50?'var(--red)':pct>30?'var(--amber)':'var(--teal)'}">-${pct}%</span>
          </div>`}).join('')}
        <div class="divider"></div>
        <div class="ai-insight-card" onclick="askSuggestion('Biggest lever to improve overall conversion from 14.8%?');openAI()">
          <span class="ai-insight-icon">🎯</span><div><div class="ai-insight-label">AI Recommendation</div><div class="ai-insight-text">Biggest drop: Visit→Agreement (65% loss). Root cause: pricing. Offer flexible payment plans for Phase 2.</div></div>
        </div>
      </div>
    </div>`
  },

  // ========== SITE VISITS ==========
  sitevisits:{title:'Site Visit Scheduler',breadcrumb:'Skyline Heights · Prospect Visit Calendar',render:()=>`
    <div class="kpi-grid">
      ${kpi('Scheduled','6','Next 7 days','neutral',null)}
      ${kpi('Confirmed','1','Kiran M. — Apr 17','up',null)}
      ${kpi('Conv. Rate','68%','Visits → negotiation','up',null)}
      ${kpi('Avg/Week','12','Site visits','neutral',null)}
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Upcoming Visits <button class="tbl-action" onclick="showToast('Opening schedule form...','info')">+ Schedule Visit</button></div>
        <table class="tbl"><tr><th>Prospect</th><th>Unit</th><th>Date & Time</th><th>Agent</th><th>Status</th><th>Actions</th></tr>
        ${PROJECT_DATA.siteVisits.map(v=>`<tr onclick="askSuggestion('Talking points for site visit with ${v.prospect} interested in unit ${v.unit}');openAI()">
          <td><strong>${v.prospect}</strong><div style="font-size:9.5px;color:var(--txt3)">${v.phone}</div></td>
          <td>${v.unit}</td>
          <td><strong>${v.date}</strong><br><span style="font-size:10px;color:var(--txt2)">${v.time}</span></td>
          <td>${v.agent}</td><td>${statusBadge(v.status)}</td>
          <td style="display:flex;gap:3px">
            <button class="tbl-action" onclick="event.stopPropagation();askSuggestion('Personalized pitch for ${v.prospect} visiting unit ${v.unit}');openAI()">🧠</button>
            <button class="tbl-action success" onclick="event.stopPropagation();showToast('Confirmed: ${v.prospect}','success')">Confirm</button>
          </td>
        </tr>`).join('')}</table>
      </div>
      <div class="card">
        <div class="card-title">April 2026 Calendar</div>
        <div class="cal-grid">
          ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<div class="cal-day-hdr">${d}</div>`).join('')}
          ${Array.from({length:30},(_,i)=>{const day=i+1;const hasVisit=[16,17,18,19].includes(day);const isToday=day===15;return`<div class="cal-day ${isToday?'today':''} ${hasVisit?'has-event':''}" onclick="showToast('Apr ${day}${hasVisit?' — visit scheduled':''}','${hasVisit?'info':'info'}')">${day}</div>`}).join('')}
        </div>
        <div style="margin-top:8px;font-size:10.5px;color:var(--txt2)">🔵 Blue dot = visit scheduled</div>
      </div>
    </div>`
  },

  // ========== CHANNEL PARTNERS ==========
  channels:{title:'Channel Partners',breadcrumb:'Skyline Heights · Broker Portal & Commission Tracker',render:()=>`
    <div class="kpi-grid">
      ${kpi('Active Partners','5','Brokers & agencies','neutral',null)}
      ${kpi('Total Leads','111','Via partners','up',null)}
      ${kpi('Bookings','44','₹132 L commission earned','up',null)}
      ${kpi('Pending Payout','₹31 L','To 5 partners','neutral',null)}
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Partner Scorecards <button class="tbl-action" onclick="askSuggestion('Rank channel partners by performance and suggest incentive structure to boost bookings');openAI()">🧠 Rank</button></div>
        ${PROJECT_DATA.channels.map(cp=>`
          <div class="partner-card" onclick="askSuggestion('Strategy to increase bookings from ${cp.name}?');openAI()">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
              <div><div style="font-weight:700;font-size:12.5px">${cp.name}</div><div style="font-size:10.5px;color:var(--txt2)">${cp.agent}</div></div>
              <div>${statusBadge(cp.status)} <span style="font-size:11px;color:var(--amber)">${'★'.repeat(Math.round(cp.rating))} ${cp.rating}</span></div>
            </div>
            <div style="display:flex;gap:12px;font-size:11px">
              <span>Leads: <strong>${cp.leads}</strong></span>
              <span>Bookings: <strong>${cp.bookings}</strong></span>
              <span>Conv: <strong>${Math.round(cp.bookings/cp.leads*100)}%</strong></span>
              <span>💰 <strong style="color:var(--teal)">${cp.commission}</strong></span>
              <span>Pending: <strong style="color:var(--amber)">${cp.pending}</strong></span>
            </div>
          </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-title">Commission Ledger <button class="tbl-action" onclick="askSuggestion('Optimal commission structure to maximize Phase 2 bookings via channel partners');openAI()">🧠 Optimize</button></div>
        <table class="tbl"><tr><th>Partner</th><th>Earned</th><th>Pending</th><th>Action</th></tr>
        ${PROJECT_DATA.channels.map(cp=>`<tr>
          <td><strong>${cp.name}</strong></td>
          <td style="color:var(--teal);font-weight:600">${cp.commission}</td>
          <td style="color:var(--amber);font-weight:600">${cp.pending}</td>
          <td><button class="tbl-action success" onclick="showToast('Payment approved: ${cp.name}','success')">Pay</button></td>
        </tr>`).join('')}</table>
      </div>
    </div>`
  },

  // ========== MARKETING ==========
  marketing:{title:'Marketing Analytics',breadcrumb:'Skyline Heights · Campaign ROI & Lead Sources',render:()=>`
    <div class="kpi-grid">
      ${kpi('Total Spend','₹31.5 L','All campaigns','neutral',null)}
      ${kpi('Total Leads','246','All channels','up',null)}
      ${kpi('Avg CPL','₹12.8K','Cost per lead','neutral',null)}
      ${kpi('Best ROI','500%','WhatsApp Broadcast','up',null)}
    </div>
    <div class="card mb-18">
      <div class="card-title">Campaign Performance <button class="tbl-action" onclick="askSuggestion('Which campaigns should I scale up and which to cut? Optimize ₹31.5L budget');openAI()">🧠 Optimize</button></div>
      <table class="tbl"><tr><th>Campaign</th><th>Channel</th><th>Spend</th><th>Leads</th><th>Conv.</th><th>CPL</th><th>ROI</th><th>Status</th></tr>
      ${PROJECT_DATA.marketing.campaigns.map(c=>`<tr onclick="askSuggestion('Deep analysis of ${c.name}: ROI ${c.roi}%. How to improve?');openAI()">
        <td><strong>${c.name}</strong></td>
        <td><span class="badge badge-gray" style="font-size:9px">${c.channel}</span></td>
        <td>${c.spend}</td><td>${c.leads}</td><td>${c.conv}</td>
        <td style="color:var(--txt2)">${c.cpl}</td>
        <td style="font-weight:700;color:${c.roi>200?'var(--teal)':c.roi>100?'var(--amber)':'var(--red)'}">${c.roi}%</td>
        <td>${statusBadge(c.status==='Done'?'Resolved':c.status==='Active'?'OK':'Pending')}</td>
      </tr>`).join('')}</table>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Lead Source Mix</div>
        ${PROJECT_DATA.marketing.sources.map((s,i)=>progRow(s.src+' ('+s.leads+' leads)',s.pct,['#3b82f6','#f97316','#10b981','#06b6d4','#8b5cf6'][i])).join('')}
      </div>
      <div class="card">
        <div class="card-title">🧠 AI Marketing Insights</div>
        <div class="ai-insight-card" onclick="askSuggestion('Referral ROI is 210% — how to scale the referral program?');openAI()">
          <span class="ai-insight-icon">🎯</span><div><div class="ai-insight-label">Best Performer</div><div class="ai-insight-text">Referral ROI 210%, WhatsApp 500%. Shift ₹3L from Google Ads to these two channels → 40% more leads.</div></div>
        </div>
        <div class="ai-insight-card" onclick="askSuggestion('Instagram Stories ROI is only 75% — should I cut it?');openAI()">
          <span class="ai-insight-icon">⚠️</span><div><div class="ai-insight-label">Underperformer</div><div class="ai-insight-text">Instagram Stories ROI 75% — below benchmark. Pause or restructure creative. Reallocate ₹2L to Email Nurture (320% ROI).</div></div>
        </div>
      </div>
    </div>`
  },

  // ========== COMMS ==========
  comms:{title:'Communication Hub',breadcrumb:'Skyline Heights · Buyer Announcements & Messaging',render:()=>`
    <div class="kpi-grid">
      ${kpi('Messages Sent','4','This month','neutral',null)}
      ${kpi('Avg Open Rate','86%','WhatsApp best','up',null)}
      ${kpi('Buyers Reached','190','100% coverage','up',null)}
      ${kpi('Responses','34%','Payment reminders','neutral',null)}
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Message History</div>
        <table class="tbl"><tr><th>Type</th><th>Channel</th><th>Audience</th><th>Count</th><th>Sent</th><th>Open %</th></tr>
        ${PROJECT_DATA.comms.sent.map(m=>`<tr onclick="askSuggestion('Draft a follow-up to the ${m.type} sent on ${m.sent}');openAI()">
          <td><strong>${m.type}</strong></td>
          <td><span class="badge ${m.channel==='WhatsApp'?'badge-green':m.channel==='SMS'?'badge-amber':'badge-blue'}" style="font-size:9px">${m.channel}</span></td>
          <td>${m.audience}</td><td>${m.count}</td><td>${m.sent}</td>
          <td style="font-weight:700;color:var(--teal)">${m.open}</td>
        </tr>`).join('')}</table>
      </div>
      <div class="card">
        <div class="card-title">Send Announcement <button class="tbl-action" onclick="askSuggestion('What should I communicate to buyers this week about project status?');openAI()">🧠 Suggest</button></div>
        <div class="form-group"><div class="form-label">Type</div><select class="form-select"><option>Construction Update</option><option>Payment Reminder</option><option>Milestone Achievement</option><option>Compliance Update</option></select></div>
        <div class="form-group"><div class="form-label">Audience</div><select class="form-select"><option>All Buyers (190)</option><option>Tower A (72)</option><option>Tower B (64)</option><option>Tower C (54)</option><option>Pending Payment (42)</option></select></div>
        <div class="form-group"><div class="form-label">Channel</div><select class="form-select"><option>WhatsApp</option><option>SMS</option><option>Email</option><option>All Channels</option></select></div>
        <div class="form-group"><div class="form-label">Message</div><textarea class="form-textarea" placeholder="Type message or use AI to generate..."></textarea></div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost" onclick="askSuggestion('Draft a construction update message for all Tower A buyers about Floor 12 slab completion');openAI()">🧠 Generate</button>
          <button class="btn btn-accent" onclick="showToast('Message sent to audience ✓','success')">Send</button>
        </div>
      </div>
    </div>`
  },

  // ========== HANDOVER ==========
  handover:{title:'Handover Management',breadcrumb:'Skyline Heights · Possession & Snag Tracking',render:()=>`
    <div class="kpi-grid">
      ${kpi('Units for Handover','6','Aug–Sep 2026','neutral',null)}
      ${kpi('On Track','3','50% on schedule','neutral',null)}
      ${kpi('At Risk','2','C-201, C-301','down',null)}
      ${kpi('Open Snags','15','Across 6 units','down',null)}
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Handover Pipeline <button class="tbl-action" onclick="askSuggestion('Which handover units are at risk? Give action plan to get them back on track');openAI()">🧠 Review</button></div>
        <table class="tbl"><tr><th>Unit</th><th>Buyer</th><th>Date</th><th>Progress</th><th>Snags</th><th>Payment</th><th>Status</th></tr>
        ${PROJECT_DATA.handover.units.map(h=>`<tr onclick="askSuggestion('Actions needed for handover of ${h.unit} to ${h.buyer}?');openAI()">
          <td><strong>${h.unit}</strong></td><td>${h.buyer}</td><td>${h.date}</td>
          <td>${progRow('',h.progress,h.status==='On Track'?'#10b981':'#ef4444')}</td>
          <td style="color:${h.snags>2?'var(--red)':'var(--teal)'};font-weight:700">${h.snags}</td>
          <td style="font-size:10.5px">${h.payment}</td><td>${statusBadge(h.status==='On Track'?'OK':h.status==='At Risk'?'Pending':'High')}</td>
        </tr>`).join('')}</table>
      </div>
      <div class="card">
        <div class="card-title">Handover Checklist — Tower C</div>
        ${PROJECT_DATA.handover.checklist.map((item,i)=>{const done=i<7;return`
          <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="showToast('${item}: ${done?'Complete ✓':'Pending'}','${done?'success':'info'}')">
            <div style="width:16px;height:16px;border-radius:50%;background:${done?'var(--teal)':'var(--border)'};display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;flex-shrink:0">${done?'✓':i+1}</div>
            <div style="font-size:11.5px;${done?'color:var(--teal);text-decoration:line-through':'color:var(--txt)'}">${item}</div>
          </div>`}).join('')}
      </div>
    </div>`
  },

  // ========== SOCIETY ==========
  society:{title:'Society Portal',breadcrumb:'Skyline Heights · Resident Community Management',render:()=>`
    <div class="kpi-grid">
      ${kpi('Residents','42','Tower C partial occupancy','neutral',null)}
      ${kpi('Open Requests','2','Maintenance issues','down',null)}
      ${kpi('Amenities Active','4','Pool, Gym, Play Area','up',null)}
      ${kpi('Next Meeting','Apr 20','Society committee','neutral',null)}
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Maintenance Requests <button class="tbl-action" onclick="showToast('Opening request form...','info')">+ Raise</button></div>
        ${PROJECT_DATA.society.requests.map(r=>`
          <div class="society-req" onclick="askSuggestion('How to resolve: ${r.issue} for resident ${r.resident} at ${r.flat}?');openAI()">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
              <span style="font-weight:700;font-size:11.5px">${r.flat} · ${r.resident}</span>
              <div style="display:flex;gap:4px"><span class="badge badge-gray" style="font-size:9px">${r.type}</span>${statusBadge(r.status==='Open'?'Pending':r.status==='In Progress'?'Scheduled':'Resolved')}</div>
            </div>
            <div style="font-size:11.5px;color:var(--txt)">${r.issue}</div>
            <div style="font-size:10px;color:var(--txt3)">${r.date}</div>
          </div>`).join('')}
        <div class="divider"></div>
        <div class="section-title">Amenities</div>
        ${PROJECT_DATA.society.amenities.map(a=>`<div class="stat-row"><div class="stat-key">${a.name} · <span style="font-size:10px;color:var(--txt3)">${a.hrs}</span></div><div class="stat-val">${statusBadge(a.status==='Operational'?'OK':a.status==='Partial'?'Pending':'High')}</div></div>`).join('')}
      </div>
      <div class="card">
        <div class="card-title">Announcements <button class="tbl-action" onclick="showToast('Opening announcement form...','info')">+ Post</button></div>
        ${PROJECT_DATA.society.announcements.map(a=>`
          <div style="padding:9px;border:1px solid var(--border);border-radius:8px;margin-bottom:7px;cursor:pointer;transition:all .13s" onmouseenter="this.style.borderColor='var(--blue)'" onmouseleave="this.style.borderColor='var(--border)'">
            <div style="display:flex;justify-content:space-between;margin-bottom:3px">
              <div style="font-weight:700;font-size:12px">${a.title}</div>
              <div style="font-size:10px;color:var(--txt3)">${a.date}</div>
            </div>
            <div style="font-size:11.5px;color:var(--txt2)">${a.msg}</div>
          </div>`).join('')}
        <div class="divider"></div>
        <button class="btn btn-accent" style="width:100%" onclick="askSuggestion('Draft a society announcement about the upcoming residents meeting on Apr 20 and what agenda items to cover');openAI()">🧠 Draft Announcement</button>
      </div>
    </div>`
  },

  // ========== VENDORS ==========
  vendors:{title:'Vendor Directory',breadcrumb:'Skyline Heights · Contractor Performance & Contracts',render:()=>`
    <div class="kpi-grid">
      ${kpi('Active Vendors','5','All engaged','neutral',null)}
      ${kpi('Total Contracts','₹126 Cr','Combined value','neutral',null)}
      ${kpi('Paid to Date','₹71.6 Cr','56.8% of total','neutral',null)}
      ${kpi('Avg Rating','4.1/5','Building average','neutral',null)}
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Vendor Scorecards <button class="tbl-action" onclick="askSuggestion('Rank vendors by performance and recommend who gets priority for future phases');openAI()">🧠 Rank</button></div>
        ${PROJECT_DATA.vendors.map(v=>`
          <div style="padding:10px 12px;border:1px solid var(--border);border-radius:9px;margin-bottom:7px;cursor:pointer;transition:all .13s" onmouseenter="this.style.borderColor='var(--accent)'" onmouseleave="this.style.borderColor='var(--border)'" onclick="askSuggestion('Performance review for ${v.name}: rating ${v.rating}/5, SLA ${v.sla}. Recommendations?');openAI()">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
              <div><div style="font-weight:700;font-size:12.5px">${v.name}</div><div style="font-size:10.5px;color:var(--txt2)">${v.type} · ${v.contact} · ${v.email}</div></div>
              <div style="font-size:11px;color:var(--amber)">${'★'.repeat(Math.round(v.rating))}${'☆'.repeat(5-Math.round(v.rating))} ${v.rating}</div>
            </div>
            <div style="display:flex;gap:10px;font-size:10.5px">
              <span>Contract: <strong>${v.value}</strong></span><span>Paid: <strong>${v.paid}</strong></span>
              <span>SLA: <strong style="color:${v.sla.includes('100')||v.sla.includes('97')?'var(--teal)':'var(--amber)'}">${v.sla}</strong></span>
              ${v.incidents>0?`<span style="color:var(--red)">⚠️ ${v.incidents} incident(s)</span>`:''}
            </div>
          </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-title">Contract Summary</div>
        <table class="tbl"><tr><th>Vendor</th><th>Value</th><th>Paid</th><th>Utilization</th></tr>
        ${PROJECT_DATA.vendors.map(v=>{const pct=Math.round(parseInt(v.paid.replace(/[₹\sCr]/g,''))/parseInt(v.value.replace(/[₹\sCr]/g,''))*100);return`<tr><td><strong>${v.name}</strong></td><td>${v.value}</td><td>${v.paid}</td><td>${progRow('',pct,'#3b82f6')}</td></tr>`}).join('')}</table>
      </div>
    </div>`
  },

  // ========== DOCUMENTS ==========
  documents:{title:'Document Vault',breadcrumb:'Skyline Heights · RERA Filings, NOCs & Legal Docs',render:()=>`
    <div class="kpi-grid">
      ${kpi('Total Docs','10','All categories','neutral',null)}
      ${kpi('Valid','7','Active & current','up',null)}
      ${kpi('Pending','2','Fire NOC, OC','down',null)}
      ${kpi('Expiring Soon','1','Dec 2027 — RERA','neutral',null)}
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">
          All Documents
          <div style="display:flex;gap:6px">
            <input class="search-input" placeholder="Search docs..." style="width:140px" oninput="this.parentElement.parentElement.nextElementSibling.querySelectorAll('.doc-item').forEach(d=>{d.style.display=d.textContent.toLowerCase().includes(this.value.toLowerCase())?'flex':'none'})">
            <button class="tbl-action" onclick="showToast('Opening upload form...','info')">+ Upload</button>
          </div>
        </div>
        <div>
          ${PROJECT_DATA.documents.map(d=>`
            <div class="doc-item" onclick="showToast('Opening ${d.name}...','info')">
              <div class="doc-icon-box" style="background:${d.status==='Pending'?'#fef3c7':'#dbeafe'}">${d.icon}</div>
              <div style="flex:1"><div style="font-weight:700;font-size:12px">${d.name}</div>
              <div style="font-size:10.5px;color:var(--txt2)">${d.cat} · ${d.size} · Exp: ${d.expiry}</div></div>
              <div style="display:flex;align-items:center;gap:5px">
                ${statusBadge(d.status==='Valid'||d.status==='Active'||d.status==='Filed'?'OK':'Pending')}
                <button class="tbl-action" onclick="event.stopPropagation();showToast('Downloading...','success')">📥</button>
                <button class="tbl-action" onclick="event.stopPropagation();askSuggestion('Review ${d.name} — any issues, expiry risks, or actions needed?');openAI()">🧠</button>
              </div>
            </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-title">Expiry Alerts & Actions</div>
        <div class="risk-row amber"><div class="risk-dot"></div><div class="risk-text">Fire NOC — pending clearance May 2026. Follow up urgently.</div></div>
        <div class="risk-row blue"><div class="risk-dot"></div><div class="risk-text">Occupancy Certificate — in progress, expected Sep 2026.</div></div>
        <div class="risk-row green"><div class="risk-dot"></div><div class="risk-text">RERA Registration valid until Dec 2027.</div></div>
        <div class="divider"></div>
        <button class="btn btn-accent" style="width:100%" onclick="askSuggestion('Review all documents and create a compliance calendar — what expires when, what actions I need to take in next 6 months');openAI()">🧠 AI Compliance Calendar</button>
        <div class="divider"></div>
        <div class="section-title">By Category</div>
        ${[['Compliance','4'],['Technical','2'],['Legal','2'],['Finance','2']].map(([c,n])=>`<div class="stat-row"><div class="stat-key">${c}</div><div class="stat-val">${n} docs</div></div>`).join('')}
      </div>
    </div>`
  },

  // ========== LEGAL ==========
  legal:{title:'Legal & RERA',breadcrumb:'Skyline Heights · Complaints, Notices & Compliance',render:()=>`
    <div class="kpi-grid">
      ${kpi('RERA Complaints','3','1 pending, 1 mediation','down',null)}
      ${kpi('Legal Notices','2','1 disputed','down',null)}
      ${kpi('Compliance Score','100%','All filings current','up',null)}
      ${kpi('Next Hearing','Apr 22','Complaint R2','neutral',null)}
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">RERA Complaints <button class="tbl-action" onclick="askSuggestion('Help me prepare for all upcoming RERA hearings and suggest resolution strategy');openAI()">🧠 Prepare</button></div>
        ${PROJECT_DATA.legal.complaints.map(r=>`
          <div class="risk-row ${r.status==='Pending'?'amber':r.status==='In Mediation'?'blue':'green'}" onclick="askSuggestion('Defense strategy for RERA complaint: ${r.issue} from ${r.complainant} (${r.unit})?');openAI()">
            <div class="risk-dot"></div>
            <div style="flex:1">
              <div class="risk-text"><strong>${r.id}</strong> · ${r.complainant} · ${r.unit}</div>
              <div class="risk-action-text">${r.issue} · Filed: ${r.filed} · Hearing: ${r.hearing}</div>
            </div>
            ${statusBadge(r.status==='Pending'?'Pending':r.status==='In Mediation'?'Scheduled':'Resolved')}
          </div>`).join('')}
        <div class="divider"></div>
        <div class="card-title" style="font-size:12px;margin-bottom:8px">Legal Notices</div>
        ${PROJECT_DATA.legal.notices.map(n=>`
          <div class="risk-row ${n.status==='Disputed'?'red':'green'}" onclick="askSuggestion('How to handle legal notice ${n.id} from ${n.party}: ${n.type}, amount ${n.amount}?');openAI()">
            <div class="risk-dot"></div>
            <div style="flex:1"><div class="risk-text"><strong>${n.id}</strong> · ${n.party} · ${n.type}</div>
            <div class="risk-action-text">₹${n.amount} · Issued: ${n.issued}</div></div>
            ${statusBadge(n.status==='Disputed'?'High':'Resolved')}
          </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-title">Compliance Status</div>
        ${PROJECT_DATA.finance.compliance.map(c=>`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:7px;margin-bottom:5px;background:${c.status==='green'?'#f0fdf4':c.status==='amber'?'#fffbf0':'#eff6ff'};border:1px solid ${c.status==='green'?'#bbf7d0':c.status==='amber'?'#fde68a':'#bfdbfe'};cursor:pointer" onclick="askSuggestion('Status and implications of ${c.label}?');openAI()">
            <div><div style="font-size:12px;font-weight:600">${c.status==='green'?'✓':c.status==='amber'?'⏳':'🔄'} ${c.label}</div>
            <div style="font-size:10px;color:var(--txt3)">Expires: ${c.expiry}</div></div>
            ${statusBadge(c.status==='green'?'OK':c.status==='amber'?'Pending':'Scheduled')}
          </div>`).join('')}
        <div class="divider"></div>
        <button class="btn btn-accent" style="width:100%" onclick="askSuggestion('What regulatory compliance items need urgent attention this month? Any risks of non-compliance?');openAI()">🧠 AI Compliance Review</button>
      </div>
    </div>`
  }

};

// ===================================================
// SPECIAL HANDLERS
// ===================================================
function openTowerDetail(id) {
  const t = PROJECT_DATA.construction.towers.find(x => x.id === id);
  if (!t) return;
  document.getElementById('row-modal-title').textContent = `Tower Detail: ${t.name}`;
  document.getElementById('row-modal-body').innerHTML = `
    <div class="info-grid mb-14">
      <div class="info-item"><div class="info-label">Progress</div><div class="info-value" style="color:${t.color};font-family:'Syne',sans-serif;font-size:28px;font-weight:700">${t.pct}%</div></div>
      <div class="info-item"><div class="info-label">Status</div><div class="info-value">${statusBadge(t.status)}</div></div>
      ${t.floors ? `<div class="info-item"><div class="info-label">Floors Complete</div><div class="info-value">${t.floorsComplete} / ${t.floors}</div></div>` : ''}
      <div class="info-item"><div class="info-label">Workers On-Site</div><div class="info-value">${t.workers}</div></div>
      <div class="info-item"><div class="info-label">Last Updated</div><div class="info-value">${t.lastUpdate}</div></div>
    </div>
    ${t.floors ? progRow('Floors Complete', Math.round(t.floorsComplete/t.floors*100), t.color) : ''}
    ${progRow('Overall Progress', t.pct, t.color)}`;
  document.getElementById('row-modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="closeModal('row-modal')">Close</button><button class="btn btn-accent" onclick="closeModal('row-modal');askSuggestion('Give me a detailed status report for ${t.name} and any risks or opportunities');openAI()">🧠 AI Analysis</button>`;
  openModal('row-modal');
}

function openSensorDetail(id) {
  const s = PROJECT_DATA.construction.sensors.find(x => x.id === id);
  if (!s) return;
  document.getElementById('row-modal-title').textContent = `Sensor: ${s.name}`;
  document.getElementById('row-modal-body').innerHTML = `
    <div class="info-grid mb-14">
      <div class="info-item"><div class="info-label">Current Reading</div><div class="info-value" style="font-family:'Syne',sans-serif;font-size:28px;color:${s.status==='OK'?'var(--teal)':'var(--amber)'}">${s.val}${s.unit}</div></div>
      <div class="info-item"><div class="info-label">Status</div><div class="info-value">${statusBadge(s.status)}</div></div>
      <div class="info-item"><div class="info-label">Location</div><div class="info-value">${s.loc}</div></div>
    </div>
    <div class="section-title" style="font-size:12px;margin-bottom:8px">Historical Readings (12 intervals)</div>
    <div style="height:60px;display:flex;align-items:flex-end;gap:4px;margin-bottom:8px">
      ${sensorMiniChart(s.history, s.status==='OK'?'#10b981':'#f59e0b')}
    </div>
    <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--txt3)">
      <span>Min: ${Math.min(...s.history)}${s.unit}</span>
      <span>Avg: ${(s.history.reduce((a,b)=>a+b,0)/s.history.length).toFixed(1)}${s.unit}</span>
      <span>Max: ${Math.max(...s.history)}${s.unit}</span>
    </div>
    ${s.status === 'Watch' ? `<div class="alert-banner amber" style="margin-top:12px"><span class="alert-banner-icon">⚠️</span><div class="alert-banner-text">This sensor is in Watch status. Monitor closely and flag if readings exceed threshold.</div></div>` : ''}`;
  document.getElementById('row-modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="closeModal('row-modal')">Close</button><button class="btn btn-accent" onclick="closeModal('row-modal');askSuggestion('Analyze sensor ${s.name} at ${s.loc} reading ${s.val}${s.unit} — is this normal? What should we watch out for?');openAI()">🧠 AI Analysis</button>`;
  openModal('row-modal');
}

function openBudgetDetail(label, budgeted, spent, pct, color) {
  document.getElementById('row-modal-title').textContent = `Budget: ${label}`;
  document.getElementById('row-modal-body').innerHTML = `
    <div class="info-grid mb-14">
      <div class="info-item"><div class="info-label">Budgeted</div><div class="info-value" style="font-family:'Syne',sans-serif;font-size:22px">${budgeted}</div></div>
      <div class="info-item"><div class="info-label">Spent</div><div class="info-value" style="font-family:'Syne',sans-serif;font-size:22px;color:${color}">${spent}</div></div>
    </div>
    ${progRow('Utilization', pct, pct>=80?'#ef4444':color)}
    ${pct >= 80 ? `<div class="alert-banner red" style="margin-top:12px"><span class="alert-banner-icon">⚠️</span><div class="alert-banner-text">Budget utilization at ${pct}% — approaching limit. Review required.</div></div>` : ''}`;
  document.getElementById('row-modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="closeModal('row-modal')">Close</button><button class="btn btn-accent" onclick="closeModal('row-modal');askSuggestion('Analyze budget utilization for ${label}: ${pct}% spent. What are the risks and how can we optimize spending?');openAI()">🧠 Ask AI</button>`;
  openModal('row-modal');
}

function filterTower(id) {
  showToast(id === 'all' ? 'Showing all towers' : `Filtered to ${id}`, 'info');
}
function filterLeads(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('.lead-card').forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}
function filterByStage(stage) {
  document.querySelectorAll('.lead-card').forEach(card => {
    card.style.display = card.textContent.includes(stage) ? '' : 'none';
  });
  showToast(`Filtered to ${stage} leads`, 'info');
}
function filterIssues(status) {
  if (status === 'all') { document.querySelectorAll('.issue-card').forEach(c => c.style.display = ''); return; }
  document.querySelectorAll('.issue-card').forEach(card => {
    card.style.display = card.textContent.includes(status) ? '' : 'none';
  });
}
function filterTasks(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('#task-table tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}
function bulkEscalate() {
  showToast('All High priority issues escalated to management', 'warning');
}
function refreshAIInsights() {
  askSuggestion('Give me 3 fresh AI insights about current project status: one sales opportunity, one risk alert, and one operational insight');
  openAI();
}
function generateReport(type) {
  askSuggestion(`Generate a comprehensive ${type} report for Skyline Heights project with current data, key metrics, risks and recommendations`);
  openAI();
}
function generateAIReport() {
  const type = document.getElementById('report-type').value;
  const period = document.getElementById('report-period').value;
  const preview = document.getElementById('report-preview');
  preview.innerHTML = `<div class="ai-insight-card"><span class="ai-insight-icon">⏳</span><div><div class="ai-insight-label">Generating</div><div class="ai-insight-text">Generating ${type} for ${period}...</div></div></div>`;
  askSuggestion(`Generate a detailed ${type} report for ${period} for Skyline Heights project`);
  openAI();
  setTimeout(() => { preview.innerHTML = ''; }, 1000);
}

// ===================================================
// AI PANEL
// ===================================================
function setContext(ctx, el) {
  aiContext = ctx;
  document.querySelectorAll('.ai-chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  const labels = { all: 'All Modules', construction: 'Construction', sales: 'Sales', cx: 'CX', finance: 'Finance' };
  document.getElementById('active-context-label').textContent = labels[ctx] || ctx;
}
function openAI() {
  document.getElementById('ai-panel').classList.add('open');
  document.getElementById('ai-overlay').classList.add('open');
  closeNotif();
  setTimeout(() => document.getElementById('ai-input').focus(), 300);
}
function closeAI() {
  document.getElementById('ai-panel').classList.remove('open');
  document.getElementById('ai-overlay').classList.remove('open');
}

function formatAIMsg(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,'<em>$1</em>')
    .replace(/^[-•] (.+)$/gm,'<div style="display:flex;gap:6px;margin:2px 0;align-items:flex-start"><span style="color:var(--accent);font-size:8px;margin-top:5px;flex-shrink:0">●</span><span>$1</span></div>')
    .replace(/^(\d+)\. (.+)$/gm,'<div style="display:flex;gap:6px;margin:2px 0;align-items:flex-start"><span style="color:var(--accent);font-weight:700;font-size:10px;min-width:12px;flex-shrink:0">$1.</span><span>$2</span></div>')
    .replace(/\n\n/g,'<div style="height:4px"></div>')
    .replace(/\n/g,'<br>');
}
function addMsg(content, type) {
  const el = document.createElement('div');
  el.className = `ai-msg ${type}`;
  const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const isSystem = type === 'system';
  const avatar = isSystem ? '🧠' : (ACTIVE_PROJECT?.name?.charAt(0) || 'A');
  const label = isSystem ? 'Project IQ' : 'You';
  const bubble = isSystem ? formatAIMsg(content) : escHtml(content);
  el.innerHTML = `
    <div class="ai-msg-label">${label}</div>
    <div class="ai-msg-row">
      <div class="ai-avatar">${avatar}</div>
      <div class="ai-msg-bubble">${bubble}</div>
    </div>
    <div class="ai-msg-time">${now}</div>`;
  document.getElementById('ai-msgs').appendChild(el);
  scrollAI();
}
function addTyping() {
  const el = document.createElement('div');
  el.className = 'ai-msg system'; el.id = 'ai-typing';
  el.innerHTML = `
    <div class="ai-msg-label">Project IQ</div>
    <div class="ai-msg-row">
      <div class="ai-avatar">🧠</div>
      <div class="ai-typing"><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div></div>
    </div>`;
  document.getElementById('ai-msgs').appendChild(el);
  scrollAI();
}
function removeTyping() { const el = document.getElementById('ai-typing'); if (el) el.remove(); }
function scrollAI() { const m = document.getElementById('ai-msgs'); m.scrollTop = m.scrollHeight; }
function escHtml(t) { return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function hideSugs() { if (!suggestionsHidden) { document.getElementById('ai-sugs').style.display='none'; suggestionsHidden=true; } }
function autoResize(el) { el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,80)+'px'; }

function buildSystemPrompt() {
  const ctx = aiContext || 'all';
  const c = PROJECT_DATA.construction;
  const s = PROJECT_DATA.sales;
  const f = PROJECT_DATA.finance;

  // Build only what's relevant to the active context
  const sections = {
    construction: c ? `Construction: ${c.towers?.map(t=>`${t.name} ${t.pct}% (${t.floors} floors, ${t.workers} workers, status: ${t.status})`).join(', ')}. Delays: ${c.delays?.map(d=>`${d.task} — ${d.days} days delayed, risk: ${d.risk}, cause: ${d.cause}`).join('; ')}. Tasks: ${c.tasksComplete}/${c.tasksTotal} done, ${c.delayedTasks} delayed. Labour on-site: ${c.labour}.` : '',
    sales: s ? `Sales: ${s.totalLeads} leads, ${s.bookings} booked, ${s.pctAchieved}% of target. Hot leads: ${s.leads?.filter(l=>l.stage==='Hot').map(l=>`${l.name} interested in ${l.unit} (${l.val}, ${l.prob}% probability, last contact: ${l.last})`).join(', ')}. Monthly: ${s.monthly?.map(m=>`${m.m}: ${m.v} bookings`).join(', ')}.` : '',
    finance: f ? `Finance: Budget ${f.totalBudget}, spent ${f.spent} (${f.spentPct}%), payments due ${f.paymentsDue}. Pending payments: ${f.payments?.filter(p=>p.status==='Pending').map(p=>`${p.vendor} ${p.amount} due ${p.due}`).join(', ')}.` : '',
    cx: PROJECT_DATA.cx ? `CX: ${PROJECT_DATA.cx.openIssues} open, ${PROJECT_DATA.cx.escalated} escalated, CSAT ${PROJECT_DATA.cx.csat}. SLA compliance: ${PROJECT_DATA.cx.slaCompliance}%. Issues: ${PROJECT_DATA.cx.issues?.map(i=>`${i.id} ${i.customer} (${i.unit}) — ${i.issue}, ${i.priority} priority, ${i.status}, ${i.age} old, assigned to ${i.assignedTo}`).join('; ')}.` : '',
  };

  const relevantData = ctx === 'construction' ? sections.construction
    : ctx === 'sales' ? sections.sales
    : ctx === 'finance' ? sections.finance
    : ctx === 'cx' ? sections.cx
    : Object.values(sections).filter(Boolean).join(' | ');

  return `You are Project IQ AI for TekThink Developers. Project: ${PROJECT_DATA.name}, ${PROJECT_DATA.location}. Today: ${new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}.
DATA: ${relevantData}
Rules: Be concise, specific, actionable. Max 200 words. Use ⚠️ risk, ✅ good, 💡 insight, 🎯 action. Numbers and names only from data.`;
}

async function callAPI(msg) {
  conversationHistory.push({ role: 'user', content: msg });
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 500, system: buildSystemPrompt(), messages: conversationHistory })
  });
  if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message || 'API error'); }
  const data = await res.json();
  const reply = data.content?.[0]?.text || 'Unable to generate response.';
  conversationHistory.push({ role: 'assistant', content: reply });
  return reply;
}

async function sendAI() {
  if (isAILoading) return;
  const input = document.getElementById('ai-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = ''; input.style.height = 'auto';
  hideSugs(); isAILoading = true;
  document.getElementById('ai-send-btn').disabled = true;
  addMsg(msg, 'user'); addTyping();
  try {
    const reply = await callAPI(msg);
    removeTyping(); addMsg(reply, 'system');
  } catch (err) {
    removeTyping(); addMsg(`⚠️ Error: ${err.message}. Please try again.`, 'system');
  } finally {
    isAILoading = false;
    document.getElementById('ai-send-btn').disabled = false;
    input.focus();
  }
}

async function askSuggestion(q) {
  hideSugs(); isAILoading = true;
  document.getElementById('ai-send-btn').disabled = true;
  addMsg(q, 'user'); addTyping();
  try {
    conversationHistory.push({ role: 'user', content: q });
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 500, system: buildSystemPrompt(), messages: conversationHistory })
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || 'Unable to generate response.';
    conversationHistory.push({ role: 'assistant', content: reply });
    removeTyping(); addMsg(reply, 'system');
  } catch (err) {
    removeTyping(); addMsg('⚠️ Error connecting to AI. Please try again.', 'system');
  } finally {
    isAILoading = false;
    document.getElementById('ai-send-btn').disabled = false;
  }
}

// ===================================================
// FLAT / UNIT DATA GENERATION
// ===================================================
const FLAT_CONFIGS = {
  A: { floors: 18, unitsPerFloor: 4, prefix: 'A', color: 'ta', label: 'Tower A', phase: 'Phase 1', priceRange: ['₹72L','₹94L'], config: ['2BHK','2BHK','3BHK','3BHK'] },
  B: { floors: 16, unitsPerFloor: 4, prefix: 'B', color: 'tb', label: 'Tower B', phase: 'Phase 2', priceRange: ['₹58L','₹78L'], config: ['2BHK','2BHK','2BHK','3BHK'] },
  C: { floors: 15, unitsPerFloor: 4, prefix: 'C', color: 'tc', label: 'Tower C', phase: 'Phase 1', priceRange: ['₹48L','₹65L'], config: ['1BHK','2BHK','2BHK','3BHK'] }
};

// Named buyers for booked flats
const BUYER_NAMES = [
  'Ramesh Kumar','Priya Sharma','Vikram Mehta','Kavitha Nair','Suresh Reddy','Ananya Rao',
  'Deepa Varma','Hari Krishna','Meena Lakshmanan','Ravi Teja','Sunita Murthy','Anil Patel',
  'Rekha Iyer','Sanjay Gupta','Lalitha Rao','Venkat Rao','Padma Devi','Rajan Pillai',
  'Usha Rani','Manohar Das','Chandra Mohan','Savitha Kumar','Prakash Nair','Geetha Raj',
  'Arjun Singh','Pooja Menon','Naresh Babu','Swathi Reddy','Kiran Kumar','Bhavana Sharma',
  'Mohan Rao','Sundar Rajan','Kamala Devi','Rajesh Verma','Nirmala Shetty','Ashok Kumar'
];

function generateFlatData() {
  const flats = {};
  let buyerIdx = 0;

  Object.entries(FLAT_CONFIGS).forEach(([towerKey, cfg]) => {
    flats[towerKey] = {};
    for (let floor = 1; floor <= cfg.floors; floor++) {
      flats[towerKey][floor] = [];
      for (let unit = 1; unit <= cfg.unitsPerFloor; unit++) {
        const flatNo = `${cfg.prefix}-${floor}${String(unit).padStart(2,'0')}`;
        const unitConfig = cfg.config[unit - 1];
        const basePrice = towerKey === 'A' ? (unit <= 2 ? 72 : 82) : towerKey === 'B' ? (unit <= 3 ? 58 : 70) : (unit === 1 ? 48 : unit <= 3 ? 55 : 62);
        const priceAdj = Math.round(basePrice + (floor - 1) * 0.4);
        const price = `₹${priceAdj}L`;
        const area = unitConfig === '1BHK' ? '680 sqft' : unitConfig === '2BHK' ? '1,050 sqft' : '1,480 sqft';

        // Determine status based on realistic distribution
        let status, buyer = null, leadName = null;

        // Tower C is mostly done (91%), Tower A ~78%, Tower B ~45%
        const seed = (floor * 7 + unit * 13 + (towerKey.charCodeAt(0) * 3)) % 100;

        if (towerKey === 'C') {
          if (seed < 55) { status = 'sold'; buyer = BUYER_NAMES[buyerIdx++ % BUYER_NAMES.length]; }
          else if (seed < 80) { status = 'booked'; buyer = BUYER_NAMES[buyerIdx++ % BUYER_NAMES.length]; }
          else if (seed < 88) { status = 'reserved'; }
          else if (seed < 93) { status = 'hot-lead'; leadName = BUYER_NAMES[buyerIdx++ % BUYER_NAMES.length]; }
          else { status = 'available'; }
        } else if (towerKey === 'A') {
          if (seed < 35) { status = 'sold'; buyer = BUYER_NAMES[buyerIdx++ % BUYER_NAMES.length]; }
          else if (seed < 65) { status = 'booked'; buyer = BUYER_NAMES[buyerIdx++ % BUYER_NAMES.length]; }
          else if (seed < 75) { status = 'reserved'; }
          else if (seed < 82) { status = 'hot-lead'; leadName = BUYER_NAMES[buyerIdx++ % BUYER_NAMES.length]; }
          else if (seed < 90) { status = 'under-construction'; }
          else { status = 'available'; }
        } else { // Tower B
          if (seed < 18) { status = 'sold'; buyer = BUYER_NAMES[buyerIdx++ % BUYER_NAMES.length]; }
          else if (seed < 40) { status = 'booked'; buyer = BUYER_NAMES[buyerIdx++ % BUYER_NAMES.length]; }
          else if (seed < 50) { status = 'reserved'; }
          else if (seed < 58) { status = 'hot-lead'; leadName = BUYER_NAMES[buyerIdx++ % BUYER_NAMES.length]; }
          else if (seed < 82) { status = 'under-construction'; }
          else { status = 'available'; }
        }

        // Override: specific known flats
        if (flatNo === 'A-1204') { status = 'booked'; buyer = 'Ramesh Kumar'; }
        if (flatNo === 'A-0802') { status = 'hot-lead'; leadName = 'Kavitha N.'; }
        if (flatNo === 'B-0802') { status = 'hot-lead'; leadName = 'Priya S.'; }
        if (flatNo === 'B-1104') { status = 'reserved'; }
        if (flatNo === 'C-0304') { status = 'reserved'; }
        if (flatNo === 'A-0602') { status = 'booked'; buyer = 'Ananya R.'; }

        flats[towerKey][floor].push({ flatNo, status, buyer, leadName, price, unitConfig, area, floor, tower: cfg.label, towerKey });
      }
    }
  });
  return flats;
}

const FLAT_DATA = generateFlatData();
let currentFlat = null;
let activeFlatFilter = 'all';

// ===================================================
// TOWER MAP RENDER
// ===================================================
function renderTowerMap(filter) {
  activeFlatFilter = filter || 'all';
  const container = document.getElementById('tower-map-container');
  if (!container) return;

  let html = '';
  Object.entries(FLAT_CONFIGS).forEach(([towerKey, cfg]) => {
    html += `
      <div class="tower-block" id="tower-block-${towerKey}">
        <div class="tower-header ${cfg.color}">${cfg.label}<br><span style="font-size:9px;opacity:0.7">${cfg.phase}</span></div>
        <div class="tower-floors">`;

    for (let floor = 1; floor <= cfg.floors; floor++) {
      html += `<div class="tower-floor">`;
      html += `<div class="floor-label">F${floor}</div>`;
      const units = FLAT_DATA[towerKey][floor];
      units.forEach(u => {
        const dimmed = filter && filter !== 'all' && u.status !== filter;
        html += `<div class="flat-cell ${u.status}" 
          id="flat-${u.flatNo.replace('-','')}"
          style="${dimmed ? 'opacity:0.15;transform:scale(0.92)' : ''}"
          onmouseenter="showFlatTooltip(event,'${u.flatNo}','${u.status}','${u.buyer||u.leadName||''}','${u.price}','${u.unitConfig}')"
          onmouseleave="hideFlatTooltip()"
          onclick="selectFlat('${towerKey}',${floor},${units.indexOf(u)})"
        >${u.flatNo.split('-')[1]}</div>`;
      });
      html += `</div>`;
    }

    html += `</div>`;

    // Tower stats
    const allUnits = Object.values(FLAT_DATA[towerKey]).flat();
    const booked = allUnits.filter(u => u.status === 'booked' || u.status === 'sold').length;
    const total = allUnits.length;
    html += `
        <div class="tower-stats-row">
          <div class="tower-stat-chip" style="background:#dcfce7;color:#166534">✓ ${booked} booked</div>
          <div class="tower-stat-chip" style="background:#dbeafe;color:#1e40af">${allUnits.filter(u=>u.status==='available').length} avail</div>
          <div class="tower-stat-chip">${total} total</div>
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

// ===================================================
// FLAT INTERACTIONS
// ===================================================
function showFlatTooltip(event, flatNo, status, buyer, price, config) {
  const t = document.getElementById('flat-tooltip');
  if (!t) return;
  const statusLabels = { booked:'Booked', available:'Available', reserved:'Reserved', sold:'Registered/Sold', 'hot-lead':'Hot Lead', 'under-construction':'Under Construction' };
  const statusColors = { booked:'#166534', available:'#1e40af', reserved:'#92400e', sold:'#5b21b6', 'hot-lead':'#c2410c', 'under-construction':'#6b7280' };
  t.style.display = 'block';
  t.style.left = (event.clientX + 12) + 'px';
  t.style.top = (event.clientY - 10) + 'px';
  t.innerHTML = `<strong style="font-family:'Syne',sans-serif">${flatNo}</strong> · ${config}<br>
    <span style="color:${statusColors[status]||'#fff'}">${statusLabels[status]||status}</span><br>
    ${buyer ? `👤 ${buyer}<br>` : ''}
    <span style="color:rgba(255,255,255,0.6)">${price}</span>`;
}
function hideFlatTooltip() {
  const t = document.getElementById('flat-tooltip');
  if (t) t.style.display = 'none';
}

function selectFlat(towerKey, floor, unitIdx) {
  hideFlatTooltip();
  currentFlat = FLAT_DATA[towerKey][floor][unitIdx];
  if (!currentFlat) return;

  const panel = document.getElementById('flat-detail-panel');
  const statusLabels = { booked:'Booked ✓', available:'Available', reserved:'Reserved', sold:'Sold/Registered', 'hot-lead':'Hot Lead 🔥', 'under-construction':'Under Construction' };
  const statusColors = { booked:'#dcfce7', available:'#dbeafe', reserved:'#fef3c7', sold:'#ede9fe', 'hot-lead':'#ffedd5', 'under-construction':'#f3f4f6' };
  const statusText = { booked:'#166534', available:'#1e40af', reserved:'#92400e', sold:'#5b21b6', 'hot-lead':'#c2410c', 'under-construction':'#6b7280' };

  document.getElementById('fdp-name').textContent = currentFlat.flatNo + ' — ' + currentFlat.tower;
  document.getElementById('fdp-meta').textContent = `${currentFlat.unitConfig} · ${currentFlat.area} · ${currentFlat.price}` + (currentFlat.buyer ? ` · ${currentFlat.buyer}` : currentFlat.leadName ? ` · Lead: ${currentFlat.leadName}` : '');
  document.getElementById('fdp-badge').innerHTML = `<span class="flat-detail-badge" style="background:${statusColors[currentFlat.status]};color:${statusText[currentFlat.status]}">${statusLabels[currentFlat.status]||currentFlat.status}</span>`;
  panel.classList.add('show');
}

function closeFlatPanel() {
  document.getElementById('flat-detail-panel').classList.remove('show');
  currentFlat = null;
}

function openFlatModal(flat) {
  if (!flat) return;
  closeFlatPanel();
  const statusLabels = { booked:'Booked', available:'Available', reserved:'Reserved', sold:'Registered/Sold', 'hot-lead':'Hot Lead', 'under-construction':'Under Construction' };
  const statusColors = { booked:'green', available:'blue', reserved:'amber', sold:'purple', 'hot-lead':'amber', 'under-construction':'gray' };

  document.getElementById('row-modal-title').textContent = `Unit: ${flat.flatNo}`;
  document.getElementById('row-modal-body').innerHTML = `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border)">
      <div style="width:48px;height:48px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--purple));display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:#fff;flex-shrink:0">${flat.flatNo}</div>
      <div>
        <div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700">${flat.flatNo}</div>
        <div style="font-size:12px;color:var(--txt2)">${flat.tower} · Floor ${flat.floor} · ${flat.unitConfig}</div>
      </div>
      <div style="margin-left:auto">${statusBadge(statusColors[flat.status]||'gray')} <span style="font-size:12px;font-weight:500">${statusLabels[flat.status]||flat.status}</span></div>
    </div>
    <div class="info-grid mb-14">
      <div class="info-item"><div class="info-label">Unit No.</div><div class="info-value">${flat.flatNo}</div></div>
      <div class="info-item"><div class="info-label">Tower</div><div class="info-value">${flat.tower}</div></div>
      <div class="info-item"><div class="info-label">Floor</div><div class="info-value">${flat.floor}${flat.floor===1?'st':flat.floor===2?'nd':flat.floor===3?'rd':'th'}</div></div>
      <div class="info-item"><div class="info-label">Configuration</div><div class="info-value">${flat.unitConfig}</div></div>
      <div class="info-item"><div class="info-label">Carpet Area</div><div class="info-value">${flat.area}</div></div>
      <div class="info-item"><div class="info-label">Price</div><div class="info-value" style="color:var(--teal);font-family:'Syne',sans-serif;font-size:16px">${flat.price}</div></div>
    </div>
    ${flat.buyer ? `<div class="risk-row green"><div class="risk-dot"></div><div class="risk-text">Buyer: <strong>${flat.buyer}</strong> · Sale registered</div></div>` : ''}
    ${flat.leadName ? `<div class="risk-row amber"><div class="risk-dot"></div><div class="risk-text">Hot Lead: <strong>${flat.leadName}</strong> — Follow up required</div></div>` : ''}
    ${flat.status === 'available' ? `
      <div class="divider"></div>
      <div class="form-group"><div class="form-label">Mark as</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-success" onclick="updateFlatStatus('${flat.towerKey}',${flat.floor},'${flat.flatNo}','reserved');closeModal('row-modal')">Reserve Unit</button>
          <button class="btn btn-primary" onclick="updateFlatStatus('${flat.towerKey}',${flat.floor},'${flat.flatNo}','hot-lead');closeModal('row-modal')">🔥 Hot Lead</button>
          <button class="btn btn-accent" onclick="updateFlatStatus('${flat.towerKey}',${flat.floor},'${flat.flatNo}','booked');closeModal('row-modal')">Book Unit</button>
        </div>
      </div>` : ''}
    ${flat.status === 'reserved' ? `<div class="form-group"><div class="form-label">Convert to</div><div style="display:flex;gap:8px"><button class="btn btn-accent" onclick="updateFlatStatus('${flat.towerKey}',${flat.floor},'${flat.flatNo}','booked');closeModal('row-modal')">Confirm Booking</button><button class="btn btn-ghost" onclick="updateFlatStatus('${flat.towerKey}',${flat.floor},'${flat.flatNo}','available');closeModal('row-modal')">Release</button></div></div>` : ''}`;

  document.getElementById('row-modal-footer').innerHTML = `
    <button class="btn btn-ghost" onclick="closeModal('row-modal')">Close</button>
    <button class="btn btn-accent" onclick="closeModal('row-modal');openFlatAI(currentFlat||{flatNo:'${flat.flatNo}',status:'${flat.status}',price:'${flat.price}',unitConfig:'${flat.unitConfig}',tower:'${flat.tower}'})">🧠 Ask AI About This Unit</button>`;
  openModal('row-modal');
}

function openFlatAI(flat) {
  if (!flat) return;
  closeFlatPanel();
  const q = flat.status === 'available'
    ? `Unit ${flat.flatNo} (${flat.unitConfig}, ${flat.price}) in ${flat.tower} is available. What sales strategy should I use to convert it? Who are my best matching leads?`
    : flat.status === 'hot-lead'
    ? `Unit ${flat.flatNo} in ${flat.tower} has a hot lead${flat.leadName ? ' — ' + flat.leadName : ''}. What's the best way to close this deal?`
    : flat.status === 'reserved'
    ? `Unit ${flat.flatNo} is reserved. What's the typical conversion timeline and what actions should I take to ensure booking?`
    : flat.status === 'booked' || flat.status === 'sold'
    ? `Give me a status update for unit ${flat.flatNo} booked by ${flat.buyer||'customer'} — construction progress, next payment due, and any alerts.`
    : `What is the construction status for unit ${flat.flatNo} in ${flat.tower}? When will it be ready?`;
  askSuggestion(q);
  openAI();
}

function updateFlatStatus(towerKey, floor, flatNo, newStatus) {
  const units = FLAT_DATA[towerKey][floor];
  const unit = units.find(u => u.flatNo === flatNo);
  if (unit) {
    unit.status = newStatus;
    renderTowerMap(activeFlatFilter);
    showToast(`${flatNo} status updated to ${newStatus}`, 'success');
  }
}

function filterFlatsByStatus(status) {
  activeFlatFilter = status;
  const sel = document.getElementById('flat-filter');
  if (sel) sel.value = status;
  renderTowerMap(status);
  if (status !== 'all') showToast(`Showing: ${status} units`, 'info');
}

