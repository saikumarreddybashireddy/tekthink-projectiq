const PROJECT_DATA = {
  name: "Skyline Heights",
  location: "Hyderabad, Telangana",
  phases: 3,
  totalUnits: 300,
  reraId: "P02400004521",
  portfolio: [
    {id:"P1",name:"Skyline Heights",location:"Hyderabad",units:300,progress:68,revenue:"₹142 Cr",status:"Active",health:"amber"},
    {id:"P2",name:"Prestige Gardens",location:"Bengaluru",units:180,progress:42,revenue:"₹88 Cr",status:"Active",health:"green"},
    {id:"P3",name:"Marina Bay Villas",location:"Chennai",units:90,progress:15,revenue:"₹22 Cr",status:"Active",health:"red"}
  ],
  gantt:[
    {id:"G1",task:"Foundation — Tower A",zone:"Tower A",start:0,dur:2,pct:100,color:"#10b981",status:"done",owner:"Civil Team"},
    {id:"G2",task:"Superstructure — Tower A",zone:"Tower A",start:2,dur:5,pct:78,color:"#f97316",status:"wip",owner:"Rahul S."},
    {id:"G3",task:"MEP Works — Tower A",zone:"Tower A",start:6,dur:3,pct:0,color:"#3b82f6",status:"todo",owner:"Pradeep K."},
    {id:"G4",task:"Finishing — Tower A",zone:"Tower A",start:9,dur:2,pct:0,color:"#8b5cf6",status:"todo",owner:"Interior Team"},
    {id:"G5",task:"Foundation — Tower B",zone:"Tower B",start:1,dur:3,pct:80,color:"#10b981",status:"wip",owner:"Civil Team"},
    {id:"G6",task:"Superstructure — Tower B",zone:"Tower B",start:3,dur:5,pct:45,color:"#f59e0b",status:"delayed",owner:"Rahul S."},
    {id:"G7",task:"MEP Works — Tower B",zone:"Tower B",start:7,dur:3,pct:0,color:"#3b82f6",status:"todo",owner:"Pradeep K."},
    {id:"G8",task:"Finishing — Tower C",zone:"Tower C",start:4,dur:4,pct:91,color:"#10b981",status:"ahead",owner:"Interior Team"},
    {id:"G9",task:"Clubhouse Construction",zone:"Common",start:3,dur:4,pct:33,color:"#ec4899",status:"wip",owner:"Anil S."},
    {id:"G10",task:"Infrastructure & Roads",zone:"Site",start:1,dur:8,pct:62,color:"#06b6d4",status:"wip",owner:"Infra Team"},
    {id:"G11",task:"Landscaping & Amenities",zone:"Common",start:9,dur:2,pct:0,color:"#84cc16",status:"todo",owner:"External"},
    {id:"G12",task:"Handover — Tower C",zone:"Handover",start:11,dur:1,pct:0,color:"#f97316",status:"todo",owner:"Arjun K."}
  ],
  quality:{
    punchItems:[
      {id:"Q1",unit:"C-1204",type:"Tile Crack",severity:"High",status:"Open",age:"7d",inspector:"Raj K.",desc:"2 tiles cracked master BR. Material defect suspected."},
      {id:"Q2",unit:"A-802",type:"Seepage",severity:"High",status:"In Progress",age:"3d",inspector:"Raj K.",desc:"Water seepage near bathroom tiles."},
      {id:"Q3",unit:"B-501",type:"Paint Quality",severity:"Low",status:"Open",age:"10d",inspector:"Meena R.",desc:"Paint peeling in living room."},
      {id:"Q4",unit:"C-304",type:"Door Alignment",severity:"Med",status:"Closed",age:"2d",inspector:"Raj K.",desc:"Main door misaligned. Rectified."},
      {id:"Q5",unit:"A-1104",type:"Electrical",severity:"Med",status:"In Progress",age:"5d",inspector:"Priya V.",desc:"2 power sockets not working."},
      {id:"Q6",unit:"B-705",type:"Plumbing",severity:"High",status:"Open",age:"4d",inspector:"Meena R.",desc:"Low water pressure 3rd floor."},
      {id:"Q7",unit:"C-901",type:"Window Gap",severity:"Low",status:"Open",age:"8d",inspector:"Raj K.",desc:"Gap in window frame."},
      {id:"Q8",unit:"A-602",type:"Flooring",severity:"Med",status:"In Progress",age:"6d",inspector:"Priya V.",desc:"Uneven flooring in bedroom."}
    ],
    inspectors:["Raj Kumar","Meena Reddy","Priya Varma"]
  },
  safety:{
    score:87,
    incidents:[
      {id:"I1",type:"Near Miss",date:"Apr 12",location:"Tower B L7",severity:"High",desc:"Scaffolding railing loose — worker almost fell. Fixed immediately.",status:"Closed"},
      {id:"I2",type:"Minor Injury",date:"Apr 10",location:"Zone 3",severity:"Med",desc:"Hand cut during rebar handling. First aid given.",status:"Closed"},
      {id:"I3",type:"Near Miss",date:"Apr 14",location:"Tower A L9",severity:"High",desc:"Formwork buckled — no injuries. Structural check in progress.",status:"Open"}
    ],
    ppeCompliance:{today:89,week:92,target:95},
    toolboxTalks:[
      {date:"Apr 14",topic:"Fall Protection & Height Safety",attendance:312,by:"Safety Officer"},
      {date:"Apr 7",topic:"PPE Usage & Enforcement",attendance:298,by:"Arjun K."},
      {date:"Mar 31",topic:"Crane & Equipment Safety",attendance:305,by:"External Trainer"}
    ],
    zonesRisk:[
      {zone:"Tower B L7–L10",risk:"High",reason:"Active formwork + delayed concrete"},
      {zone:"Zone 3 Crane Area",risk:"Med",reason:"High load operations ongoing"},
      {zone:"Tower A L12+",risk:"Low",reason:"Standard ongoing precautions"},
      {zone:"Clubhouse Foundation",risk:"Low",reason:"Ground-level work only"}
    ]
  },
  materials:{
    inventory:[
      {id:"M1",name:"Cement (OPC 53)",unit:"Bags",onHand:4200,required:6000,supplier:"UltraTech",status:"OK"},
      {id:"M2",name:"Steel Bars (Fe500)",unit:"MT",onHand:42,required:80,supplier:"Ram Steel",status:"Low"},
      {id:"M3",name:"Sand (River)",unit:"Cubic m",onHand:320,required:500,supplier:"Local Supplier",status:"OK"},
      {id:"M4",name:"Bricks",unit:"Units",onHand:85000,required:120000,supplier:"Hyd Bricks",status:"OK"},
      {id:"M5",name:"Tiles (Premium)",unit:"Sq ft",onHand:12000,required:45000,supplier:"RAK Ceramics",status:"Critical"},
      {id:"M6",name:"Electrical Cables",unit:"Meters",onHand:8500,required:15000,supplier:"Polycab",status:"Low"}
    ],
    orders:[
      {id:"PO1",material:"Steel Bars",vendor:"Ram Steel",qty:"40 MT",amount:"₹1.4 Cr",expected:"Apr 20",status:"In Transit"},
      {id:"PO2",material:"Tiles (Premium)",vendor:"RAK Ceramics",qty:"33,000 sqft",amount:"₹0.8 Cr",expected:"Apr 28",status:"Processing"},
      {id:"PO3",material:"Cement",vendor:"UltraTech",qty:"3000 Bags",amount:"₹0.18 Cr",expected:"Apr 17",status:"Confirmed"}
    ]
  },
  labour:{
    total:312, onSite:298, absent:14, overtime:42,
    zones:[
      {zone:"Tower A",workers:124,supervisors:4,status:"Full"},
      {zone:"Tower B",workers:89,supervisors:3,status:"Short"},
      {zone:"Tower C",workers:67,supervisors:2,status:"Full"},
      {zone:"Clubhouse",workers:22,supervisors:1,status:"Full"},
      {zone:"Infrastructure",workers:10,supervisors:1,status:"Full"}
    ],
    attendance:[95,92,88,96,91,89,94],
    contractors:[
      {name:"BuildCo Civil",headcount:145,contract:"₹68 Cr",expiry:"Sep 2026",rating:4.1},
      {name:"MEP Systems Ltd",headcount:58,contract:"₹24 Cr",expiry:"Aug 2026",rating:3.8},
      {name:"Interior Works Co",headcount:42,contract:"₹14 Cr",expiry:"Jul 2026",rating:4.4},
      {name:"Steel Fixers Guild",headcount:38,contract:"₹9 Cr",expiry:"Sep 2026",rating:4.2},
      {name:"Electricians Assoc",headcount:29,contract:"₹6 Cr",expiry:"Aug 2026",rating:3.9}
    ]
  },
  funnel:[
    {stage:"Inquiries / Leads",count:284,color:"#3b82f6",pct:100},
    {stage:"Site Visits Scheduled",count:186,color:"#06b6d4",pct:65},
    {stage:"Visit Completed",count:142,color:"#8b5cf6",pct:50},
    {stage:"Negotiation / Token",count:68,color:"#f59e0b",pct:24},
    {stage:"Agreement Signed",count:42,color:"#f97316",pct:15},
    {stage:"Registered / Sold",count:190,color:"#10b981",pct:67}
  ],
  siteVisits:[
    {id:"SV1",prospect:"Anil Sharma",unit:"B-901",date:"Apr 16",time:"10:00 AM",agent:"Ravi K.",status:"Scheduled",phone:"+91 98000 11234"},
    {id:"SV2",prospect:"Lakshmi P.",unit:"A-504",date:"Apr 16",time:"11:30 AM",agent:"Priya S.",status:"Scheduled",phone:"+91 87000 22345"},
    {id:"SV3",prospect:"Kiran Mehta",unit:"C-801",date:"Apr 17",time:"2:00 PM",agent:"Ravi K.",status:"Confirmed",phone:"+91 76000 33456"},
    {id:"SV4",prospect:"Divya R.",unit:"A-1104",date:"Apr 17",time:"4:00 PM",agent:"Suresh T.",status:"Scheduled",phone:"+91 65000 44567"},
    {id:"SV5",prospect:"Raju B.",unit:"B-604",date:"Apr 18",time:"11:00 AM",agent:"Priya S.",status:"Pending",phone:"+91 54000 55678"},
    {id:"SV6",prospect:"Shreya V.",unit:"C-301",date:"Apr 19",time:"3:30 PM",agent:"Ravi K.",status:"Pending",phone:"+91 43000 66789"}
  ],
  channels:[
    {id:"CP1",name:"Rahul Brokers",agent:"Rahul Verma",leads:42,bookings:18,commission:"₹54 L",pending:"₹12 L",rating:4.6,status:"Active"},
    {id:"CP2",name:"PropStar Realty",agent:"Meena Iyer",leads:28,bookings:11,commission:"₹33 L",pending:"₹8 L",rating:4.2,status:"Active"},
    {id:"CP3",name:"HomeFinder HYD",agent:"Arun D.",leads:19,bookings:7,commission:"₹21 L",pending:"₹5 L",rating:3.9,status:"Active"},
    {id:"CP4",name:"NRI Connect",agent:"Priya NRI",leads:14,bookings:6,commission:"₹18 L",pending:"₹4 L",rating:4.8,status:"Active"},
    {id:"CP5",name:"Digital Homes",agent:"Vikas S.",leads:8,bookings:2,commission:"₹6 L",pending:"₹2 L",rating:3.5,status:"Review"}
  ],
  marketing:{
    campaigns:[
      {id:"C1",name:"Google Ads — Phase 2",channel:"Digital",spend:"₹12 L",leads:68,conv:14,cpl:"₹17.6K",roi:142,status:"Active"},
      {id:"C2",name:"Referral Program",channel:"Referral",spend:"₹8 L",leads:56,conv:28,cpl:"₹14.3K",roi:210,status:"Active"},
      {id:"C3",name:"Property Fair Apr",channel:"Offline",spend:"₹6 L",leads:38,conv:9,cpl:"₹15.8K",roi:90,status:"Done"},
      {id:"C4",name:"Instagram Stories",channel:"Social",spend:"₹4 L",leads:44,conv:6,cpl:"₹9.1K",roi:75,status:"Active"},
      {id:"C5",name:"Email Nurture",channel:"Email",spend:"₹1 L",leads:22,conv:8,cpl:"₹4.5K",roi:320,status:"Active"},
      {id:"C6",name:"WhatsApp Broadcast",channel:"WhatsApp",spend:"₹0.5 L",leads:18,conv:5,cpl:"₹2.8K",roi:500,status:"Active"}
    ],
    sources:[
      {src:"Referral",pct:40,leads:112},{src:"Digital",pct:28,leads:79},{src:"Walk-in",pct:15,leads:43},
      {src:"WhatsApp",pct:10,leads:28},{src:"Other",pct:7,leads:22}
    ]
  },
  comms:{
    sent:[
      {id:"MSG1",type:"Construction Update",channel:"WhatsApp",audience:"All Buyers",count:190,sent:"Apr 14",open:"86%"},
      {id:"MSG2",type:"Payment Reminder",channel:"SMS",audience:"Pending Payers",count:42,sent:"Apr 10",open:"94%"},
      {id:"MSG3",type:"Fire NOC Update",channel:"Email",audience:"All Buyers",count:190,sent:"Apr 8",open:"72%"},
      {id:"MSG4",type:"Tower C Milestone",channel:"WhatsApp",audience:"Tower C Buyers",count:60,sent:"Apr 5",open:"91%"}
    ]
  },
  handover:{
    units:[
      {id:"HO1",unit:"C-101",buyer:"Sunita Rao",config:"2BHK",date:"Aug 2026",progress:85,status:"On Track",snags:2,payment:"Complete"},
      {id:"HO2",unit:"C-102",buyer:"Arun Mehta",config:"3BHK",date:"Aug 2026",progress:80,status:"On Track",snags:0,payment:"Complete"},
      {id:"HO3",unit:"C-201",buyer:"Leela S.",config:"2BHK",date:"Aug 2026",progress:72,status:"At Risk",snags:4,payment:"₹8L pending"},
      {id:"HO4",unit:"C-202",buyer:"Rajan P.",config:"1BHK",date:"Aug 2026",progress:90,status:"On Track",snags:1,payment:"Complete"},
      {id:"HO5",unit:"C-301",buyer:"Anita K.",config:"2BHK",date:"Sep 2026",progress:68,status:"At Risk",snags:3,payment:"₹12L pending"},
      {id:"HO6",unit:"A-101",buyer:"Mohan R.",config:"3BHK",date:"Sep 2026",progress:55,status:"Delayed",snags:5,payment:"₹18L pending"}
    ],
    checklist:["Structural completion","MEP testing","Waterproofing check","Painting done","Flooring done","Electrical fittings","Plumbing test","Snag list cleared","OC obtained","Fire NOC","Buyer inspection","Key handover"]
  },
  society:{
    residents:42,
    requests:[
      {id:"SR1",flat:"C-101",resident:"Sunita Rao",type:"Maintenance",issue:"Common area light out",date:"Apr 14",status:"Open"},
      {id:"SR2",flat:"C-102",resident:"Arun Mehta",type:"Admin",issue:"Parking sticker request",date:"Apr 13",status:"Resolved"},
      {id:"SR3",flat:"C-201",resident:"Leela S.",type:"Maintenance",issue:"Intercom not working",date:"Apr 12",status:"In Progress"},
      {id:"SR4",flat:"C-202",resident:"Rajan P.",type:"Security",issue:"Visitor access policy",date:"Apr 11",status:"Resolved"}
    ],
    announcements:[
      {title:"Pool Maintenance",date:"Apr 14",msg:"Pool closed Apr 16–18 for annual maintenance."},
      {title:"Society Meeting",date:"Apr 10",msg:"First residents meeting Apr 20 at 6PM, Clubhouse."},
      {title:"Pest Control",date:"Apr 5",msg:"Building-wide pest control Apr 12. Keep windows closed."}
    ],
    amenities:[
      {name:"Swimming Pool",status:"Operational",hrs:"Tue–Sun 6AM–8PM"},
      {name:"Gymnasium",status:"Operational",hrs:"Daily 5AM–10PM"},
      {name:"Clubhouse",status:"Partial",hrs:"Events only"},
      {name:"Children's Play Area",status:"Operational",hrs:"Daily 7AM–7PM"}
    ]
  },
  vendors:[
    {id:"V1",name:"BuildCo Civil",type:"Civil",contact:"Ravi Mehta",email:"ravi@buildco.in",value:"₹68 Cr",paid:"₹42 Cr",rating:4.1,sla:"95% met",incidents:1,status:"Active"},
    {id:"V2",name:"MEP Systems Ltd",type:"MEP",contact:"Priya Shah",email:"priya@mepsys.in",value:"₹24 Cr",paid:"₹14 Cr",rating:3.8,sla:"88% met",incidents:0,status:"Active"},
    {id:"V3",name:"Interior Works Co",type:"Finishing",contact:"Sanjay R.",email:"sanjay@interior.in",value:"₹14 Cr",paid:"₹4 Cr",rating:4.4,sla:"97% met",incidents:0,status:"Active"},
    {id:"V4",name:"SafetyFirst",type:"Safety/PPE",contact:"Ashok K.",email:"ashok@safety.in",value:"₹2 Cr",paid:"₹1.6 Cr",rating:4.6,sla:"100% met",incidents:0,status:"Active"},
    {id:"V5",name:"Ram Steel Corp",type:"Materials",contact:"Ram S.",email:"ram@steel.in",value:"₹18 Cr",paid:"₹10 Cr",rating:3.6,sla:"82% met",incidents:2,status:"Active"}
  ],
  documents:[
    {id:"D1",name:"RERA Registration Certificate",cat:"Compliance",date:"Jun 2025",expiry:"Dec 2027",status:"Valid",size:"2.4 MB",icon:"📜"},
    {id:"D2",name:"Environmental NOC",cat:"Compliance",date:"May 2025",expiry:"Jun 2027",status:"Valid",size:"1.8 MB",icon:"🌿"},
    {id:"D3",name:"Building Plan Approval",cat:"Approvals",date:"May 2025",expiry:"N/A",status:"Valid",size:"8.2 MB",icon:"📐"},
    {id:"D4",name:"Fire NOC Application",cat:"Compliance",date:"Feb 2026",expiry:"Pending",status:"Pending",size:"1.2 MB",icon:"🔥"},
    {id:"D5",name:"GST Registration",cat:"Finance",date:"Jun 2025",expiry:"Lifetime",status:"Valid",size:"0.8 MB",icon:"💰"},
    {id:"D6",name:"Soil Test Report",cat:"Technical",date:"Apr 2025",expiry:"N/A",status:"Valid",size:"5.6 MB",icon:"🔬"},
    {id:"D7",name:"Structural Drawings — Tower A",cat:"Technical",date:"May 2025",expiry:"N/A",status:"Valid",size:"24.1 MB",icon:"📐"},
    {id:"D8",name:"Sale Agreement Template",cat:"Legal",date:"Jun 2025",expiry:"N/A",status:"Active",size:"0.4 MB",icon:"📝"},
    {id:"D9",name:"Allotment Letters — Phase 1",cat:"Legal",date:"Jul 2025",expiry:"N/A",status:"Active",size:"12 MB",icon:"📬"},
    {id:"D10",name:"Q1 2026 GST Filing",cat:"Finance",date:"Apr 2026",expiry:"N/A",status:"Filed",size:"3.2 MB",icon:"📊"}
  ],
  legal:{
    complaints:[
      {id:"R1",complainant:"Suresh Gupta",unit:"B-401",filed:"Feb 15",issue:"Delay in OC delivery",status:"Pending",hearing:"Apr 25"},
      {id:"R2",complainant:"Malathi V.",unit:"A-602",filed:"Mar 10",issue:"Quality defect — seepage",status:"In Mediation",hearing:"Apr 22"},
      {id:"R3",complainant:"Arvind J.",unit:"C-201",filed:"Jan 20",issue:"Car parking dispute",status:"Resolved",hearing:"N/A"}
    ],
    notices:[
      {id:"LN1",party:"BuildCo Civil",type:"Delay Penalty",issued:"Apr 5",amount:"₹45 L",status:"Disputed"},
      {id:"LN2",party:"MEP Systems",type:"Non-conformance",issued:"Mar 20",amount:"₹12 L",status:"Settled"}
    ]
  },
  overview: {
    progress: 68, revenue: "₹142 Cr", revenueNum: 142,
    targetRevenue: 170, openIssues: 23, reraStatus: "Compliant"
  },
  construction: {
    towers: [
      { id: "TA", name: "Tower A — Superstructure", pct: 78, color: "#f97316", status: "on-track", floors: 18, floorsComplete: 14, workers: 124, lastUpdate: "2 hrs ago" },
      { id: "TB", name: "Tower B — Foundation", pct: 45, color: "#f59e0b", status: "delayed", floors: 16, floorsComplete: 7, workers: 89, lastUpdate: "1 hr ago" },
      { id: "TC", name: "Tower C — Finishing", pct: 91, color: "#10b981", status: "ahead", floors: 15, floorsComplete: 14, workers: 67, lastUpdate: "30 min ago" },
      { id: "CL", name: "Clubhouse", pct: 33, color: "#3b82f6", status: "on-track", floors: 2, floorsComplete: 1, workers: 22, lastUpdate: "4 hrs ago" },
      { id: "INF", name: "Infrastructure", pct: 62, color: "#8b5cf6", status: "on-track", floors: null, floorsComplete: null, workers: 10, lastUpdate: "1 hr ago" }
    ],
    delays: [
      { id: "D001", task: "Concrete pour L9 — Tower B", owner: "Site Eng.", ownerFull: "Rahul Sharma", planned: "Apr 10", revised: "Apr 22", days: 12, risk: "High", cause: "Supplier delivery failure", impact: "MEP works cascade, estimated 3-week total delay", actions: ["Escalate to BuildCo supplier","Arrange alternate supplier","Notify MEP contractor","Update project schedule"] },
      { id: "D002", task: "Electrical conduit — Phase 2", owner: "MEP Lead", ownerFull: "Pradeep Kumar", planned: "Apr 14", revised: "Apr 18", days: 4, risk: "Med", cause: "Material shortage", impact: "Minor impact on Phase 2 timeline", actions: ["Order materials from alternate vendor","Re-sequence other MEP tasks"] },
      { id: "D003", task: "Waterproofing — Terrace A", owner: "Civil Team", ownerFull: "Civil Team", planned: "Apr 20", revised: "Apr 24", days: 4, risk: "Med", cause: "Weather conditions", impact: "Low — parallel work possible", actions: ["Monitor weather forecast","Reschedule for dry window"] }
    ],
    sensors: [
      { id: "S1", name: "Concrete Temp", loc: "Tower A L8", val: 28, unit: "°C", status: "OK", history: [26,27,28,27,29,28,28,27,26,28,29,28] },
      { id: "S2", name: "Vibration", loc: "Tower B Fdn", val: 2.1, unit: "mm/s", status: "Watch", history: [1.2,1.4,1.8,2.0,2.1,1.9,2.0,2.1,2.2,2.1,2.0,2.1] },
      { id: "S3", name: "Humidity", loc: "Clubhouse", val: 72, unit: "%", status: "OK", history: [68,70,71,73,72,74,72,71,70,72,73,72] },
      { id: "S4", name: "Crane Load", loc: "Zone 3", val: 4.2, unit: "T", status: "OK", history: [3.5,4.0,4.2,4.1,3.8,4.2,4.5,4.2,4.0,4.2,4.1,4.2] },
      { id: "S5", name: "Air Quality", loc: "Site Perimeter", val: 48, unit: "AQI", status: "OK", history: [42,45,46,50,48,47,49,48,46,48,47,48] },
      { id: "S6", name: "Steel Stress", loc: "Tower A Slab", val: 180, unit: "MPa", status: "OK", history: [175,178,180,179,181,180,178,180,182,180,179,180] },
      { id: "S7", name: "Settlement", loc: "Tower B Fdn", val: 4.8, unit: "mm", status: "Watch", history: [3.2,3.6,4.0,4.2,4.5,4.6,4.7,4.8,4.8,4.7,4.8,4.8] },
      { id: "S8", name: "Wind Speed", loc: "Roof Level", val: 12, unit: "km/h", status: "OK", history: [8,10,12,15,12,11,13,12,10,12,14,12] }
    ],
    labour: 312, tasksComplete: 142, tasksTotal: 198, delayedTasks: 7,
    tasks: [
      { id: "T001", name: "Concrete pour L9 — Tower B", zone: "Tower B", owner: "Rahul S.", due: "Apr 22", status: "Delayed", priority: "High" },
      { id: "T002", name: "Rebar placement L10 — Tower B", zone: "Tower B", owner: "Rahul S.", due: "Apr 25", status: "Pending", priority: "High" },
      { id: "T003", name: "Plastering Floor 13 — Tower C", zone: "Tower C", owner: "Suresh K.", due: "Apr 18", status: "In Progress", priority: "Med" },
      { id: "T004", name: "MEP conduit — Phase 2", zone: "Phase 2", owner: "Pradeep K.", due: "Apr 18", status: "Delayed", priority: "Med" },
      { id: "T005", name: "Tile work — Tower C Floor 12", zone: "Tower C", owner: "Vijay R.", due: "Apr 20", status: "In Progress", priority: "Low" },
      { id: "T006", name: "Foundation slab — Clubhouse", zone: "Clubhouse", owner: "Civil Team", due: "Apr 30", status: "Pending", priority: "Low" },
      { id: "T007", name: "Waterproofing — Terrace A", zone: "Tower A", owner: "Civil Team", due: "Apr 24", status: "Delayed", priority: "Med" }
    ]
  },
  sales: {
    totalLeads: 284, bookings: 190, siteVisits: 67,
    revenueTarget: "₹170 Cr", revenueAchieved: "₹142 Cr", pctAchieved: 84,
    pipeline: [
      { phase: "Phase 1", units: 120, booked: 108, revenue: "₹54 Cr", avgPrice: "₹5,000/sqft" },
      { phase: "Phase 2", units: 96, booked: 64, revenue: "₹38 Cr", avgPrice: "₹5,200/sqft" },
      { phase: "Phase 3", units: 84, booked: 18, revenue: "₹11 Cr", avgPrice: "₹5,400/sqft" }
    ],
    leads: [
      { id: "L001", name: "Ramesh K.", unit: "A-1204", value: "₹88L", stage: "Hot", chance: 90, phone: "+91 98765 43210", email: "ramesh.k@gmail.com", source: "Referral", notes: "Ready to sign. Needs possession date confirmation.", visits: 3, lastContact: "Today" },
      { id: "L002", name: "Priya S.", unit: "B-802", value: "₹64L", stage: "Warm", chance: 60, phone: "+91 87654 32109", email: "priya.s@yahoo.com", source: "Online", notes: "Comparing with Prestige Hills. Price sensitivity flagged.", visits: 2, lastContact: "2 days ago" },
      { id: "L003", name: "Vikram M.", unit: "C-304", value: "₹52L", stage: "Exploring", chance: 30, phone: "+91 76543 21098", email: "vikram.m@gmail.com", source: "Walk-in", notes: "First-time buyer. Needs home loan guidance.", visits: 1, lastContact: "5 days ago" },
      { id: "L004", name: "Kavitha N.", unit: "A-802", value: "₹76L", stage: "Hot", chance: 85, phone: "+91 65432 10987", email: "kavitha.n@hotmail.com", source: "Referral", notes: "NRI buyer. Prefers digital documentation.", visits: 2, lastContact: "Yesterday" },
      { id: "L005", name: "Suresh R.", unit: "B-1104", value: "₹59L", stage: "Warm", chance: 55, phone: "+91 54321 09876", email: "suresh.r@gmail.com", source: "Property Fair", notes: "Negotiating 2% price reduction.", visits: 3, lastContact: "3 days ago" },
      { id: "L006", name: "Anita P.", unit: "C-601", value: "₹48L", stage: "Exploring", chance: 25, phone: "+91 43210 98765", email: "anita.p@gmail.com", source: "Digital Ad", notes: "Looking for ready-to-move options primarily.", visits: 1, lastContact: "1 week ago" }
    ],
    monthly: [
      { month: "Jan", val: "₹18 Cr", num: 18, pct: 60 },
      { month: "Feb", val: "₹22 Cr", num: 22, pct: 73 },
      { month: "Mar", val: "₹28 Cr", num: 28, pct: 93 },
      { month: "Apr MTD", val: "₹14 Cr", num: 14, pct: 47 }
    ],
    forecast: [
      { month: "May", val: 26, target: 28 },
      { month: "Jun", val: 30, target: 28 },
      { month: "Jul", val: 24, target: 30 },
      { month: "Aug", val: 22, target: 30 }
    ]
  },
  cx: {
    openIssues: 23, escalated: 8, avgResolution: "2.4 days",
    slaCompliance: 91, csat: 4.2,
    issues: [
      { id: "#CX-201", customer: "Ananya R.", unit: "A-602", issue: "Seepage — Unit A-602", priority: "High", status: "Open", age: "3 days", email: "ananya.r@gmail.com", phone: "+91 98760 12345", description: "Water seepage observed near bathroom tiles. Worsening with rain. Unit on 6th floor.", assignedTo: "Site Inspection Team", history: ["Issue raised — Apr 12","Inspection scheduled — Apr 13","Inspection done — Apr 14, pending fix"] },
      { id: "#CX-198", customer: "Suresh P.", unit: "B-502", issue: "Lift not working", priority: "High", status: "Resolved", age: "1 day", email: "suresh.p@yahoo.com", phone: "+91 87651 23456", description: "Lift B-Tower stuck on floor 3. 45 residents affected.", assignedTo: "MEP Team", history: ["Issue raised — Apr 13","Technician dispatched — Apr 13 2 PM","Resolved — Apr 14 10 AM"] },
      { id: "#CX-195", customer: "Meena L.", unit: "A-1002", issue: "OC copy request", priority: "Normal", status: "Open", age: "5 days", email: "meena.l@gmail.com", phone: "+91 76542 34567", description: "Requesting certified copy of Occupancy Certificate for home loan disbursement.", assignedTo: "Legal Team", history: ["Request raised — Apr 10","Documents being compiled — Apr 12"] },
      { id: "#CX-190", customer: "Hari K.", unit: "B-304", issue: "Parking allotment", priority: "Normal", status: "Resolved", age: "2 days", email: "hari.k@gmail.com", phone: "+91 65443 45678", description: "Requesting change in parking slot allocation. Current slot P-24 too far.", assignedTo: "Admin", history: ["Issue raised — Apr 12","Slot reallocated to P-11 — Apr 14"] },
      { id: "#CX-188", customer: "Deepa V.", unit: "C-204", issue: "Tile crack — Master BR", priority: "High", status: "Open", age: "7 days", email: "deepa.v@gmail.com", phone: "+91 54434 56789", description: "2 tiles cracked in master bedroom, 1 in bathroom. Quality concern raised.", assignedTo: "Quality Team", history: ["Issue raised — Apr 8","Quality inspection — Apr 10","Pending material procurement"] },
      { id: "#CX-185", customer: "Ravi T.", unit: "A-803", issue: "Common area lighting", priority: "Low", status: "Open", age: "9 days", email: "ravi.t@gmail.com", phone: "+91 44325 67890", description: "Corridor lighting on 8th floor not functioning. Safety concern at night.", assignedTo: "Electrical Team", history: ["Issue raised — Apr 6","Under investigation"] },
      { id: "#CX-180", customer: "Sunita M.", unit: "B-1204", issue: "Paint quality", priority: "Normal", status: "Open", age: "10 days", email: "sunita.m@gmail.com", phone: "+91 33216 78901", description: "Paint peeling in living room and bedroom. Premium finish not meeting expectations.", assignedTo: "Finishing Team", history: ["Issue raised — Apr 5","Assessment done — Apr 8","Repainting scheduled May 2026"] }
    ],
    sla: [
      { level: "Critical (P1)", target: "4h SLA", actual: "3.8h avg", status: "green", target_h: 4, actual_h: 3.8 },
      { level: "High (P2)", target: "24h SLA", actual: "22h avg", status: "green", target_h: 24, actual_h: 22 },
      { level: "Medium (P3)", target: "72h SLA", actual: "81h avg", status: "red", target_h: 72, actual_h: 81 },
      { level: "Low (P4)", target: "7d SLA", actual: "5.2d avg", status: "green", target_h: 168, actual_h: 124.8 }
    ],
    sentiment: { positive: 58, neutral: 28, negative: 14 },
    sentimentTrend: [60,55,70,58,65,72,68,74,70,58,62,71]
  },
  finance: {
    totalBudget: "₹420 Cr", totalBudgetNum: 420,
    spent: "₹186 Cr", spentNum: 186,
    spentPct: 44, paymentsDue: "₹12.4 Cr", compliance: "100%",
    budgetBreakdown: [
      { label: "Civil & Structural", pct: 68, color: "#f97316", budgeted: "₹168 Cr", spent: "₹114 Cr" },
      { label: "MEP Works", pct: 41, color: "#3b82f6", budgeted: "₹84 Cr", spent: "₹34 Cr" },
      { label: "Finishing & Interior", pct: 22, color: "#10b981", budgeted: "₹63 Cr", spent: "₹14 Cr" },
      { label: "Infrastructure", pct: 55, color: "#f59e0b", budgeted: "₹42 Cr", spent: "₹23 Cr" },
      { label: "Overheads & Legal", pct: 80, color: "#8b5cf6", budgeted: "₹38 Cr", spent: "₹30 Cr" }
    ],
    payments: [
      { id: "P001", vendor: "BuildCo (Civil)", amount: "₹4.2 Cr", due: "Apr 20", status: "Pending", type: "Civil works", contact: "Ravi Mehta · ravi@buildco.in" },
      { id: "P002", vendor: "MEP Systems Ltd", amount: "₹1.8 Cr", due: "Apr 25", status: "Scheduled", type: "MEP installation", contact: "Priya Shah · priya@mepsys.in" },
      { id: "P003", vendor: "SafetyFirst (PPE)", amount: "₹0.4 Cr", due: "Apr 15", status: "Paid", type: "Safety equipment", contact: "Sanjay K · sanjay@safetyfirst.in" },
      { id: "P004", vendor: "Architect Fees", amount: "₹1.2 Cr", due: "Apr 30", status: "Pending", type: "Professional fees", contact: "Anil Mehta Associates" },
      { id: "P005", vendor: "Steel Suppliers", amount: "₹2.8 Cr", due: "May 5", status: "Upcoming", type: "Raw materials", contact: "Ram Steel Corp" },
      { id: "P006", vendor: "Interior Works Co.", amount: "₹1.0 Cr", due: "May 10", status: "Upcoming", type: "Finishing works", contact: "Interior Works Pvt Ltd" }
    ],
    compliance: [
      { label: "RERA Registration", status: "green", expiry: "Dec 2027" },
      { label: "GST Filings", status: "green", expiry: "Current" },
      { label: "Environmental NOC", status: "green", expiry: "Jun 2027" },
      { label: "Building Plan Approval", status: "green", expiry: "N/A" },
      { label: "Fire NOC", status: "amber", expiry: "Pending — May 2026" },
      { label: "Occupancy Certificate", status: "blue", expiry: "In Progress" }
    ],
    cashflow: [
      { month: "Jan", inflow: 18, outflow: 14 },
      { month: "Feb", inflow: 22, outflow: 18 },
      { month: "Mar", inflow: 28, outflow: 22 },
      { month: "Apr", inflow: 14, outflow: 16 }
    ]
  },
  customer: {
    name: "Ramesh Kumar",
    unit: "A-1204",
    tower: "Tower A",
    config: "3BHK",
    area: "1,480 sqft",
    price: "₹88L",
    floor: 12,
    booking: "Jun 2025",
    possession: "Sep 2026",
    progress: 78,
    payments: [
      { name: "Booking", amount: "₹8.8 L", date: "Jun 2025", status: "Paid" },
      { name: "Foundation", amount: "₹14.4 L", date: "Jan 2026", status: "Paid" },
      { name: "Slab (Floor 12)", amount: "₹17.6 L", date: "Mar 2026", status: "Paid" },
      { name: "Plaster", amount: "₹11 L", date: "Due May 2026", status: "Pending" },
      { name: "Possession", amount: "₹17.6 L", date: "Due Sep 2026", status: "Upcoming" }
    ],
    milestones: [
      { status: "done", label: "Foundation complete", date: "Jan 2026" },
      { status: "done", label: "Slab casting — Floor 12", date: "Mar 2026" },
      { status: "wip", label: "Brick & plaster work", date: "May 2026" },
      { status: "todo", label: "Flooring & fixtures", date: "Jul 2026" },
      { status: "todo", label: "Handover", date: "Sep 2026" }
    ]
  }
};

