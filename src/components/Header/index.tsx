import {HeaderContainer, HeaderWrapper, UserInfo} from './styles';
import logoInter from '../../images/Inter-orange.png';
import {useNavigate} from 'react-router-dom';
import UserCircle from '../UserCircle'
import useAuth from '../../hooks/userAuth'

const Header = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const initials = user.firstName ? user.firstName.substring(0,1) + user.lastName.substring(0,1): ''

    const handleLogoff = () => {
        navigate('/');
    }
    
    return (
        <HeaderContainer>
            <HeaderWrapper>
                <img src={logoInter} width={172} height={61} alt="logo inter"/>
                <UserInfo>
                    <UserCircle initials={initials}/>
                    <div>
                        <p>Olá, <span>{user.firstName} {user.lastName}</span></p>
                        <strong>{user.accountNumber}-{user.accountDigit}</strong><br/>
                        <a href='#' onClick={handleLogoff}>SAIR</a>
                    </div>
                </UserInfo>
            </HeaderWrapper>
        </HeaderContainer>
    )

}

export default Header;