import {useState} from "react";
import RestaurantDataService from "../services/restaurant";
import {Link} from "react-router-dom";

const AddReview = (props) => {

    let initialReviewsState = ""

    let editing = false;

    if (props.location.state && props.location.state.currentReview) {
        editing = true;
        initialReviewsState = props.location.state.currentReview.text
    }

    const [review, setReview] = useState(initialReviewsState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        setReview(e.target.value)
    }

    const saveReview = () => {
        let data = {
            restaurant_id: props.match.params.id,
            text: review,
            user_id: props.user.id,
            name: props.user.name,


        };


        if (editing) {
            console.log(data);
        data.review_id = props.location.state.currentReview.review_id
        RestaurantDataService.updateReview(data)
            .then(res =>{
                setSubmitted(true);
                console.log(res.data);
            })
            .catch(e =>{
                console.log(e);
            })
    }else{
        RestaurantDataService.createReview(data)
            .then(res =>{
                setSubmitted(true);
                console.log(res.data);
            })
            .catch(e =>{
                console.log(e);
            })
    }
}

    return(
        <div>
            {props.user ? (
                <div className="submit-form">
                    {submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <Link to={"/restaurants/" + props.match.params.id} clasName="btn btn-success">
                                Back to Restaurant
                            </Link>
                        </div>
                    ):(
                        <div>
                            <div className="form-group">
                                <label htmlFor="description">{editing ? "Edit" : "Create"}</label>
                                <input
                                type="text"
                                className="form-control"
                                id="text"
                                required
                                value={review}
                                onChange={handleInputChange}
                                name="text"
                                />
                            </div>
                            <button onClick={saveReview} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            ):(
                <div>
                    Please log in.
                </div>
            )}
        </div>
    )


}



export default AddReview;
