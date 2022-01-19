import {useEffect, useState} from 'react'
import {Wrapper, Background, InputContainer, ButtonContainer} from './styles';
import background from '../../images/background-login.jpg';
import logo from '../../images/Inter-orange.png';
import Card from '../../components/Card';
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/userAuth'

const SignIn = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate()
    const {userSignIn} = useAuth();

    const handleToSignIn = async () => {
        const data = {
            email,
            password
        }
        const response = await userSignIn(data);

        if(response.id){
            navigate('/dashboard');
            return;
        }

        alert('Usuário ou Senha inválida')
        
    }
    
    return (
        <Wrapper>
            <Background image={background}/>
            <Card width='403px'>
                <img src={logo} width={172} height={61} alt="logo inter"/>
                <InputContainer>
                    <Input placeholder='EMAIL' value={email} onChange={e => setEmail(e.target.value)}/>
                    <Input placeholder='SENHA' type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </InputContainer>

                <ButtonContainer>
                    <Button type="button" onClick={handleToSignIn}>Entrar</Button>
                    <p>Ainda não é cadastrado? <Link to="/signup">Cadastra-se Já</Link></p>
                </ButtonContainer>

            </Card>
        </Wrapper>
    )
}

export default SignIn;