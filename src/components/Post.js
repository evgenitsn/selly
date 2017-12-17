import React, { Component } from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';

export default class Post extends Component {
  render() {
    return (
      <Card style={styles.cardContainer}>
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          avatar={require('../assets/Avatar.png')}
        />
        <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
          <img src={require('../assets/Sofia.jpg')} alt="" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    )
  }
}

const styles = {
  cardContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30
  }
}