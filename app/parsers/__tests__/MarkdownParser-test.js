'use strict';

jest.dontMock('../MarkdownParser');
jest.dontMock('snuownd');

describe('markdown parser', function() {

  var parser = require('../MarkdownParser');

  it('doesnt render scripts', function() {
    var result = parser.render('<script type="text/javascript"></script>');

    expect(result).not.toContain('<script');
    expect(result).not.toContain('</script');
  });

  describe('adds _blank target to links', function() {
    it('with content', function() {
      var result = parser.render('[LINK](https://uhc.gg)');

      expect(result).toContain('<a href="https://uhc.gg" target="_blank">LINK</a>')
    });

    it('autolinked', function() {
      var result = parser.render('https://uhc.gg');

      expect(result).toContain('<a href="https://uhc.gg" target="_blank">https://uhc.gg</a>')
    });
  });

});
