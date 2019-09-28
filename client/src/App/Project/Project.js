import React, { useEffect, useState } from 'react';

import styles from './Project.module.sass';
import Logout from '../components/Logout/Logout';
import { Redirect } from 'react-router-dom';
import moment from 'moment'

function Project() {
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState([]);
    
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
	}, [])

    const getProjects = () => {
        const queriesBody = {
			query: `{projects{id,name,tasks{id,descricao,createdAt,updatedAt,status}}}`,
			// variables: {
			// 	u: email,
			// 	p: password
			// }
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
                        Done <input type="checkbox" /> 
                    </div>
                }
            </div>
        })
    }

    const action = (id, action) => {
        let queriesBody = {
            query: `mutation($u:String!,$p:String!){deleteProject(id:$i){id}}`,
            variables: {
                i: id
            }
        }

        if(action === 'edit'){
            queriesBody = {
                query: `mutation($u:String!,$p:String!){editProject(id:$i){id}}`,
                variables: {
                    i: id
                }
            }
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

            if (!data.deleteProject || !data.editProject) {
                return 'Error.'
            }

            window.location.href = '/users'
        })
        .catch((e) => e)
    }
    
    const renderProjects = () => {
        return projects.map(i => {
            return <div className={ styles['project'] } key={i.id}>
                <div>
                    <button onClick={() => action(i.id, 'edit')}>edit</button>
                    <button onClick={() => action(i.id, 'delete')}>delete</button>
                </div>
                <h2>{i.name}</h2>

                <div className={ styles['tasks'] }>
                    {renderTasks(i.tasks)}
                </div>
            </div>
        })
    }

    return (
        <div className={ styles['root'] }>
            <div>
                <small  className={styles["user"]}>{user.email}</small>
                <Logout />
            </div>
            
            {projects.length > 0 && <div className={styles["container"]}>
                <div className={styles["projects"]}>
                    {renderProjects()}
                </div>
            </div>}
        </div>
    )
}

export default Project;
