import React from 'react';

class HomeComponent extends React.Component {
    render() {
        return (
          <div>
            Hello World form home {this.props.name}
          </div>
        );
      }
}

export default HomeComponent;