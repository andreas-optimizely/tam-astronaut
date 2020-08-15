var urlParams = new URLSearchParams(window.location.search);

function getId() {
  var key = 'optimizely-ctf-userId'
  var userId = localStorage.getItem(key);
  if (!userId) {
    userId = String(Math.random());
    localStorage.setItem(key, userId);
  }
  var overrideUserId = urlParams.get('userId')
  return overrideUserId || userId;
}

function getAttributes() {
  return {
    table: Number(urlParams.get('table')),
    row: Number(urlParams.get('table')),    // For now, use table # for both tables and rows
    vip: urlParams.get('vip') == 'true',
    column: Number(urlParams.get('column')),
  }
}

var optimizely = optimizelySdk.createInstance({
  sdkKey: urlParams.get('sdkKey') || 'RtnanFnZ8SJy5V6eDoDJJE',
  datafileOptions: {
    autoUpdate: true,
    updateInterval: 5000 // 5 seconds in milliseconds
  },
})

function updatePage() {

  //replace with Optimizely feature flag
  var enabled = false;

  var flag = document.getElementById('astronaut');
  if (enabled) {
    flag.style.display = "block";
  } else {
    flag.style.display = "none";
  }
  
  
  if (enabled) {
    // replace with height variable
    var height = 0;
    flag.style.height = `${height}%`;
  }
}

optimizely.onReady().then(updatePage);
optimizely.notificationCenter.addNotificationListener(
  optimizelySdk.enums.NOTIFICATION_TYPES.OPTIMIZELY_CONFIG_UPDATE,
  updatePage
);