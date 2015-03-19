'use strict';

import React from 'react/addons';
import {MarkdownParser} from '../parsers';

class MarkdownView extends React.Component {
  render() {
    return <span className="markdown" dangerouslySetInnerHTML={{__html: MarkdownParser.render(this.props.markdown)}} />
  }
}
MarkdownView.propTypes = {
  markdown: React.PropTypes.string.isRequired
};

module.exports = MarkdownView;
