import React from 'react'
import { Link } from 'react-router-dom'
import Header from './header'

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"

function RpaDashboard() {
    const $ = require('jquery');
    $.DataTable = require('datatables.net');
    let dataVal = [

        {
            "id": "3",
            "name": "Salary Notification on email",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2009/01/12 09:00",
            "office": "SUZ_BOT trigger",
            "extn": "2009/01/12 09:00",
        },
        {
            "id": "4",
            "name": "Maintenance Log",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2012/12/02 16:19",
            "office": "SUZ_BOT trigger",
            "extn": "2012/12/02 16:19"
        },
        {
            "id": "5",
            "name": "Forex Rate",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2008/11/28 11:30",
            "office": "SUZ_BOT trigger",
            "extn": "2008/11/28 11:30",
        },
        {
            "id": "6",
            "name": "Scada Log",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2012/12/02 17:39",
            "office": "SUZ_BOT trigger",
            "extn": "2012/12/02 17:39",
        },
        {
            "id": "9",
            "name": "SAP MM Update",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2009/09/15 20:38",
            "office": "SUZ_BOT trigger",
            "extn": "2009/09/15 20:38"
        },
        {
            "id": "13",
            "name": "Invoice Validation",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2009/09/15 18:38",
            "office": "SUZ_BOT trigger",
            "extn": "2009/09/15 18:38"
        },
        {
            "id": "19",
            "name": "Monthly Data Uploading",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2012/12/02 12:39",
            "office": "SUZ_BOT trigger",
            "extn": "2012/12/02 12:39",
        },
        {
            "id": "20",
            "name": "Daily Data Uploading",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2009/09/15 08:00",
            "office": "SUZ_BOT trigger",
            "extn": "2009/09/15 08:00"
        },
        {
            "id": "23",
            "name": "SAP MM Module Engineering Id Creation",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2009/09/15 24:00",
            "office": "SUZ_BOT trigger",
            "extn": "2009/09/15 24:00"
        },
        {
            "id": "24",
            "name": "Current Payment Status",
            "position": "Ready",
            "salary": "Failed",
            "start_date": "2009/09/15 06:00",
            "office": "SUZ_BOT trigger",
            "extn": "2009/09/15 06:00"
        },
        {
            "id": "25",
            "name": "SAP Invoice Status Update through Email",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2008/11/28 18:30",
            "office": "SUZ_BOT trigger",
            "extn": "2008/11/28 18:30",
        },
        {
            "id": "28",
            "name": "SAP automation with AMS",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2012/12/02 16:39",
            "office": "SUZ_BOT trigger",
            "extn": "2012/12/02 16:39",
        },
        {
            "id": "51",
            "name": "User Deactivate",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2009/09/15 11:38",
            "office": "SUZ_BOT trigger",
            "extn": "2009/09/15 11:38"
        },
        {
            "id": "57",
            "name": "Senior Management dashboard",
            "position": "Ready",
            "salary": "Success",
            "start_date": "2009/09/15 11:00",
            "office": "SUZ_BOT trigger",
            "extn": "2009/09/15 11:00"
        }
    ];
    $(function () {
        // $("#tbl_rpa").DataTable({
        //     data: dataVal,
        //     columns: [
        //                 { data: 'name' },
        //                 { data: 'position' },
        //                 { data: 'office' },
        //                 { data: 'extn' },
        //                 { data: 'start_date' },
        //                 { data: 'salary' }
        //             ],
        //     "responsive": true, "lengthChange": false, "autoWidth": false, dom: 'Bfrtip',
        //     "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
        // }).buttons().container().appendTo('#tbl_rpa_wrapper .col-md-6:eq(0)');
       /*  let table =  */$('#tbl_rpa').DataTable({
            "paging": true,
            "responsive": true,
            "lengthChange": false,
            "autoWidth": false,
            destroy: true,
            pagingType: 'full_numbers',
            data: dataVal,
            pageLength: 5,
            processing: true,
            dom: 'Bfrtip',
            buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
            columns: [
                { data: 'name' },
                { data: 'position' },
                { data: 'office' },
                { data: 'extn' },
                { data: 'start_date' },
                { data: 'salary' }
            ]
        })

    });


    return (

        <>
        <Header />
            <div className="content-wrapper">

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">RPA BOT Dashboard</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/main">Home</Link></li>
                                    <li className="breadcrumb-item active">RPA Dashboard</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>


                <section className="content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="row">
                                        <div className="col-sm-3 col-6">
                                            <div className="description-block border-right">
                                                <h5 className="description-header">
                                                    <span className="description-percentage text-success"><i className="fas fa-caret-up"></i> 15</span>
                                                </h5>
                                                <span className="description-text">TOTAL PROCESS SCHEDULE</span>
                                            </div>

                                        </div>

                                        <div className="col-sm-3 col-6">
                                            <div className="description-block border-right">
                                                <h5 className="description-header">
                                                    <span className="description-percentage text-success"><i className="fas fa-caret-up"></i> 10</span>
                                                </h5>
                                                <span className="description-text">TOTAL DAILY SCHEDULE</span>
                                            </div>

                                        </div>

                                        <div className="col-sm-3 col-6">
                                            <div className="description-block border-right">
                                                <h5 className="description-header">
                                                    <span className="description-percentage text-success"><i className="fas fa-caret-up"></i> 14</span>
                                                </h5>
                                                <span className="description-text">TOTAL Ready</span>
                                            </div>

                                        </div>

                                        <div className="col-sm-3 col-6">
                                            <div className="description-block">
                                                <h5 className="description-header">
                                                    <span className="description-percentage text-danger"><i className="fas fa-caret-down"></i> 1</span>
                                                </h5>
                                                <span className="description-text">TOTAL FAILED</span>
                                            </div>

                                        </div>
                                    </div>

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

export default RpaDashboard