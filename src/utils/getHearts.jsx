const MAX_HEARTS = 5;

function getHearts (currentValue) {
  const arr = [];
  for (let i = 0; i < MAX_HEARTS; i++ ) {
    const img = i < currentValue ? "/gotchi/full-heart.png" : "/gotchi/empty-heart.png";
    arr.push(<img key={i} className="heart" src={process.env.PUBLIC_URL + img} alt="Heart" />)
  }
  return arr;
}

export default getHearts;