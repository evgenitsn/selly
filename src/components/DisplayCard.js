import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const DisplayCard = ({ ads, adKey, onClick }) => (
  <Card key={adKey} style={styles.card} onClick={() => onClick()}>
    <CardHeader title={ads[adKey]['title']} titleStyle={{fontSize: 25, paddingBottom: 5}} textStyle={{fontSize: 25}}/>
    <CardText>
      <p>Category: {ads[adKey]['category']}</p>
      <p>Price: {ads[adKey]['price']}</p>
      <p>Location: {ads[adKey]['location']}</p>
      <p>Contact: {ads[adKey]['contactName']}</p>
    </CardText>
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