// ===================================================
// NOTIFICATIONS DATA
// ===================================================
let NOTIFICATIONS = [
  { id: 1, type: "red", icon: "⚠️", title: "Tower B Delay", desc: "Concrete pour 12 days behind. Supplier escalation needed.", time: "5 min ago", unread: true, action: "What should I do about the Tower B concrete pour delay?" },
  { id: 2, type: "amber", icon: "💰", title: "Payment Due", desc: "BuildCo payment of ₹4.2 Cr due Apr 20 — 5 days away.", time: "1 hr ago", unread: true, action: "Analyze upcoming vendor payments and flag any cash flow risks" },
  { id: 3, type: "amber", icon: "🎯", title: "SLA Breach", desc: "Medium priority SLA exceeded by 9 hours. CX-188 critical.", time: "2 hrs ago", unread: true, action: "Which customer complaints are most urgent?" },
  { id: 4, type: "blue", icon: "📊", title: "Weekly Report Ready", desc: "Construction progress report for Week 15 is ready to view.", time: "3 hrs ago", unread: true, action: "" },
  { id: 5, type: "green", icon: "✅", title: "Tower C Milestone", desc: "Finishing phase at 91% — ahead of schedule by 1 week!", time: "4 hrs ago", unread: true, action: "" },
  { id: 6, type: "red", icon: "🔴", title: "Budget Alert", desc: "Overheads at 80% utilization — contractor billing review needed.", time: "6 hrs ago", unread: true, action: "Analyze current budget status and flag overruns" },
  { id: 7, type: "blue", icon: "👤", title: "New Lead", desc: "New lead: Anita P. (Unit C-601, ₹48L) from Digital Ad campaign.", time: "Yesterday", unread: false, action: "" },
  { id: 8, type: "green", icon: "✅", title: "CX-198 Resolved", desc: "Lift issue B-Tower resolved by MEP team. CSAT: 5/5.", time: "Yesterday", unread: false, action: "" }
];

