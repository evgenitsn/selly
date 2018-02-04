import React from 'react'
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card'

const DisplayCard = ({ ads, adKey }) => (
  <Card key={adKey} style={styles.card}>
    <CardHeader title={ads[adKey]['title']} subtitle={ads[adKey]['category']} />
    <CardText>{ads[adKey]['price']}</CardText>
  </Card>
)

const styles = {
  card: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
}

export default DisplayCard
