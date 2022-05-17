!(function() {
    var oldLoadAp = window.onload;
    window.onload = function () {
      oldLoadAp && oldLoadAp();
  
      new APlayer({
        container: document.getElementById('aplayer'),
        fixed: true,
        autoplay: false,
        loop: 'all',
        order: 'random',
        theme: '#b7daff',
        listFolded: true,
        preload: 'auto',
        audio: [
          {
            name: '余香',
            artist: '张小九',
            url: 'http://music.163.com/song/media/outer/url?id=487885426.mp3',
            cover: '/img/favicon.png',
          },{
            name: '别再闹了',
            artist: '毛不易',
            url: 'http://music.163.com/song/media/outer/url?id=1334270281.mp3',
            cover: '/img/favicon.png',
          }
        ]
      });
    }
  })();