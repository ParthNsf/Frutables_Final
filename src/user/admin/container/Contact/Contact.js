import React from 'react'
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';



let contactSchema = object({
    name: string().required(),
    email: string().required().email(),
    message: string().required().min(5,'Too Short!').max(1000,'Too Long!'),
});

const Contact = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validationSchema: contactSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik

    return (
        <>
            <div>
                {/* Modal Search Start */}
                <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content rounded-0">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body d-flex align-items-center">
                                <div className="input-group w-75 mx-auto d-flex">
                                    <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal Search End */}
                {/* Single Page Header start */}
                <div className="container-fluid page-header py-5">
                    <h1 className="text-center text-white display-6">Contact</h1>
                    <ol className="breadcrumb justify-content-center mb-0">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item active text-white">Contact</li>
                    </ol>
                </div>
                {/* Single Page Header End */}
                {/* Contact Start */}
                <div className="container-fluid contact py-5">
                    <div className="container py-5">
                        <div className="p-5 bg-light rounded">
                            <div className="row g-4">
                                <div className="col-12">
                                    <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                                        <h1 className="text-primary">Get in touch</h1>
                                        <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="h-100 rounded">
                                        <iframe className="rounded w-100" style={{ height: 400 }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <form onSubmit={handleSubmit}>
                                        <input name="name" onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" className="w-100 form-control border-0 py-3 mb-4" placeholder="Your Name" />
                                        <span className="text-danger" >{errors.name && touched.name ? errors.name : ''}</span>
                                        <input name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" className="w-100 form-control border-0 py-3 mb-4" placeholder="Enter Your Email" />
                                        <span className="text-danger">{errors.email && touched.email ? errors.email : ''}</span>
                                        <textarea name="message" onBlur={handleBlur} onChange={handleChange} value={values.message} className="w-100 form-control border-0 mb-4" rows={5} cols={10} placeholder="Your Message" defaultValue={""} />
                                        <span className="text-danger">{errors.message && touched.message ? errors.message : ''}</span>
                                        <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit">Submit</button>
                                    </form>
                                </div>
                                <div className="col-lg-5">
                                    <div className="d-flex p-4 rounded mb-4 bg-white">
                                        <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                                        <div>
                                            <h4>Address</h4>
                                            <p className="mb-2">123 Street New York.USA</p>
                                        </div>
                                    </div>
                                    <div className="d-flex p-4 rounded mb-4 bg-white">
                                        <i className="fas fa-envelope fa-2x text-primary me-4" />
                                        <div>
                                            <h4>Mail Us</h4>
                                            <p className="mb-2">info@example.com</p>
                                        </div>
                                    </div>
                                    <div className="d-flex p-4 rounded bg-white">
                                        <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                                        <div>
                                            <h4>Telephone</h4>
                                            <p className="mb-2">(+012) 3456 7890</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Contact End */}
                {/* Copyright Start */}
                <div className="container-fluid copyright bg-dark py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                <span className="text-light"><a href="#"><i className="fas fa-copyright text-light me-2" />Your Site Name</a>, All right reserved.</span>
                            </div>
                            <div className="col-md-6 my-auto text-center text-md-end text-white">
                                {/*/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. *** /*/}
                                {/*/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, *** /*/}
                                {/*/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". *** /*/}
                                Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a> Distributed By <a className="border-bottom" href="https://themewagon.com">ThemeWagon</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Copyright End */}
            </div>

        </>
    )
}

export default Contact
