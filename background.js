'use strict';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === 'start') {
    startTimer();
  }
  else if (message.action === 'stop') {
    clearTimer();
  }


  function startTimer() {
    const minutes = 0.5;
    chrome.action.setBadgeText({ text: 'OPEN' });
    chrome.alarms.create('work', { delayInMinutes: minutes });
    chrome.storage.sync.set({ minutes: minutes });
  }

  function clearTimer() {
    chrome.action.setBadgeText({ text: '' });
    chrome.alarms.clearAll();
  }
});


chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.action.setBadgeText({ text: '' });

  if (!alarm || !alarm.name) {
    return;
  }

  if (alarm.name === 'work') {
    // 20-minute timer finished notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/closed800.png',
      title: 'Time to Rest',
      message: "Time's up! Stare far away (at least 20 feet)!",
    });

    // schedule 20-second timer
    chrome.action.setBadgeText({ text: 'REST' });

    // chrome.alarms.create('rest', { delayInMinutes: 20/60 }); //not working

    // not very reliable but not that important.. (if its 19 or 21 secs)
    setTimeout(() => {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/open800.png',
        title: 'Start working again!',
        message: "Time's up! Continue!",
      });
      
      chrome.action.setBadgeText({ text: 'OPEN' });
      chrome.alarms.create('work', { delayInMinutes: 20 });
    }, 20000);
  }
  
  // else if (alarm.name === 'rest') {
  //   // 20-second timer finished notification
  //   chrome.notifications.create({
  //     type: 'basic',
  //     iconUrl: 'icons/open800.png',
  //     title: 'Start working again!',
  //     message: "Time's up! Continue!",
  //   });

  //   // schedule 20-minute timer
  //   chrome.action.setBadgeText({ text: 'WORK' });
  //   chrome.alarms.create('work', { delayInMinutes: 20 });
  // }
});
