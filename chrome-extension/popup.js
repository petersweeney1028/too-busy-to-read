document.getElementById('save-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.storage.sync.get('articles', (data) => {
        const articles = data.articles || [];
        articles.push({ url: tab.url, title: tab.title, date: new Date() });
        chrome.storage.sync.set({ articles });
        alert('Article Saved!');
      });
    });
  });
  