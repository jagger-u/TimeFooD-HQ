


function changeBinWidth(TA, id, slider) {
  defaultBinWidth = slider.value*10;
  let ALL_DAYS = createDayPeriods(TA.value);  
  refreshHistogram(ALL_DAYS, id);
}
function changeNumBins(TA, id, slider) {
  defaultNumBins = slider.value;
  let ALL_DAYS = createDayPeriods(TA.value);  
  refreshHistogram(ALL_DAYS, id);
}
function chngBinWidth(slider) {
  defaultBinWidth = slider.value*10;
  let AVG_DAYS = generateThirdDAYS();
  refreshHistogram(AVG_DAYS, id3);
}
function chngNumBins(slider) {
  defaultNumBins = slider.value;
  let AVG_DAYS = generateThirdDAYS();
  refreshHistogram(AVG_DAYS, id3);
}


