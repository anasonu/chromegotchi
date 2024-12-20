import { MAX_HEARTS } from "../types/Chromegotchi";

function getHearts (currentValue: number) {
  const arr = [];
  for (let i = 0; i < MAX_HEARTS; i++ ) {
    const img = i < currentValue ? "/full-heart.png" : "/empty-heart.png";
    arr.push(<img key={i} className="heart" src={process.env.PUBLIC_URL + img} alt="Heart" />)
  }
  return arr;
}

export default getHearts;