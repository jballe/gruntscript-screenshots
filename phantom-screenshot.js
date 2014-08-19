var page = require('webpage').create();
var system = require('system');

if(system.args.length != 4) {
  console.log('Usage: URL filename windowsize');
  phantom.exit(1);
} else {
  var url = system.args[1];
  var file = system.args[2];

  var pageWidth, pageHeight;

  var size = system.args[3].split('*');
  if(size.length == 2) {
      pageWidth = parseInt(size[0], 10);
      pageHeight = parseInt(size[1], 10);
      page.viewportSize = { width: pageWidth, height: pageHeight };
      page.clipRect = { top: 0, left: 0, width: pageWidth, height: pageHeight };
  } else {
      pageWidth = parseInt(system.args[3], 10);
      pageHeight = parseInt(pageWidth * 3/4, 10); // it's as good an assumption as any
      page.viewportSize = { width: pageWidth, height: pageHeight };
  }

  page.open(url, function(status) {
    if (status !== 'success') {
      console.log('Unable to load the address!' + status);
      phantom.exit(1);
    } else {
      window.setTimeout(function() {
        page.render(file);
        phantom.exit();
      }, 200);
    }
  });
}