// ===================================================
// ACTIVITY LOG
// ===================================================
let ACTIVITY_LOG = [
  { time: "9:14 AM", content: "Arjun Kumar logged in", badge: "user" },
  { time: "8:45 AM", content: "CX-198 (Lift issue) resolved by MEP Team", badge: "green" },
  { time: "8:30 AM", content: "Tower B delay report updated — 12 days", badge: "red" },
  { time: "7:50 AM", content: "₹0.4 Cr payment processed to SafetyFirst", badge: "green" },
  { time: "6:00 AM", content: "Weekly IoT sensor report generated", badge: "blue" },
  { time: "Yesterday", content: "New lead Anita P. added via Digital Ad", badge: "blue" },
  { time: "Yesterday", content: "Budget review meeting notes uploaded", badge: "info" }
];

// ===================================================
// STATE
// ===================================================
let aiContext = 'all';
let conversationHistory = [];
let isAILoading = false;
let suggestionsHidden = false;
let currentView = 'management';
let notifOpen = false;
let currentKPIContext = '';
let sensorInterval = null;

// ===================================================
// UTILITY FUNCTIONS
// ===================================================
function statusBadge(s) {
  const map = {
    'OK':'badge-green','Watch':'badge-amber','High':'badge-red','Med':'badge-amber','Low':'badge-blue',
    'Paid':'badge-green','Pending':'badge-amber','Scheduled':'badge-blue','Upcoming':'badge-gray',
    'Open':'badge-amber','Resolved':'badge-green','Normal':'badge-blue',
    'Hot':'badge-red','Warm':'badge-amber','Exploring':'badge-blue',
    'green':'badge-green','amber':'badge-amber','red':'badge-red','blue':'badge-blue',
    'on-track':'badge-green','delayed':'badge-red','ahead':'badge-purple',
    'Delayed':'badge-red','In Progress':'badge-blue','Done':'badge-green',
    'Overrun':'badge-red','Critical':'badge-red'
  };
  return `<span class="badge ${map[s]||'badge-gray'}">${s}</span>`;
}

