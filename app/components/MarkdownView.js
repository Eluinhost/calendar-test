'use strict';

import React from 'react/addons';
import SnuOwnd from 'snuownd';

var Parser = SnuOwnd.getParser();

class MarkdownView extends React.Component {
  render() {
    var rendered = Parser.render(this.props.markdown);
    return <span className="markdown" dangerouslySetInnerHTML={{__html: rendered}} />
  }
}
MarkdownView.propTypes = {
  markdown: React.PropTypes.string.isRequired
};

module.exports = MarkdownView;
