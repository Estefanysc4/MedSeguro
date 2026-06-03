const PATIENTS = [
  {
    id:'mr', initials:'MR', color:'#7C6FCD',
    name:'María Rodríguez', room:'Hab. 301 · Cama A', age:58,
    status:'warn', fc:'112', spo:'94%', pa:'130/85',
    doc:'Dr. Herrera', nextDose:'14:30',
    note:'FC elevada desde las 12:00. Médico notificado. Monitoreo cada 30 min.',
    meds:[
      {ico:'lav',icn:'ti-pill',name:'Omeprazol 20mg',dose:'Oral · cada 12h',time:'14:30',cls:'soon'},
      {ico:'mint',icn:'ti-droplet',name:'Solución salina IV',dose:'IV · continuo',time:'activo',cls:'ok'},
    ]
  },
  {
    id:'jc', initials:'JC', color:'#2EBD8A',
    name:'Juan Castro', room:'Hab. 302 · Cama A', age:42,
    status:'ok', fc:'78', spo:'98%', pa:'120/78',
    doc:'Dr. López', nextDose:'16:00',
    note:'Sin novedades. Control rutinario a las 17:00.',
    meds:[
      {ico:'lav',icn:'ti-pill',name:'Omeprazol 20mg',dose:'Oral · cada 12h',time:'15:00',cls:'soon'},
      {ico:'peach',icn:'ti-needle',name:'Insulina NPH 10U',dose:'SC · cada 8h',time:'16:00',cls:'ok'},
    ]
  },
  {
    id:'lp', initials:'LP', color:'#3D8FE8',
    name:'Luis Peña', room:'Hab. 303 · Cama B', age:67,
    status:'watch', fc:'95', spo:'96%', pa:'140/90',
    doc:'Dr. Herrera', nextDose:'15:15',
    note:'SpO₂ en límite inferior. O₂ disponible si baja de 95%.',
    meds:[
      {ico:'lav',icn:'ti-pill',name:'Metformina 500mg',dose:'Oral · con alimentos',time:'14:30',cls:'soon'},
      {ico:'mint',icn:'ti-droplet',name:'Enalapril 10mg',dose:'Oral · cada 24h',time:'18:00',cls:'ok'},
    ]
  },
  {
    id:'ac', initials:'AC', color:'#F47B4F',
    name:'Ana Corredor', room:'Hab. 304 · Cama A', age:35,
    status:'ok', fc:'72', spo:'99%', pa:'110/70',
    doc:'Dr. Mora', nextDose:'18:00',
    note:'Evolución favorable. Alta probable mañana.',
    meds:[
      {ico:'lav',icn:'ti-pill',name:'Ibuprofeno 400mg',dose:'Oral · cada 8h',time:'16:00',cls:'ok'},
    ]
  },
  {
    id:'cm', initials:'CM', color:'#E05080',
    name:'Carlos Mora', room:'Hab. 305 · Cama C', age:71,
    status:'warn', fc:'130', spo:'91%', pa:'160/100',
    doc:'Dr. López', nextDose:'14:45',
    note:'ALERTA: FC y PA elevadas. SpO₂ baja. Médico notificado a las 09:20.',
    meds:[
      {ico:'lav',icn:'ti-pill',name:'Captopril 25mg',dose:'Oral · emergencia',time:'ahora',cls:'soon'},
      {ico:'mint',icn:'ti-droplet',name:'O₂ suplementario',dose:'Mascarilla 3L/min',time:'activo',cls:'ok'},
    ]
  },
];

const ALERTS_DATA = [
  {id:'a1',sev:'crit',title:'FC elevada — M. Rodríguez',sub:'FC 112 bpm · Hab. 301A · Dr. notificado',time:'hace 2 min'},
  {id:'a2',sev:'crit',title:'SpO₂ baja — C. Mora',sub:'SpO₂ 91% · Hab. 305C · Urgente',time:'hace 5 min'},
  {id:'a3',sev:'watch',title:'Dosis pendiente',sub:'L. Peña · Metformina 500mg · Hab. 303',time:'en 15 min'},
  {id:'a4',sev:'watch',title:'Ronda programada',sub:'Pisos 3 y 4 · Vence en 20 min',time:'pendiente'},
];

const MEDS_DATA = [
  {ico:'lav',icn:'ti-pill',name:'Metformina 500mg',pat:'Luis Peña · Hab. 303B',time:'14:30',sub:'en 15 min',cls:'soon'},
  {ico:'mint',icn:'ti-droplet',name:'Omeprazol 20mg',pat:'María Rodríguez · 301A',time:'15:00',sub:'en 45 min',cls:'soon'},
  {ico:'peach',icn:'ti-needle',name:'Insulina NPH 10 UI',pat:'Juan Castro · 302A',time:'16:00',sub:'en 1h 45m',cls:'ok'},
  {ico:'lav',icn:'ti-pill',name:'Ibuprofeno 400mg',pat:'Ana Corredor · 304A',time:'16:00',sub:'en 1h 45m',cls:'ok'},
  {ico:'mint',icn:'ti-droplet',name:'Captopril 25mg',pat:'Carlos Mora · 305C',time:'14:45',sub:'en 30 min',cls:'soon'},
];

const HIST_DATA = [
  {name:'Omeprazol 20mg',pat:'Juan Castro · Hab. 302A',time:'14:02',nurse:'Enf. Suárez'},
  {name:'Metformina 500mg',pat:'Luis Peña · Hab. 303B',time:'13:45',nurse:'Enf. Suárez'},
  {name:'Ibuprofeno 400mg',pat:'Ana Corredor · Hab. 304A',time:'13:00',nurse:'Enf. Suárez'},
  {name:'Enalapril 10mg',pat:'Luis Peña · Hab. 303B',time:'12:30',nurse:'Enf. García'},
  {name:'Omeprazol 20mg',pat:'María Rodríguez · Hab. 301A',time:'12:00',nurse:'Enf. García'},
  {name:'Insulina NPH 10U',pat:'Juan Castro · Hab. 302A',time:'11:30',nurse:'Enf. García'},
  {name:'Captopril 25mg',pat:'Carlos Mora · Hab. 305C',time:'10:00',nurse:'Enf. García'},
];

const chipMap = {ok:'ok', warn:'warn', watch:'watch'};
const chipLbl = {ok:'Estable', warn:'Alerta', watch:'Observar'};