function kpi(label, value, change, dir, sparkData, kpiKey) {
  const sparkBars = sparkData ? sparkData.map((v, i) => {
    const max = Math.max(...sparkData);
    const h = Math.round((v / max) * 100);
    return `<div class="kpi-spark-bar" style="height:${h}%;background:${dir==='up'?'#10b981':dir==='down'?'#ef4444':'#3b82f6'}"></div>`;
  }).join('') : '';
  return `
    <div class="kpi-card" onclick="openKPIModal('${kpiKey||label}','${value}','${change}','${dir}')">
      <div class="kpi-label">${label}</div>
      <div class="kpi-value">${value}</div>
      <div class="kpi-change ${dir}">${dir==='up'?'▲':dir==='down'?'▼':'●'} ${change}</div>
      ${sparkData ? `<div class="kpi-sparkline">${sparkBars}</div>` : ''}
    </div>`;
}

function progRow(label, pct, color, onclick_fn) {
  const safePct = Math.min(100, Math.max(0, pct));
  return `<div class="prog-row" onclick="${onclick_fn||''}">
    <div class="prog-label" title="${label}">${label}</div>
    <div class="prog-bar-bg"><div class="prog-bar-fill" style="width:${safePct}%;background:${color||'#3b82f6'}"></div></div>
    <div class="prog-pct">${safePct}%</div>
  </div>`;
}

