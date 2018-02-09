import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const DisplayCard = ({ ads, adKey, onClick }) => (
  <Card key={adKey} style={styles.card} onClick={() => onClick()}>
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
