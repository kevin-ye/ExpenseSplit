import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Menu, Grid, Divider, Segment, Container, List, Button } from 'semantic-ui-react'

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
      <Menu vertical fluid pointing>
        <Menu.Item>
          <h2>{this.props.eventName} </h2>
        </Menu.Item>
        <Divider />
        <Menu.Item active color='green'>
          View transactions
        </Menu.Item>
        <Menu.Item color='green'>
          View Report
        </Menu.Item>
      </Menu>
    );
  }
}

ESSideBar.propTypes = {
  eventName: PropTypes.string
}

const TransactionItem = (props) => {
  return (
    <List.Item>
      <List.Content floated='right'>
        <Button>Edit</Button>
      </List.Content>
      <List.Content>
        <List.Header>{props.itemHeader}</List.Header>
        {props.itemDetail}
      </List.Content>
    </List.Item>
  );
}

TransactionItem.propTypes = {
  itemHeader: PropTypes.string,
  itemDetail: PropTypes.string
}

class ESMainPanel extends Component {

  constructor(props) {
    super(props);
    this.testListItems = [
      { header: 'header1', detail: 'detail1' },
      { header: 'header2', detail: 'detail2' },
      { header: 'header3', detail: 'detail3' },
      { header: 'header4', detail: 'detail4' },
      { header: 'header5', detail: 'detail5' }
    ];
  }

  refreshTransactions() {}

  changeSelectedEvent(newID) {
    this.selectedEvent = newID();
  }

  render() {

    return (
      <Container fluid>
        <Segment>
          <Menu fluid>
            <Menu.Item>
            <Button primary>Add</Button>
            </Menu.Item>
          </Menu>
          <List celled verticalAlign='middle'>
            {
              this.testListItems.map((item, index) => 
                <TransactionItem key={index} itemHeader={item.header} itemDetail={item.detail} />
              )
            }
          </List>
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