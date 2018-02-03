import React from 'react'
import { PropTypes } from 'prop-types'

import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card'

const Post = ({ username, date, avatar, image, description }) => {
  //Probably will pass ID of the post for the onClick Event here
  return (
    <Card style={styles.cardContainer} onClick={e => console.log(e.target)}>
      <CardHeader title={username} subtitle={date} avatar={avatar} />
      <CardMedia>
        <img src={image} alt="" />
      </CardMedia>
      <CardText>{description}</CardText>
    </Card>
  )
}

export default Post

Post.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

const styles = {
  cardContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30
  }
}
