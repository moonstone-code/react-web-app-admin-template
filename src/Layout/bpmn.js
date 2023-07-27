import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from './header'

function Bpmn() {
    return (
        <>
            <Header />
            <div className="content-wrapper">

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Business process automation</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/main">Home</Link></li>
                                    <li className="breadcrumb-item active">BPM</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>


                <section className="content">
                    <div className="container-fluid">

                        <div className="row">
                            <div class="col-md-3 col-sm-6 col-12">
                                <div class="info-box bg-gradient-info">
                                    <span class="info-box-icon"><i class="far fa-bookmark"></i></span>
                                    <Link to='http://localhost/kanboard/?controller=AuthController&action=login' style={{ color: 'white' }} target="_blank">
                                        <div class="info-box-content">
                                            <span class="info-box-text">PM</span>
                                            <span class="info-box-number">Project management</span>
                                        <div class="progress">
                                            <div class="progress-bar" style={{width: '100%'}}></div>
                                        </div>
                                            <span class="progress-description">
                                                Project management
                                            </span>
                                        </div>
                                    </Link>
                                </div>

                            </div>

                        </div>


                        <div className="row">

                            <div className="col-md-12">
                                <div className="card">
                                    {/* <div className="card-header border-transparent">
                                        <h3 className="card-title">Latest Orders</h3>
                                    </div> */}

                                    <div className="card-body p-0">
                                        <div className="table-responsive p-4">
                                            <table id="tbl_rpa" className="table table-bordered table-striped nowrap" style={{ width: "100%" }}>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Status</th>
                                                        <th>Trigger</th>
                                                        <th>Last Run time</th>
                                                        <th>Next Run time</th>
                                                        <th>Salary</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Status</th>
                                                        <th>Trigger</th>
                                                        <th>Last Run time</th>
                                                        <th>Next Run time</th>
                                                        <th>Salary</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>

                                    </div>

                                    {/*   <div className="card-footer clearfix">
                                        <a href="#" className="btn btn-sm btn-info float-left">Place New Order</a>
                                        <a href="#" className="btn btn-sm btn-secondary float-right">View All Orders</a>
                                    </div> */}

                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </>
    )
}

export default Bpmn