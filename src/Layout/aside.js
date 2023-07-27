import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { AxiosBaseURL, Error_handling, Success_handling, CallAlert, TimeSince, HandleCheckboxChange } from '../utils/httpCommon';
import { useCookies } from "react-cookie";
import ToDoList from './Todo/to_do_list';
import Search from './Todo/search';

function Aside() {
    const $ = require('jquery');
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [project, setProject] = useState([]);
    const [selected, setSelected] = useState();
    const [toggle, setToggle] = useState('');
    const [currentTab, setCurrentTab] = useState("1");
    const [tag, setTag] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: toDoRegister, formState: { errors: toDoErrors }, handleSubmit: toDoHandleSubmit } = useForm({ mode: "onBlur" });
    const [lists, setlists] = useState([])
    const [inputData, setInputData] = useState({});
    const [searchResults, setSearchResults] = useState([])

    const [modalEditMode, setModalEditMode] = useState(false);

    const saveProjectName = (inputs) => {
        try {
            let data = { s_project_name: inputs.s_project_name };
            AxiosBaseURL({
                url: '/api/project/upcoming_projects',
                method: 'POST',
                data: data,
                headers: { 'Authorization': `Bearer ${cookies.token}` }
            })
                .then((response) => {
                    $("#s_project_name").val('');
                    CallAlert('success', Success_handling(response));
                })
                .catch(function (error) {
                    CallAlert('error', Error_handling(error), 5000);
                })
                .finally(function () {
                    setTag(true);
                    console.log('Completed 2');
                });
        } catch (error) {
            CallAlert('error', Error_handling(error), 3000);
        }
    }

    useEffect(() => {
        setTag(false);
        getLoadProjectData();
    }, [tag]);

    useEffect(() => {
        chnageTab(currentTab);
    }, [currentTab]);

    useEffect(() => {
        if (inputData.length > 0) {
            $('#newtodo_').click();
            $(".add-todo").hide();
            $(".update-todo").show();
            let rec = inputData[0];
            rec.n_star = rec.n_star === 0 ? false : true;
            rec.n_imp = rec.n_imp === 0 ? false : true;
            debugger;
            setInputData(rec);
            return;
        }
    }, [inputData])

    const getLoadProjectData = () => {
        try {
            AxiosBaseURL({
                url: '/api/project/get_project_lists',
                method: 'POST',
                headers: { 'Authorization': `Bearer ${cookies.token}` }
            })
                .then((response) => {
                    setProject(response.data.body);
                })
                .catch(function (error) {
                    CallAlert('error', Error_handling(error), 5000);
                })
                .finally(function () {
                    console.log('Completed 1');
                });
        } catch (error) {
            CallAlert('error', Error_handling(error), 3000);
        }
    };

    const chnageStatus = (e) => {
        setSelected(e.target.selectedOptions[0].className);
    };

    const changeMenu = (para) => {
        setToggle(para);
    };

    const chnageTab = (tab) => {
        setCurrentTab(tab);
        let data = {
            tab: tab
        };
        AxiosBaseURL({
            url: '/api/project/get_todos_by_login_id',
            method: 'POST',
            data: data,
            headers: { 'Authorization': `Bearer ${cookies.token}` }
        })
            .then((response) => {
                setlists(response.data.body);
                setSearchResults(response.data.body);
            })
            .catch(function (error) {
                CallAlert('error', Error_handling(error), 5000);
            })
        /*    .finally(function () {
               console.log('Completed 1');
           }); */

    };

    const saveTodo = (todo) => {
        try {
            let data = {
                "s_title": todo.s_title,
                "s_desc": todo.s_desc,
                "n_star": todo.n_star,
                "n_imp": todo.n_imp,
            };
            AxiosBaseURL({
                url: '/api/project/add_todo',
                method: 'POST',
                data: data,
                headers: { 'Authorization': `Bearer ${cookies.token}` }
            })
                .then((response) => {
                    $("#s_title").val('');
                    $("#s_desc").val('');
                    setCurrentTab(currentTab);
                    CallAlert('success', Success_handling(response));
                })
                .catch(function (error) {
                    CallAlert('error', Error_handling(error), 5000);
                })
        } catch (error) {
            CallAlert('error', Error_handling(error), 3000);
        }
    };

    const updateTodo = () => {
        alert("l,")
    };

    const getOpenModal = () => {
        $(".add-todo").show();
        $(".update-todo").hide();
        $("#s_title").val("");
        $("#s_desc").val("");
        $("#n_imp").prop('checked',false);
        $("#n_star").prop('checked',false);
    }
    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    {/* <div className="container">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <form>
                                    <div className="input-group">
                                        <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here" />
                                        <div className="input-group-append">
                                            <button type="button" className="btn btn-sm btn-default">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h3 className="m-0"> Suzlon-hub <small>V1.0.0</small></h3>
                            </div>
                            <div className="col-sm-6">
                                <span className="breadcrumb float-sm-right">
                                Login :<b>&nbsp;Kamal Yadav</b>
                                </span>
                            </div>
                        </div>
                    </div> */}
                </div>


                <div className="content p-4">
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-9 order-2 order-md-1">
                            <div className="row">
                                <div className="col-12 col-sm-3">
                                    <div className="card card-primary card-outline" >
                                        <div className="card-body cardBody">
                                            <p className="card-text" style={{ textAlign: "center" }}>
                                                <i className='far fa-list-alt' style={{ fontSize: "52px" }}></i>
                                            </p>
                                        </div>
                                        <Link to="/bpm"><div className="card-footer cardFooter" style={{ textAlign: "center", fontSize: "16px", padding: 0 }}>BPM <small>V1.10.0</small></div></Link>

                                    </div>
                                </div>
                                <div className="col-12 col-sm-3">
                                    <div className="card card-primary card-outline">
                                        <div className="card-body cardBody">
                                            <p className="card-text" style={{ textAlign: "center" }}>
                                                <i className='fas fa-robot' style={{ fontSize: "52px" }}></i>
                                            </p>
                                        </div>
                                        <Link to='/rpa-dashboard'> <div className="card-footer cardFooter" style={{ textAlign: "center", fontSize: "16px", padding: 0 }}>RPA <small>V5.8.0</small></div></Link>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-3">
                                    <div className="card card-primary card-outline">
                                        <div className="card-body cardBody">
                                            <p className="card-text" style={{ textAlign: "center" }}>
                                                <i className='far fa-folder-open' style={{ fontSize: "52px" }}></i>
                                            </p>
                                        </div>
                                        <div className="card-footer cardFooter" style={{ textAlign: "center", fontSize: "16px", padding: 0 }}>DMS <small>V2.0.0</small></div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-3">
                                    <div className="card card-primary card-outline">
                                        <div className="card-body cardBody">
                                            <p className="card-text" style={{ textAlign: "center" }}>
                                                <i className='far fa-chart-bar' style={{ fontSize: "52px" }}></i>
                                            </p>
                                        </div>
                                        <div className="card-footer cardFooter" style={{ textAlign: "center", fontSize: "16px", padding: 0 }}>Insight <small>V1.9.0</small></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row row-eq-height">

                                <div className={`col-12 col-lg-2 mt-3 todo-menu-bar flip-menu pr-lg-0 ${toggle ? 'active' : ""}`}>
                                    <div className="card border h-100 todo-menu-section">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <button type='button' className="btn btn-sm btn-primary py-2 px-2 rounded" data-toggle="modal" data-target="#newtodo" id='newtodo_' onClick={getOpenModal}>
                                                <i className="icon-plus align-middle text-white"></i> <span>Add To-do</span>
                                            </button>
                                            <span className="d-inline-block d-lg-none mt-1" onClick={() => changeMenu('')}>
                                                <i className="far fa-window-close"></i>
                                            </span>
                                            <div className="modal fade" id="newtodo" aria-modal="true" style={{ display: "none" }}>
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">
                                                                <i className="icon-pencil"></i> Add Todo
                                                            </h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <i className="far fa-window-close"></i>
                                                            </button>
                                                        </div>
                                                        <form className="add-todo-form">
                                                            <div className="modal-body">

                                                                <div className="form-group">
                                                                    <label htmlFor="title" className="col-form-label">Title</label>
                                                                    <input type="text" className="form-control" id="s_title" name='s_title' value={inputData.s_title} {...toDoRegister("s_title", { required: true, maxLength: 200 })} />
                                                                    <span className='error'>
                                                                        {toDoErrors.s_title?.type === 'required' ? <b>Title  is required</b> : ''}
                                                                        {toDoErrors.s_title?.type === 'maxLength' ? <b>Title is not more  then 200 Letter </b> : ''}
                                                                    </span>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="description" className="col-form-label">Description</label>
                                                                    <textarea className="form-control" rows="10" id="s_desc" name='s_desc' value={inputData.s_desc} {...toDoRegister("s_desc", { required: true, maxLength: 800 })}></textarea>
                                                                    <span className='error'>
                                                                        {toDoErrors.s_desc?.type === 'required' ? <b>Description  is required</b> : ''}
                                                                        {toDoErrors.s_desc?.type === 'maxLength' ? <b>Description is not more  then 800 Letter </b> : ''}
                                                                    </span>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="chkbox">
                                                                        <input type="checkbox" className="chk" id="n_star" name='n_star' value={inputData.n_star} defaultChecked={inputData.n_star} {...toDoRegister("n_star")} />
                                                                        <span className="checkmark"></span>
                                                                        Starred
                                                                    </label>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="chkbox">
                                                                        <input type="checkbox" className="n_imp" id="n_imp" name='n_imp' value={inputData.n_imp} defaultChecked={inputData.n_imp} {...toDoRegister("n_imp")} />
                                                                        <span className="checkmark"></span>
                                                                        Important
                                                                    </label>
                                                                </div>

                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-primary add-todo" onClick={toDoHandleSubmit(saveTodo)}>Submit</button>
                                                                <button type="button" className="btn btn-primary update-todo" onClick={toDoHandleSubmit(updateTodo)}>Change & Save</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <ul className="nav flex-column todo-menu">
                                            <li className="nav-item">

                                                <Link to="#" className={`nav-link ${currentTab === '1' ? 'active' : ""}`} onClick={(key) => setCurrentTab('1')}>
                                                    <i className="fas fa-list-ol"></i> All
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="#" className={`nav-link ${currentTab === '2' ? 'active' : ""}`} onClick={(key) => setCurrentTab('2')}>
                                                    <i className="fas fa-star"></i> Starred
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="#" className={`nav-link ${currentTab === '3' ? 'active' : ""}`} onClick={(key) => setCurrentTab('3')}>
                                                    <i className="fas fa-exclamation"></i> Important
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="#" className={`nav-link ${currentTab === '4' ? 'active' : ""}`} onClick={(key) => setCurrentTab('4')}>
                                                    <i className="fas fa-check"></i> Completed
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="#" className={`nav-link ${currentTab === '5' ? 'active' : ""}`} onClick={(key) => setCurrentTab('5')} >
                                                    <i className="fas fa-trash"></i> Trashed
                                                </Link>
                                            </li>

                                        </ul>

                                    </div>
                                </div>
                                <div className="col-12 col-lg-10 mt-3 pl-lg-0">

                                    <div className="card border h-100 todo-list-section">
                                        <div className="card-header border-bottom p-1">
                                            <span className="d-inline-block d-lg-none flip-menu-toggle" onClick={() => changeMenu('active')}><i className="fas fa-bars"></i></span>
                                            <Search lists={lists} setSearchResults={setSearchResults} />
                                        </div>
                                        <div className="card-body p-0">
                                            <div className="slimScrollDiv" style={{ position: 'relative', overflow: 'hiden', width: 'auto', height: '500px' }}>
                                                <div className="scrollertodo" style={{ overflow: 'auto', width: 'auto', height: '500px' }}>
                                                    <ul className="todo-list">
                                                        <ToDoList searchResults={searchResults} currentTab={currentTab} chnageTab={chnageTab} lists={lists} setInputData={setInputData} />
                                                    </ul>
                                                </div><div className="slimScrollBar"></div>
                                                <div className="slimScrollRail"></div></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-3 order-1 order-md-2">
                            <h3 className="text-primary"><i className="fas fa-paint-brush"></i> Upcomming Project</h3>

                            <div className="text-muted">
                                <p className="text-sm">Client Company
                                    {/* <b className="d-block"></b> */}
                                    <b className="d-block">Compnay Logo</b>
                                </p>
                                <p className="text-sm">Project Leader
                                    <b className="d-block">KAMALKANT YADAV</b>
                                </p>
                                <hr />
                            </div>
                            <h5 className="mt-5 text-muted">Project List</h5>
                            <div className="text-center mt-1 mb-1">
                                <input type="text" className="form-control form-control-sm" placeholder="Project Name" name='s_project_name' id='s_project_name' {...register("s_project_name", { required: true, minLength: 5, maxLength: 30 })} />
                                <span className='error'>
                                    {errors.s_project_name?.type === 'required' ? <b>Project name is required</b> : '' ||
                                        errors.s_project_name?.type === 'minLength' || errors.s_project_name?.type === 'maxLength' ? <b>Text is more then 5 and less then 30 </b> : ''}
                                </span>
                            </div>
                            <div className="text-right mt-0 mb-1">
                                <button type="button" className="btn btn-sm btn-primary" onClick={handleSubmit(saveProjectName)}>Add Project</button>
                            </div>
                            <ul className="list-unstyled">
                                {project.map((ele, ind) => (
                                    <li className='text-secondary  animate__animated animate__slideInDown ' key={ind}>
                                        <i className="far fa-arrow-alt-circle-right"></i> {ele.s_project_name}
                                        <small > ~ {ele.s_created_by}</small>
                                        <small style={{ float: 'right' }}>
                                            <span className="text-muted mb-0 font-weight-bold todo-date">{TimeSince(ele.d_created_date_time)}</span>
                                        </small>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <aside className='control-sidebar control-sidebar-dark'>
                <div className='p-3 control-sidebar-content'>
                    <h5><i className='fas fa-cog'></i> Setting </h5>
                </div>
                <div className="os-content" style={{ padding: '16px', height: '100%', width: '100%' }}>
                    <h5>Current Status</h5>
                    <hr className="mb-2" />
                    <div className="d-flex"></div>
                    <select className={selected ? "custom-select mb-3 text-light border-0 " + selected : "custom-select mb-3 text-light border-0"} onChange={chnageStatus}>
                        <option className="bg-success">Available</option>
                        <option className="bg-primary">Holiday</option>
                        <option className="bg-warning">Busy</option>
                        <option className="bg-info">Out of Office</option>
                        <option className="bg-danger">Do Not Disturb</option>
                        <option className="bg-indigo">Be Right Back</option>
                    </select>
                </div>

            </aside>

            {/*  <footer className="main-footer" style={{
                bottom: 0,
                left: 0,
                position: 'fixed',
                right: 0,
                zIndex: 1032,
            }}>
                <div className="float-right d-none d-sm-inline">
                    Suzlon-hub V1.0.0
                </div>
                <strong>Copyright &copy; 2023-2024 </strong> All rights reserved.
            </footer> */}
        </>
    )
}

export default Aside