function riskRow(text, level, action, dismissable) {
  return `<div class="risk-row ${level}" onclick="handleRiskClick(event,'${text.replace(/'/g,"\\'")}','${level}')">
    <div class="risk-dot"></div>
    <div>
      <div class="risk-text">${text}</div>
      ${action ? `<div class="risk-action-text">${action}</div>` : ''}
    </div>
    ${dismissable !== false ? `<button class="risk-dismiss" onclick="event.stopPropagation();dismissRisk(this)" title="Dismiss">✕</button>` : ''}
  </div>`;
}

function tlItem(status, text, date, isLast) {
  return `<div class="tl-item" onclick="showToast('${text} — ${date}','info')">
    ${!isLast ? '<div class="tl-line"></div>' : ''}
    <div class="tl-dot ${status}"></div>
    <div>
      <div class="tl-text">${text}</div>
      <div class="tl-date">${status==='done'?'✅ Completed:':status==='wip'?'🔄 In Progress:':'📅 Planned:'} ${date}</div>
    </div>
  </div>`;
}

function slaRow(level, target, actual, status) {
  const statusIcon = status === 'green' ? '✅' : '⚠️';
  return `<div class="sla-row" onclick="openSLADetail('${level}','${target}','${actual}','${status}')">
    <div class="sla-name">${level}</div>
    <div class="sla-target">${target}</div>
    <div class="sla-actual" style="color:${status==='green'?'var(--teal)':'var(--red)'}">${statusIcon} ${actual}</div>
    <span class="badge badge-${status==='green'?'green':'red'}" style="font-size:10px">${status==='green'?'Met':'Breach'}</span>
  </div>`;
}

