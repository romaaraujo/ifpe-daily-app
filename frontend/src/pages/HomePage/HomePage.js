import React, { useEffect, useState } from 'react';
import ApiService from './../../services/ApiService'
import { Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {

    document.title = `${global.config.appName} - Home`

    const [posts, setPost] = useState([]);
    const [postObj, setPostObj] = useState({});
    const [error, setError] = useState('');
    const [followError, setFollowError] = useState('');
    const [userFollow, setUserFollow] = useState('');
    const [loggedUser, setLoggedUser] = useState({});
    const [following, setFollowing] = useState([]);
    const [follower, setFollower] = useState([]);

    const navigate = useNavigate();

    const userLogged = () => {
        if (!localStorage.getItem('token')) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        ApiService.post('/auth/me', {
            token: localStorage.getItem('token')
        }).then((data) => {
            setLoggedUser({ username: data.data.username })
        }).catch((data) => {
            localStorage.removeItem('token');
        })

        getPost()

        ApiService.post('/relation/get', {
            token: localStorage.getItem('token')
        }).then((data) => {
            if (Array.isArray(data.data[0])) {
                setFollowing([]);
                data.data[0].forEach(dados => {
                    setFollowing(previous => [dados.following.username, ...previous]);
                })
            }
            if (Array.isArray(data.data[1])) {
                setFollower([]);
                data.data[1].forEach(dados => {
                    setFollower(previous => [dados.follower.username, ...previous]);
                })
            }
        }).catch((data) => {
        })
    }, [])

    const getPost = () => {
        ApiService.post('/post/get', {
            token: localStorage.getItem('token')
        }).then((data) => {
            if (Array.isArray(data.data)) {
                data.data.forEach(post => {
                    setPost(previous => [{ text: post.content, name: post.author.username, sentiment: post.score + ' - ' + post.label, datetime: new Date(post.createdAt).toLocaleString('pt-br') }, ...previous]);
                    setPostObj({
                        text: '',
                        name: '',
                        datetime: '',
                        sentiment: ''
                    });
                })
            }
        }).catch((data) => {
        })
    }

    const newPost = () => {
        if (postObj.text) {
            ApiService.post('/post/post', {
                token: localStorage.getItem('token'),
                content: postObj.text
            }).then((data) => {
                getPost()
                setError('');
                setPostObj({
                    text: '',
                    name: '',
                    datetime: '',
                    sentiment: ''
                });
            }).catch((data) => {
                if (data.response.data.error !== undefined) setError(data.response.data.error)
            })
        } else {
            setError('Digite um texto válido');
        }
    }

    const follow = () => {
        if (userFollow) {
            setError('');
            ApiService.post('/relation/new', {
                token: localStorage.getItem('token'),
                userFollow: userFollow
            }).then((data) => {
                window.location.reload(false);
            }).catch((data) => {
                if (data.response.data.error !== undefined) setFollowError(data.response.data.error)
            })
        } else {
            setFollowError('Digite um usuário válido');
        }
    }

    useEffect(() => {
        if (!userLogged()) navigate('/login');
    }, [navigate])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-3">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <Card>
                                <Card.Header>Perfil</Card.Header>
                                <Card.Body className="text-center">
                                    <div>
                                        <h6>Bem-vindo</h6>
                                    </div>
                                    <div className='mt-2'>
                                        <h5 className='display'>{loggedUser.username}</h5>
                                    </div>
                                    <div className='mt-2 border'>
                                        {follower.length} seguidor(es)
                                    </div>
                                    <div className='mt-2 border'>
                                        Seguindo: {following.join(', ')}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <Card>
                                <Card.Header>Perfil</Card.Header>
                                <Card.Body className="text-center">
                                    {
                                        followError && <Alert variant='danger' dismissible onClose={(() => setError(''))}>{followError}</Alert>
                                    }
                                    <div>
                                        <h6>Seguir usuário</h6>
                                    </div>
                                    <div className='mt-2'>
                                        <input className="input form-control w-full" placeholder="Digite o usuário" onChange={e => setUserFollow(e.target.value)} value={userFollow}></input><br />
                                        <button className="btn btn-success text-white" onClick={follow}>Seguir</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                </div>
                <div className="col-6">
                    {
                        error && <Alert variant='danger' dismissible onClose={(() => setError(''))}>{error}</Alert>
                    }
                    <textarea placeholder='O que você está pensando?' value={postObj.text} onChange={e => setPostObj({ text: e.target.value, name: loggedUser.username, datetime: new Date().toLocaleString('pt-br') })} className='form-control input'></textarea>

                    <div className='mt-2 w-full form-group '>
                        <Button className='float-right bg-light text-black' onClick={newPost}>Enviar</Button>
                    </div>

                    <div className='mt-2'>
                        {
                            posts.map((post, index) => (
                                <Card key={index} className='mb-3'>
                                    <Card.Header>{post.name}</Card.Header>
                                    <Card.Body>{post.text}</Card.Body>
                                    <Card.Footer>{post.datetime} <strong>({post.sentiment})</strong></Card.Footer>
                                </Card>
                            ))
                        }
                    </div>
                </div>
                <div className="col-3">
                    <Card>
                        <Card.Header>Trend's</Card.Header>
                        <Card.Body>
                            <ul>
                                <li>...</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default HomePage
