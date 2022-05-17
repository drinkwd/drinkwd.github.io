hexo.extend.injector.register('body_end', `
  <div id="aplayer" style="right: 0;"></div>
  <link defer rel="stylesheet" href="https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.css" />
  <script src="https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.js"></script>
  <script defer src="/js/music.js"></script>
`);