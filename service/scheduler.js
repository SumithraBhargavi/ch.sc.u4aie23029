function selectVehicles(vehicles, maxHours) {
  // sort by best impact per hour
  vehicles.sort((a, b) => (b.Impact / b.Duration) - (a.Impact / a.Duration));

  let totalTime = 0;
  let totalImpact = 0;
  let selected = [];

  for (let v of vehicles) {
    if (totalTime + v.Duration <= maxHours) {
      selected.push(v);
      totalTime += v.Duration;
      totalImpact += v.Impact;
    }
  }

  return {
    selected,
    totalTime,
    totalImpact,
  };
}

module.exports = selectVehicles;