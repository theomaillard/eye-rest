'use strict';

function startAlarm() {
  chrome.runtime.sendMessage({ action: 'start' });
  window.close();
}

function clearAlarm() {
  chrome.runtime.sendMessage({ action: 'stop' });
  window.close();
}

document.getElementById('start').addEventListener('click', startAlarm);
document.getElementById('stop').addEventListener('click', clearAlarm);