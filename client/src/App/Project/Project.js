import React, { useEffect, useState } from 'react';

import styles from './Project.module.sass';
import Logout from '../components/Logout/Logout';
import { Redirect } from 'react-router-dom';
import moment from 'moment'

function Project() {
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [nameProject, setNameProject] = useState('');
    const [nameTask, setNameTask] = useState({});
    const [load, setLoad] = useState(false);

    
    useEffect(() => {
        const getToken = n => {
            let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
            return a ? a[1] : '';
        }

        const token = getToken("x-session")
    
        const { ...user } = token && JSON.parse(atob(token.split('.')[1]))
        
        if (user && !user.id) {
            window.location.href = '/login'
        }
        
        setUser(user)
		getProjects()
	}, [load])

    const getProjects = () => {
        const queriesBody = {
			query: `{projects{id,name,tasks{id,descricao,createdAt,updatedAt,status}}}`,
		}
		fetch('/graphql', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify(queriesBody)
		})
        .then((res) => res.json())
        .then((res) => {
            const {data, errors} = res

            if(errors){
                return errors.message
            }
            setProjects(data.projects)
        })
        .catch((e) => e)
    }

    const action = (id, action) => {
        let queriesBody = {}

        switch (action) {
            case 'createTask':
                const valueTask = nameTask[`insert-task-${id}`]
                queriesBody = {
                    query: `mutation($i:String!,$n:String!){createTask(id:$i,valueTask:$n){id}}`,
                    variables: {
                        i: id,
                        n: valueTask
                    }
                }
                break;
            
            case 'deleteTask':
                    queriesBody = {
                        query: `mutation($i:String!){deleteTask(id:$i){id}}`,
                        variables: {
                            i: id
                        }
                    }
                    break;

            case 'editTask':
                queriesBody = {
                    query: `mutation($i:String!,$n:String!){editTask(id:$i,nameTask:$n){id}}`,
                    variables: {
                        i: id,
                        n: nameTask
                    }
                }
                break;

            case 'editStatusTask':
                queriesBody = {
                    query: `mutation($i:String!){editStatusTask(id:$i){id}}`,
                    variables: {
                        i: id
                    }
                }
                break;

            case 'edit':
                queriesBody = {
                    query: `mutation($i:String!,$n:String!){editProject(id:$i,nameProject:$n){id}}`,
                    variables: {
                        i: id,
                        n: nameProject
                    }
                }
                break;
        
            case 'delete':
                queriesBody = {
                    query: `mutation($i:String!){deleteProject(id:$i){id}}`,
                    variables: {
                        i: id
                    }
                }
                break;
        
            default:
                queriesBody = {
                    query: `mutation($n:String!){createProject(nameProject:$n){id}}`,
                    variables: {
                        n: nameProject
                    }
                }
                break;
        }

        fetch('/graphql', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(queriesBody)
        })
        .then((res) => res.json())
        .then((res) => {
            const {data, errors} = res
            
            if(errors){
                return errors.message
            }

            if (!data.deleteProject || !data.editProject || !data.createProject || !data.createTask ||!data.deleteTask, !data.editTask) {
                return 'Error.'
            }
        })
        .catch((e) => e)

        setOpen(false)
        setNameProject('')
        setLoad(Math.random())
    }

    const actionHandleProject = (id, value) => {
        if(!id){
            setOpen(true)
        }else {
            setNameProject(value)
            setOpen({id})
        }
    }

    const actionHandleTask = (id, value) => {
        setNameTask(value)
        setOpen({id})
    }

    const cancelHandle = () =>{
        setOpen(false)
        setNameProject('')
        setNameTask({})
    }
    
    const renderProjects = () => {
        return projects.map(i => {
            return <div className={ styles['project'] } key={i.id}>
                <div className={ styles['header'] }>
                    <h2>{i.name}</h2>
                    <div>
                        <button onClick={() => actionHandleProject(i.id, i.name)}>edit</button>
                        <button onClick={() => action(i.id, 'delete')}>delete</button>
                    </div>
                </div>
                <div className={ styles['tasks'] }>
                    {renderTasks(i.tasks)}
                </div>
                <div className={styles["insert-task"]}>
                        <div className={styles["form-field"]}>
                            <input
                                type="text"
                                name={`insert-task-${i.id}`}
                                placeholder="Add a new task"
                                required
                                className={styles["form-input"]}
                                defaultValue={ nameTask[`insert-task-${i.id}`] }
                                onChange={ (e) => {
                                    const name = e.target.name
                                    const value = e.target.value
                                    setNameTask({...nameTask, [name]: value})
                                } }
                            />
                            <button onClick={() => {
                                action(i.id, 'createTask')
                            }}>Create</button>
                        </div>             
                    </div>
            </div>
        })
    }

    const renderTasks = (tasks) => {
        return tasks.map(i => {
            return <div className={ styles['task'] } key={i.id}>
                <small className={ styles['date'] }>{moment(i.createdAt).format('DD/MM/YYYY')}</small>
                <p className={ styles['description'] }>{i.descricao}</p>
                {
                    i.status == 1 ? 
                    <div className={ styles['status'] }>
                        <span>Concluído em {moment(i.updatedAt).format('DD/MM/YYYY')}</span>
                    </div> 
                    : 
                    <div className={ styles['action'] }>
                        <div>
                            <label className={ styles['action-status'] }>
                                <input type="checkbox" onChange={() => action(i.id, 'editStatusTask')} />
                                <span className={ styles['checkmark'] }></span>
                            </label> 
                        </div>
                        <div>
                            <button onClick={() => {
                                actionHandleTask(i.id, i.descricao)
                            }}>Edit</button><button onClick={() => {
                                action(i.id, 'deleteTask')
                            }}>Delete</button></div>
                    </div>
                }
            </div>
        })
    }

    const renderProjectModal = (open) => {
        let id = (open || {}).id
        let type = id ? 'edit' : 'create'
        let title = 'Create a new Project'
        let valueBtn = 'Create'
        if(type === 'edit'){
            title = 'Edit Project'
            valueBtn = 'Edit'
        }

        return <div className={styles["overlay"]}>
                    <div className={styles["text"]}>
                        <h3>{title}</h3>
                        <div className={styles["form-field"]}>
                            <label className={styles["user"]}><span className={styles["hidden"]}>Name</span></label>
                            <input
                                type="text"
                                placeholder=""
                                required
                                className={styles["form-input"]}
                                value={ nameProject }
                                onChange={ (e) => {
                                    setNameProject(e.target.value)
                                } }
                            />
                        </div>
                        <div className={styles["form-action"]}>
                            <button onClick={() => cancelHandle()}>Cancel</button>
                            <button onClick={() => {
                                action(id, type)
                            }}>{valueBtn}</button>
                        </div>                
                    </div>
                </div>
    }

    const renderTaskModal = (open) => {
        let id = (open || {}).id
        let title = 'Edit Project'
        let valueBtn = 'Edit'

        return <div className={styles["overlay"]}>
                    <div className={styles["text"]}>
                        <h3>{title}</h3>
                        <div className={styles["form-field"]}>
                            <label className={styles["user"]}><span className={styles["hidden"]}>Name</span></label>
                            <input
                                type="text"
                                placeholder=""
                                required
                                className={styles["form-input"]}
                                value={ nameTask }
                                onChange={ (e) => {
                                    setNameTask(e.target.value)
                                } }
                            />
                        </div>
                        <div className={styles["form-action"]}>
                            <button onClick={() => cancelHandle()}>Cancel</button>
                            <button onClick={() => {
                                action(id, 'editTask')
                            }}>{valueBtn}</button>
                        </div>                
                    </div>
                </div>
    }

    return (
        <div className={ styles['root'] }>
            {open && renderProjectModal(open)}
            {open && renderTaskModal(open)}
            <div className={styles["user-header"]}>
                <small className={styles["user"]}>{user.email}</small>
                <Logout />
            </div>
            
            {projects.length > 0 && <div className={styles["container"]}>
                <div className={styles["actions"]}>
                    <button onClick={() => actionHandleProject()}>Create a new project</button>
                </div>
                <div className={styles["projects"]}>
                    {renderProjects()}
                </div>
            </div>}
        </div>
    )
}

export default Project;
