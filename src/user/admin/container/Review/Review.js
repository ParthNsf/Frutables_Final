import { useParams } from 'react-router-dom'
import { object, string, number, date, InferType } from 'yup';
import { useState } from 'react'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { editReview, feedbackData, removeReview } from '../../../../redux/Action/review.action';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const Review = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const getFeedback = useSelector((state) => state.feedBackServer)
    // console.log(getFeedback);

    const [update, setupdate] = useState(false);

    let feedbackSchema = object({
        entername: string().required(),
        enteremail: string().required().email(),
        entermessage: string().required().min(5, 'Too Short!').max(100, 'Too Long!'),
    });

    const formik = useFormik({
        initialValues: {
            entername: '',
            enteremail: '',
            entermessage: '',
            rating: '',
        },
        validationSchema: feedbackSchema,
        onSubmit: async (values) => {
            const dateofreview = new Date()
            if (update) {
                dispatch(editReview(values))
                setupdate(false)
            } else {
                dispatch(feedbackData({ ...values, productId: id, dating: dateofreview }))
            }
            formik.resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik

    const editReviewData = (data) => {
        formik.setValues(data)
        setupdate(true)
    }

    const removeReviewData = (id) => {
        dispatch(removeReview(id))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="border-bottom rounded">
                            <input
                                type="text"
                                className="form-control border-0 me-4"
                                name="entername"
                                placeholder="Your Name *"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.entername}
                            />
                            <span className="text-danger" >{errors.entername && touched.entername ? errors.entername : ''}</span>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="border-bottom rounded">
                            <input
                                type="email"
                                className="form-control border-0"
                                name="enteremail"
                                placeholder="Your Email *"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.enteremail}
                            />
                            <span className="text-danger" >{errors.enteremail && touched.enteremail ? errors.enteremail : ''}</span>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="border-bottom rounded my-4">
                            <textarea
                                id="entermessage"
                                className="form-control border-0"
                                name="entermessage"
                                cols={30}
                                rows={8}
                                placeholder="Your Review *"
                                spellCheck="false"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.entermessage}
                            />
                            <span className="text-danger" >{errors.entermessage && touched.entermessage ? errors.entermessage : ''}</span>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 me-3">Please rate:</p>
                        <div className="d-flex align-items-center" style={{ fontSize: 12 }}>
                            <Stack spacing={1}>
                                <Rating
                                    defaultValue={0}
                                    precision={0.5}
                                    id="rating"
                                    name="rating"
                                    value={values.rating}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Stack>
                            <span className="text-danger" >{errors.rating && touched.rating ? errors.rating : ''}</span>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="d-flex justify-content-between py-3 mb-5">
                            <button className="btn border border-secondary text-primary rounded-pill px-4 py-3" type="submit">Post Comment</button>
                        </div>
                    </div>
                </div>
            </form>


            <div className="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                {getFeedback.feedback.map((feedback, index) => {
                    if (feedback.productId === id) {
                        return (
                            <>
                                <div className="" key={index}>
                                    <p className="mb-2" style={{ fontSize: 14 }}>{feedback.dating}</p>
                                    <div className="d-flex justify-content-between">
                                        <h5>{feedback.entername}</h5>
                                        <div className="d-flex mb-3">
                                            <Rating name="read-only" value={feedback.rating} readOnly />
                                        </div>
                                    </div>
                                    <p>{feedback.entermessage}</p>
                                </div>
                                <button onClick={() => editReviewData(feedback)}>edit</button>
                                <button onClick={() => removeReviewData(feedback.id)}>delete</button>
                            </>
                        );
                    }
                    return null;
                })}


            </div>
        </>
    )
}

export default Review
