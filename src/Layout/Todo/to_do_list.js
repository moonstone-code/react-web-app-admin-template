import { useState } from "react";
import { useCookies } from "react-cookie";
import { AxiosBaseURL, CallAlert, Error_handling, GetFormattedDate } from "../../utils/httpCommon";

export default function ToDoList({ searchResults, currentTab, chnageTab ,lists,setInputData}) {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    if (searchResults?.length === 0) {
        return (
            <>
                <li className="todo-item important">
                    <div className="todo-content">
                        <h3>No Matching List</h3>
                        <p className="small-content text-muted mb-0">0 data found</p>
                    </div>
                </li>
            </>
        )
    }
    const updateTodo = (e) => {
        try {
            debugger;
            let data = {
                data_value: e.target.getAttribute("data-value"),
                data_id: e.target.getAttribute("data-id"),
                data_tag: e.target.getAttribute("data-tag"),
                s_created_by: localStorage.getItem('s_user_id')
            };
            AxiosBaseURL({
                url: '/api/project/update_todos_by_login_id',
                method: 'POST',
                data: data,
                headers: { 'Authorization': `Bearer ${cookies.token}` }
            })
                .then((response) => {
                    chnageTab(currentTab)
                })
                .catch(function (error) {
                    CallAlert('error', Error_handling(error), 5000);
                }) 
        } catch (error) {
            CallAlert('error', Error_handling(error), 5000);
        }
    };
    const getToDoById=(id)=>{ 
        if(lists.length < 0){
            CallAlert('warning', Error_handling('No record Found !'));
        }
        let record = lists.filter(list => list.n_id===id); 
        setInputData(record);
    }
    return (
        <>
            {
                searchResults.map((ele, i) => (
                    <li className="todo-item animate__animated animate__slideInDown " key={i}>
                        <div className="icheck-primary d-inline mr-4">
                            <input type="checkbox" id={"checkboxSuccess3_" + i} data-value={ele.n_status_completed} data-id={ele.n_id} data-tag="status_com" onClick={(e) => updateTodo(e)} defaultChecked={ele.n_status_completed == 1 ? "checked" : ""} />
                            <label htmlFor={"checkboxSuccess3_" + i}>
                            </label>
                        </div>
                        <div className="todo-content">
                            <h3 style={{ textDecoration: (ele.n_status_completed === 1) ? "line-through" : "" }}>{ele.s_title}</h3>
                            <p className="text-muted mb-0 font-weight-bold todo-date" style={{ textDecoration: (ele.n_status_completed === 1) ? "line-through" : "" }}>{GetFormattedDate(ele.d_created_datetime)}</p>
                            <p className="small-content text-muted mb-0" style={{ textDecoration: (ele.n_status_completed === 1) ? "line-through" : "" }}>{ele.s_desc}</p>
                        </div>
                        <div className="ml-auto">
                            <i className="fas fa-star mr-2 font-15" data-value={ele.n_star} data-id={ele.n_id} data-tag="star" onClick={(e) => updateTodo(e)} style={{ color: (ele.n_star == 0) ? "" : "blue", cursor: "pointer" }}></i>
                            <i className="fas fa-exclamation-circle font-15 mr-2" data-value={ele.n_imp} data-tag="imp" data-id={ele.n_id} onClick={(e) => updateTodo(e)} style={{ color: (ele.n_imp == 0) ? "" : "blue", cursor: "pointer" }}></i>
                        </div>
                        <div>
                            <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-grip-vertical font-15"></i></a>
                            <div className="dropdown-menu p-0 m-0 dropdown-menu-right ddrp_menu">
                                <span className="dropdown-item edit-todo" onClick={() => getToDoById(ele.n_id)}>
                                    <i className="fas fa-pen mr-2" ></i> <span style={{ fontSize: '15px' }}>Edit</span>
                                </span>
                                <span className="text-danger dropdown-item delete" onClick={() => getToDoById(ele.n_id)}>
                                    <i className="fas fa-trash mr-2"></i> <span style={{ fontSize: '15px' }}>Delete</span>
                                </span>
                            </div>
                        </div>
                    </li>
                ))
            }
        </>
    )
}

