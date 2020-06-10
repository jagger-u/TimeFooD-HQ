function GetDaysInMonth(y, m) {
  return 32 - new Date(y, m, 32).getDate();
}
