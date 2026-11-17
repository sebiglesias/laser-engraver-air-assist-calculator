
function calcAirAssist() {
  const laser = document.getElementById('laserType').value;
  const mode = document.getElementById('processMode').value;
  const nozzle = parseFloat(document.getElementById('nozzleSize').value) || 2.0;
  const len = parseFloat(document.getElementById('airlineLength').value) || 10;

  let baseLpm = 30; // Liters per minute
  let basePsi = 12;
  let pumpType = "Quiet Diaphragm Pump (35W - 45W)";
  let char = "Clean Minimal Charring";

  if (mode === 'cut_thick') {
    baseLpm = 65;
    basePsi = 22;
    pumpType = "High-Output Diaphragm Pump (65W - 80W)";
    char = "Crisp, Zero-Char Edge (Deep Kerf Cleared)";
    if (laser === 'co2_100') {
      baseLpm = 95;
      basePsi = 30;
      pumpType = "Oilless Quiet Compressor (1.0 HP / 2-Gal)";
    }
  } else if (mode === 'cut_thin') {
    baseLpm = 45;
    basePsi = 15;
    pumpType = "Quiet Diaphragm Pump (45W - 55W)";
    char = "Smooth Polished Acrylic / Clean Wood";
  } else if (mode === 'engrave') {
    baseLpm = 15;
    basePsi = 5;
    pumpType = "Low-Flow Diaphragm (15W - 25W)";
    char = "Lens Protected, Smudge-Free Surface";
  }

  // Tubing friction loss compensation
  if (len > 15) {
    basePsi += Math.round((len - 15) * 0.25);
  }

  const cfm = (baseLpm * 0.0353147).toFixed(1);

  document.getElementById('resPumpLpm').textContent = baseLpm + ' L/min (' + cfm + ' CFM)';
  document.getElementById('resNozzlePsi').textContent = basePsi + ' – ' + (basePsi + 4) + ' PSI';
  document.getElementById('resPumpType').textContent = pumpType;
  document.getElementById('resCharRating').textContent = char;
}

document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', calcAirAssist);
  el.addEventListener('change', calcAirAssist);
});
window.addEventListener('DOMContentLoaded', calcAirAssist);
        