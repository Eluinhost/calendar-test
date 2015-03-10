'use strict';

var React = require('react/addons');
var _ = require('lodash');

class MatchPostItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: MatchPostItem.colors[_.random(0, MatchPostItem.colors.length)]
    }
  }
  render() {
    return (
      <div className={'ui card ' + this.state.color}>
        <div className="content">
          <div className="center aligned header">ShutUpNestorio's #22 FFA 2 Allies Cutclean Genie BestPvE Rewarding Longshots [40 Slots]</div>
        </div>
        <div className="extra content">
          <div className="left floated header">
            Mar 10 - 21:30
          </div>
          <div className="right floated">
            <i className="ui clock icon" /> 2 hours
            <br />
            <i className="ui toggle right icon" /> 3 hours
          </div>
        </div>
        <div className="extra content">
          <div className="left floated">
            <i className="ui globe icon" /> EU
          </div>
          <div className="right floated">
            192.168.1.1 <i className="ui plug icon" />
          </div>
        </div>

        <div className="extra content">
          <div className="left floated">
              <i className="ui clock icon" /> 2 hours
              <br />
              <i className="ui toggle right icon" /> 3 hours
          </div>
          <div className="right floated">
            ShutUpNestorioAlt <i className="ui user icon" />
          </div>
        </div>
      </div>
    );
  }
}
MatchPostItem.colors = ['black', 'blue', 'green', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow'];


class MatchPostListing extends React.Component {
  render() {
    return <div className="ui two doubling cards">{this.props.data.map((item, index) => <MatchPostItem key={index} />)}</div>;
  }
}

module.exports = MatchPostListing;
