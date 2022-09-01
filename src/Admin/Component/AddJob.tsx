import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import { useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import Navabar from '../../Layouts/AdminNavbar';
import { RootUserState, usersFeatureKey } from '../../Redux/User/user.slice';
import { AppDispatch } from '../../Redux/Store';
import { useDispatch } from 'react-redux';
import * as jobActions from "../../Redux/AdminJob/job.actions";
import { ToastUtil } from '../../Util/ToastUtil';

interface IProps {
}

let AddJob: React.FC<IProps> = ({}) => {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const adminState = useSelector((state: RootUserState) => {
        return state[usersFeatureKey];
    });

    let {user} = adminState;

    const [validated, setValidated] = useState(false);

    const [job, setJobs] = useState<any>({
        title: "",
        company: "",
        location: "",
        description: "",
        experiance: "",
        skills: "",
    });

    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJobs((prevState: any) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {

            dispatch(jobActions.addJobAction(job)).then((response: any) => {
                
                if (response.error) {
                    ToastUtil.displayErrorToast(response.error.message);
                } else {
                    ToastUtil.displaySuccessToast('Job is Added Successfully!');
                    navigate('/admin/jobs');
                }
            })
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    
    return (
        <>
            <div className="landing1">
            <Navabar/>  
            <br />
            <div className="grid">
                <div className="container divMargin">
            <Container>
                <Row>
                    <Col>
                        <h3 className="text-success">
                            <i className="fa fa-black-tie"></i> Add Job
                        </h3>
                    </Col>
                </Row>

                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Title</InputGroup.Text>
                                <Form.Control
                                    value={job.title}
                                    name={'title'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="Title"
                                    required
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Title.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Company</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={job.company}
                                    name={'company'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="Company"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Company.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Location</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={job.location}
                                    name={'location'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="Location"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Location.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1" className="bg-light-green text-dark">Skills</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={job.skills}
                                    name={'skills'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="Skills"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Skils.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1" className="bg-light-green text-dark">Experiance</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={job.experiance}
                                    name={'experiance'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="Experiance"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Skils.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Description</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={job.description}
                                    name={'description'}
                                    onChange={updateInput}
                                    as="textarea" rows={3}
                                    placeholder="Description"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Description.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <Button variant="success" type="submit" className="me-1">
                                Add Job
                            </Button>
                            <Link to={'/admin/jobs'}>
                                <Button variant="dark" type="button">
                                    Cancel
                                </Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
            </div>
            </div>
            </div>
        </>
    )
};
export default AddJob;