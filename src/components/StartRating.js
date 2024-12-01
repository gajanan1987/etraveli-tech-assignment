import StarRatings from "react-star-ratings";

export const StartRating = (props) => {
 const {rating, starsize, starspace} = props;
 const starRate = Number(rating?.split('/')[0]);
  return (
    <StarRatings
      rating={starRate || 0}
      starRatedColor="rgb(252, 207, 33)"
      numberOfStars={10}
      name="rating"
      starDimension={starsize || "20px"}
      starSpacing={starspace || "3px"}
    />
  );
}