function sensorMiniChart(history, color) {
  const max = Math.max(...history);
  const min = Math.min(...history);
  return history.map(v => {
    const h = max === min ? 50 : Math.round(((v - min) / (max - min)) * 100);
    return `<div class="sensor-bar" style="height:${Math.max(15, h)}%;background:${color}"></div>`;
  }).join('');
}

// ===================================================
// MODAL SYSTEM
// ===================================================
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function openKPIModal(label, value, change, dir) {
  currentKPIContext = label;
  document.getElementById('kpi-modal-title').textContent = label + ' — Detail';
  const kpiData = getKPIDetail(label, value, change, dir);
  document.getElementById('kpi-modal-body').innerHTML = kpiData;
  openModal('kpi-modal');
}

function askAboutKPI() {
  closeModal('kpi-modal');
  askSuggestion(`Analyze ${currentKPIContext} in detail and give me actionable insights and recommendations`);
  openAI();
}

function getKPIDetail(label, value, change, dir) {
  const details = {
    'Overall Progress': `
      <div class="info-grid mb-14">
        <div class="info-item"><div class="info-label">Overall</div><div class="info-value" style="color:var(--accent);font-size:24px;font-family:'Syne',sans-serif">68%</div></div>
        <div class="info-item"><div class="info-label">Target (Week 15)</div><div class="info-value">70%</div></div>
      </div>
      <div class="section-title" style="font-size:12px;margin-bottom:8px">By Tower</div>
      ${PROJECT_DATA.construction.towers.map(t => progRow(t.name, t.pct, t.color)).join('')}
      <div class="divider"></div>
      <div class="stat-row"><div class="stat-key">Tasks Complete</div><div class="stat-val">142 / 198</div></div>
      <div class="stat-row"><div class="stat-key">Delayed Tasks</div><div class="stat-val" style="color:var(--red)">7</div></div>
      <div class="stat-row"><div class="stat-key">Labour on Site</div><div class="stat-val">312 workers</div></div>`,
    'Revenue Booked': `
      <div class="info-grid mb-14">
        <div class="info-item"><div class="info-label">Achieved</div><div class="info-value" style="color:var(--teal);font-size:22px;font-family:'Syne',sans-serif">₹142 Cr</div></div>
        <div class="info-item"><div class="info-label">Target</div><div class="info-value" style="font-size:22px;font-family:'Syne',sans-serif">₹170 Cr</div></div>
      </div>
      ${progRow('Achievement', 84, '#10b981')}
      <div class="divider"></div>
      ${PROJECT_DATA.sales.pipeline.map(p => `<div class="stat-row"><div class="stat-key">${p.phase}</div><div class="stat-val">${p.revenue} (${Math.round(p.booked/p.units*100)}%)</div></div>`).join('')}`,
    'Open Issues': `
      <div class="info-grid mb-14">
        <div class="info-item"><div class="info-label">Total Open</div><div class="info-value" style="color:var(--amber);font-size:22px;font-family:'Syne',sans-serif">23</div></div>
        <div class="info-item"><div class="info-label">Escalated</div><div class="info-value" style="color:var(--red);font-size:22px;font-family:'Syne',sans-serif">8</div></div>
      </div>
      <div class="stat-row"><div class="stat-key">High Priority</div><div class="stat-val" style="color:var(--red)">3 issues</div></div>
      <div class="stat-row"><div class="stat-key">Avg Resolution</div><div class="stat-val">2.4 days</div></div>
      <div class="stat-row"><div class="stat-key">SLA Compliance</div><div class="stat-val">91%</div></div>
      <div class="stat-row"><div class="stat-key">CSAT Score</div><div class="stat-val">4.2 / 5.0</div></div>`,
    'RERA Status': `
      <div class="info-grid mb-14">
        <div class="info-item"><div class="info-label">RERA ID</div><div class="info-value" style="font-size:11px">${PROJECT_DATA.reraId}</div></div>
        <div class="info-item"><div class="info-label">Status</div><div class="info-value" style="color:var(--teal)">✅ Active</div></div>
      </div>
      ${PROJECT_DATA.finance.compliance.map(c => `<div class="stat-row"><div class="stat-key">${c.label}</div><div class="stat-val">${statusBadge(c.status)} ${c.expiry}</div></div>`).join('')}`
  };
  return details[label] || `<div class="info-item"><div class="info-label">${label}</div><div class="info-value" style="font-size:24px;font-family:'Syne',sans-serif">${value}</div></div><div style="color:var(--txt2);font-size:12px;margin-top:8px">${change}</div>`;
}

