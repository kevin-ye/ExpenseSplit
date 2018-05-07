import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Menu, Grid, Divider, Segment, Container } from 'semantic-ui-react'

class ESTitleBar extends Component {
  render() {
    return (
      <Menu stackable> 
        <Menu.Item header>Expense Split</Menu.Item>
        <Menu.Item name='About'/>
      </Menu>
    );
  }
}

class ESMainBody extends Component {
  render() {
    return (
      <Grid padded>
        <Grid.Column style={{width: '300px'}}>
          <ESSideBar eventName={"test"}/>
        </Grid.Column>
        <Grid.Column width={13}>
          <ESMainPanel/>
        </Grid.Column>
      </Grid>
    );
  }
}

class ESSideBar extends Component {

  render() {
    return (
      <Menu vertical>
        <Menu.Item>
          {this.props.eventName}
        </Menu.Item>
      </Menu>
    );
  }
}

ESSideBar.propTypes = {
  eventName: PropTypes.string
};

class ESMainPanel extends Component {
  render() {
    return (
      <Container fluid>
        <Menu attached='top' tabular>
          <Menu.Item name='Transactions' active={true}>
          </Menu.Item>
          <Menu.Item name='Splitting'>
          </Menu.Item>
        </Menu>

        <Segment attached='bottom'>
          <p>test</p>
        </Segment>
      </Container>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Grid padded>
        <Grid.Column>
          <Grid.Row>
            <ESTitleBar/>
          </Grid.Row>
          <Divider hidden/>
          <Grid.Row>
            <ESMainBody/>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;