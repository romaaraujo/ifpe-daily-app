import React, { useEffect, useState } from 'react';
import ApiService from './../../services/ApiService'
import { Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const loggedUser = {
    username: 'romario',
    fullName: 'Romário Araújo'
}

const HomePage = () => {

    document.title = `${global.config.appName} - Home`

    const [posts, setPost] = useState([]);
    const [postObj, setPostObj] = useState({});
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const userLogged = () => {
        if (!localStorage.getItem('token')) {
            return false;
        }
        return true;
    }

    const newPost = () => {

        if (postObj.text && postObj.name) {
            setPost(previous => [postObj, ...previous]);
            setError('');
            setPostObj({
                text: '',
                name: '',
                datetime: ''
            });
        } else {
            setError('Digite uma mensagem para enviar');
        }
    }

    useEffect(() => {
        if (!userLogged()) navigate('/login');
    }, [navigate])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-3">
                    <Card>
                        <Card.Header>Perfil</Card.Header>
                        <Card.Body className="text-center">
                            <div>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" className="w-50 rounded-circle" />
                            </div>
                            <div className='mt-2'>
                                <h5 className='display'>{loggedUser.fullName}</h5>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-6">
                    {
                        error && <Alert variant='danger' dismissible onClose={(() => setError(''))}>{error}</Alert>
                    }
                    <textarea placeholder='O que você está pensando?' value={postObj.text} onChange={e => setPostObj({ text: e.target.value, name: loggedUser.fullName, datetime: new Date().toLocaleString('pt-br') })} className='form-control input'></textarea>

                    <div className='mt-2 w-full form-group '>
                        <Button className='float-right bg-light text-black' onClick={newPost}>Enviar</Button>
                    </div>

                    <div className='mt-2'>
                        {
                            posts.map((post, index) => (
                                <Card key={index} className='mb-2'>
                                    <Card.Header>{post.name} - {post.datetime}</Card.Header>
                                    <Card.Body>{post.text}</Card.Body>
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
                                <li>Um</li>
                                <li>Dois</li>
                                <li>Três</li>
                                <li>Quatro</li>
                                <li>Cinco</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default HomePage