function openRowDetail(type, id) {
  let title = '', body = '', footer = '';
  
  if (type === 'delay') {
    const d = PROJECT_DATA.construction.delays.find(x => x.id === id);
    if (!d) return;
    title = `Delay: ${d.task}`;
    body = `
      <div class="info-grid mb-14">
        <div class="info-item"><div class="info-label">Delay</div><div class="info-value" style="color:var(--red);font-family:'Syne',sans-serif;font-size:22px">${d.days} days</div></div>
        <div class="info-item"><div class="info-label">Risk Level</div><div class="info-value">${statusBadge(d.risk)}</div></div>
        <div class="info-item"><div class="info-label">Owner</div><div class="info-value">${d.ownerFull}</div></div>
        <div class="info-item"><div class="info-label">Planned</div><div class="info-value">${d.planned}</div></div>
        <div class="info-item"><div class="info-label">Revised</div><div class="info-value" style="color:var(--amber)">${d.revised}</div></div>
      </div>
      <div class="form-group"><div class="form-label">Root Cause</div><div style="font-size:13px;color:var(--txt);padding:8px;background:var(--surface2);border-radius:8px">${d.cause}</div></div>
      <div class="form-group"><div class="form-label">Impact</div><div style="font-size:13px;color:var(--red);padding:8px;background:#fff5f5;border-radius:8px">${d.impact}</div></div>
      <div class="form-label" style="margin-bottom:8px">Recommended Actions</div>
      ${d.actions.map((a, i) => `<div style="display:flex;align-items:center;gap:8px;padding:8px;border:1px solid var(--border);border-radius:8px;margin-bottom:6px;cursor:pointer" onclick="showToast('Action noted: ${a}','success')"><span style="width:20px;height:20px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-family:'Syne',sans-serif;font-weight:700;flex-shrink:0">${i+1}</span><span style="font-size:12px">${a}</span><button class="tbl-action" style="margin-left:auto" onclick="event.stopPropagation();markActionDone(this)">Done</button></div>`).join('')}`;
    footer = `<button class="btn btn-ghost" onclick="closeModal('row-modal')">Close</button><button class="btn btn-accent" onclick="closeModal('row-modal');askSuggestion('How do I resolve: ${d.task} which is ${d.days} days delayed? Give specific step-by-step plan');openAI()">🧠 AI Resolution Plan</button>`;
  }
  
  else if (type === 'lead') {
    const l = PROJECT_DATA.sales.leads.find(x => x.id === id);
    if (!l) return;
    title = `Lead: ${l.name} — ${l.unit}`;
    body = `
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border)">
        <div class="avatar" style="width:44px;height:44px;font-size:16px">${l.name.split(' ').map(n=>n[0]).join('')}</div>
        <div>
          <div style="font-family:'Syne',sans-serif;font-size:15px;font-weight:600">${l.name}</div>
          <div style="font-size:12px;color:var(--txt2)">${l.phone} · ${l.email}</div>
          <div style="margin-top:4px">${statusBadge(l.stage)} <span style="font-size:12px;color:var(--txt2)">· ${l.chance}% probability</span></div>
        </div>
        <div style="margin-left:auto">
          <div class="score-badge ${l.chance >= 70 ? 'score-high' : l.chance >= 50 ? 'score-med' : 'score-low'}">${l.chance}</div>
          <div style="font-size:9px;color:var(--txt3);text-align:center;margin-top:2px">SCORE</div>
        </div>
      </div>
      <div class="info-grid mb-14">
        <div class="info-item"><div class="info-label">Unit</div><div class="info-value">${l.unit}</div></div>
        <div class="info-item"><div class="info-label">Value</div><div class="info-value" style="color:var(--teal)">${l.value}</div></div>
        <div class="info-item"><div class="info-label">Source</div><div class="info-value">${l.source}</div></div>
        <div class="info-item"><div class="info-label">Site Visits</div><div class="info-value">${l.visits}</div></div>
        <div class="info-item"><div class="info-label">Last Contact</div><div class="info-value">${l.lastContact}</div></div>
      </div>
      <div class="form-group"><div class="form-label">Notes</div><div style="font-size:12px;padding:8px;background:var(--surface2);border-radius:8px">${l.notes}</div></div>
      <div class="form-group">
        <div class="form-label">Update Stage</div>
        <select class="form-select" id="lead-stage-${l.id}" onchange="updateLeadStage('${l.id}',this.value)">
          <option ${l.stage==='Exploring'?'selected':''}>Exploring</option>
          <option ${l.stage==='Warm'?'selected':''}>Warm</option>
          <option ${l.stage==='Hot'?'selected':''}>Hot</option>
          <option>Booked</option>
          <option>Lost</option>
        </select>
      </div>
      <div class="form-group">
        <div class="form-label">Add Note</div>
        <textarea class="form-textarea" id="lead-note-${l.id}" placeholder="Add a note about this lead..."></textarea>
      </div>`;
    footer = `<button class="btn btn-ghost" onclick="closeModal('row-modal')">Close</button><button class="btn btn-primary" onclick="saveLeadNote('${l.id}')">Save Note</button><button class="btn btn-accent" onclick="closeModal('row-modal');askSuggestion('Give me a tailored pitch strategy for lead ${l.name} who is interested in unit ${l.unit} worth ${l.value}. Current stage: ${l.stage}. Notes: ${l.notes}');openAI()">🧠 AI Pitch Strategy</button>`;
  }
  
  else if (type === 'issue') {
    const i = PROJECT_DATA.cx.issues.find(x => x.id === id);
    if (!i) return;
    title = `Issue ${i.id}: ${i.issue}`;
    body = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border)">
        <div class="avatar">${i.customer.split(' ').map(n=>n[0]).join('')}</div>
        <div>
          <div style="font-family:'Syne',sans-serif;font-size:14px;font-weight:600">${i.customer}</div>
          <div style="font-size:12px;color:var(--txt2)">Unit ${i.unit} · ${i.phone}</div>
        </div>
        <div style="margin-left:auto;display:flex;gap:6px">${statusBadge(i.priority)} ${statusBadge(i.status)}</div>
      </div>
      <div class="form-group"><div class="form-label">Description</div><div style="font-size:12px;padding:8px;background:var(--surface2);border-radius:8px">${i.description}</div></div>
      <div class="info-grid mb-14">
        <div class="info-item"><div class="info-label">Age</div><div class="info-value">${i.age}</div></div>
        <div class="info-item"><div class="info-label">Assigned To</div><div class="info-value">${i.assignedTo}</div></div>
      </div>
      <div class="form-label" style="margin-bottom:8px">Issue History</div>
      <div style="padding:10px;background:var(--surface2);border-radius:8px;margin-bottom:14px">
        ${i.history.map(h => `<div style="font-size:11px;color:var(--txt2);padding:3px 0;border-bottom:1px solid var(--border)">${h}</div>`).join('')}
      </div>
      <div class="form-group">
        <div class="form-label">Update Status</div>
        <select class="form-select" id="issue-status-${i.id}">
          <option ${i.status==='Open'?'selected':''}>Open</option>
          <option ${i.status==='Resolved'?'selected':''}>Resolved</option>
          <option>Escalated</option>
          <option>Closed</option>
        </select>
      </div>
      <div class="form-group">
        <div class="form-label">Resolution Note</div>
        <textarea class="form-textarea" placeholder="Describe the resolution or update..."></textarea>
      </div>`;
    footer = `<button class="btn btn-ghost" onclick="closeModal('row-modal')">Close</button><button class="btn btn-success" onclick="resolveIssue('${i.id}')">✅ Mark Resolved</button><button class="btn btn-danger" onclick="escalateIssue('${i.id}')">🔴 Escalate</button><button class="btn btn-accent" onclick="closeModal('row-modal');askSuggestion('How should I resolve issue ${i.id}: ${i.issue} for customer ${i.customer}? It has been open for ${i.age}.');openAI()">🧠 AI Resolve</button>`;
  }
  
  else if (type === 'payment') {
    const p = PROJECT_DATA.finance.payments.find(x => x.id === id);
    if (!p) return;
    title = `Payment: ${p.vendor}`;
    body = `
      <div class="info-grid mb-14">
        <div class="info-item"><div class="info-label">Vendor</div><div class="info-value">${p.vendor}</div></div>
        <div class="info-item"><div class="info-label">Amount</div><div class="info-value" style="color:var(--accent);font-family:'Syne',sans-serif;font-size:20px">${p.amount}</div></div>
        <div class="info-item"><div class="info-label">Due Date</div><div class="info-value">${p.due}</div></div>
        <div class="info-item"><div class="info-label">Status</div><div class="info-value">${statusBadge(p.status)}</div></div>
        <div class="info-item"><div class="info-label">Type</div><div class="info-value">${p.type}</div></div>
        <div class="info-item"><div class="info-label">Contact</div><div class="info-value" style="font-size:11px">${p.contact}</div></div>
      </div>
      <div class="form-group">
        <div class="form-label">Approval Notes</div>
        <textarea class="form-textarea" placeholder="Add approval notes or conditions..."></textarea>
      </div>`;
    footer = `<button class="btn btn-ghost" onclick="closeModal('row-modal')">Close</button><button class="btn btn-success" onclick="approvePayment('${p.id}')">✅ Approve Payment</button><button class="btn btn-danger" onclick="holdPayment('${p.id}')">⏸ Hold</button>`;
  }
  
  else if (type === 'task') {
    const t = PROJECT_DATA.construction.tasks.find(x => x.id === id);
    if (!t) return;
    title = `Task: ${t.id}`;
    body = `
      <div class="form-group"><div class="form-label">Task Name</div><input class="form-input" value="${t.name}"></div>
      <div class="info-grid mb-14">
        <div class="info-item"><div class="info-label">Zone</div><div class="info-value">${t.zone}</div></div>
        <div class="info-item"><div class="info-label">Owner</div><div class="info-value">${t.owner}</div></div>
        <div class="info-item"><div class="info-label">Due Date</div><div class="info-value">${t.due}</div></div>
        <div class="info-item"><div class="info-label">Priority</div><div class="info-value">${statusBadge(t.priority)}</div></div>
      </div>
      <div class="form-group">
        <div class="form-label">Status</div>
        <select class="form-select">
          <option ${t.status==='Pending'?'selected':''}>Pending</option>
          <option ${t.status==='In Progress'?'selected':''}>In Progress</option>
          <option ${t.status==='Delayed'?'selected':''}>Delayed</option>
          <option ${t.status==='Done'?'selected':''}>Done</option>
        </select>
      </div>
      <div class="form-group">
        <div class="form-label">Notes</div>
        <textarea class="form-textarea" placeholder="Add task notes..."></textarea>
      </div>`;
    footer = `<button class="btn btn-ghost" onclick="closeModal('row-modal')">Close</button><button class="btn btn-primary" onclick="showToast('Task updated','success');closeModal('row-modal')">Save Changes</button>`;
  }
  
  document.getElementById('row-modal-title').textContent = title;
  document.getElementById('row-modal-body').innerHTML = body;
  document.getElementById('row-modal-footer').innerHTML = footer;
  openModal('row-modal');
}

function updateLeadStage(id, stage) {
  const lead = PROJECT_DATA.sales.leads.find(l => l.id === id);
  if (lead) { lead.stage = stage; showToast(`Lead stage updated to ${stage}`, 'success'); }
}
function saveLeadNote(id) {
  showToast('Note saved successfully', 'success');
  closeModal('row-modal');
}
function resolveIssue(id) {
  const issue = PROJECT_DATA.cx.issues.find(i => i.id === id);
  if (issue) { issue.status = 'Resolved'; showToast(`Issue ${id} marked as resolved`, 'success'); closeModal('row-modal'); }
}
function escalateIssue(id) {
  showToast(`Issue ${id} escalated to management`, 'warning');
  closeModal('row-modal');
}
function approvePayment(id) {
  const p = PROJECT_DATA.finance.payments.find(x => x.id === id);
  if (p) { p.status = 'Scheduled'; showToast(`Payment approved: ${p.vendor}`, 'success'); closeModal('row-modal'); }
}
function holdPayment(id) {
  showToast('Payment held for review', 'warning');
  closeModal('row-modal');
}
function markActionDone(btn) {
  btn.parentElement.style.opacity = '0.5';
  btn.textContent = '✅';
  btn.disabled = true;
}

function addTask() {
  const name = document.getElementById('task-name').value.trim();
  if (!name) { showToast('Please enter a task name', 'error'); return; }
  const newTask = {
    id: 'T' + Date.now(),
    name,
    zone: document.getElementById('task-module').value,
    owner: document.getElementById('task-owner').value || 'Unassigned',
    due: document.getElementById('task-due').value,
    status: 'Pending',
    priority: document.getElementById('task-priority').value
  };
  PROJECT_DATA.construction.tasks.push(newTask);
  PROJECT_DATA.construction.tasksTotal++;
  showToast('Task added successfully', 'success');
  closeModal('add-task-modal');
}

// ===================================================
// RISK HANDLERS
// ===================================================
function handleRiskClick(event, text, level) {
  if (event.target.classList.contains('risk-dismiss')) return;
  askSuggestion(`Tell me more about this risk and how to mitigate it: ${text}`);
  openAI();
}
function dismissRisk(btn) {
  btn.closest('.risk-row').style.transition = 'all 0.3s';
  btn.closest('.risk-row').style.opacity = '0';
  setTimeout(() => btn.closest('.risk-row').remove(), 300);
  showToast('Risk dismissed', 'info');
}

// ===================================================
// SLA DETAIL
// ===================================================
function openSLADetail(level, target, actual, status) {
  document.getElementById('row-modal-title').textContent = `SLA Detail: ${level}`;
  document.getElementById('row-modal-body').innerHTML = `
    <div class="info-grid mb-14">
      <div class="info-item"><div class="info-label">Level</div><div class="info-value">${level}</div></div>
      <div class="info-item"><div class="info-label">Status</div><div class="info-value">${statusBadge(status==='green'?'green':'red')} ${status==='green'?'Met':'Breach'}</div></div>
      <div class="info-item"><div class="info-label">Target</div><div class="info-value">${target}</div></div>
      <div class="info-item"><div class="info-label">Actual Avg</div><div class="info-value" style="color:${status==='green'?'var(--teal)':'var(--red)'}">${actual}</div></div>
    </div>
    ${status !== 'green' ? `<div class="alert-banner amber"><span class="alert-banner-icon">⚠️</span><div class="alert-banner-text">This SLA is currently breached. Immediate action required to bring resolution times back within target.</div></div>` : ''}`;
  document.getElementById('row-modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="closeModal('row-modal')">Close</button><button class="btn btn-accent" onclick="closeModal('row-modal');askSuggestion('How can I improve SLA compliance for ${level}? Current actual: ${actual}, target: ${target}');openAI()">🧠 Ask AI</button>`;
  openModal('row-modal');
}

