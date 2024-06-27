chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token)
        .then(response => response.json())
        .then(userInfo => {
          console.log(userInfo);
          // Save URL
          chrome.storage.sync.get('articles', (data) => {
            const articles = data.articles || [];
            articles.push({ url: tab.url, title: tab.title, date: new Date() });
            chrome.storage.sync.set({ articles });
          });
        });
    });
  });
  