// ===================================================
// TOAST
// ===================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(10px) scale(0.95)'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ===================================================
// NOTIFICATIONS
// ===================================================
function renderNotifications() {
  const list = document.getElementById('notif-list');
  list.innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="handleNotifClick(${n.id})">
      <div class="notif-icon ${n.type}">${n.icon}</div>
      <div class="notif-content">
        <div class="notif-ntitle">${n.title}</div>
        <div class="notif-ndesc">${n.desc}</div>
        <div class="notif-ntime">${n.time}</div>
      </div>
      ${n.unread ? '<div style="width:7px;height:7px;border-radius:50%;background:var(--accent);flex-shrink:0;margin-top:4px"></div>' : ''}
    </div>`).join('');
  
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;
  const badge = document.getElementById('notif-count-badge');
  if (badge) badge.textContent = `${unreadCount} new`;
  const dot = document.getElementById('notif-dot');
  if (dot) dot.style.display = unreadCount > 0 ? 'block' : 'none';
}

function handleNotifClick(id) {
  const n = NOTIFICATIONS.find(x => x.id === id);
  if (!n) return;
  n.unread = false;
  renderNotifications();
  if (n.action) {
    closeNotif();
    askSuggestion(n.action);
    openAI();
  }
}

function toggleNotif() {
  notifOpen = !notifOpen;
  const panel = document.getElementById('notif-panel');
  panel.classList.toggle('open', notifOpen);
  if (notifOpen) renderNotifications();
}
function closeNotif() { notifOpen = false; document.getElementById('notif-panel').classList.remove('open'); }

function markAllRead() {
  NOTIFICATIONS.forEach(n => n.unread = false);
  renderNotifications();
  showToast('All notifications marked as read', 'info');
}

// ===================================================
// SENSOR SIMULATION
// ===================================================
function startSensorSim() {
  if (sensorInterval) clearInterval(sensorInterval);
  sensorInterval = setInterval(() => {
    PROJECT_DATA.construction.sensors.forEach(s => {
      const noise = (Math.random() - 0.5) * 0.05 * s.val;
      s.val = parseFloat((s.val + noise).toFixed(1));
      s.history.push(s.val);
      if (s.history.length > 12) s.history.shift();
    });
    if (currentView === 'construction') {
      const sensorCards = document.querySelectorAll('.sensor-card');
      if (sensorCards.length > 0) {
        PROJECT_DATA.construction.sensors.forEach((s, idx) => {
          const card = sensorCards[idx];
          if (!card) return;
          const valEl = card.querySelector('.sensor-val');
          if (valEl) valEl.textContent = s.val + s.unit;
        });
      }
    }
  }, 3000);
}

// ===================================================
