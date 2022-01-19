import {useState, useEffect} from 'react'
import {
    StatementItemContainer, 
    StatementItemImage, 
    StatementItemInfo, 
    StatementContainer
} from './styles'
import {transactions} from '../../../services/resources/pix'
import {format} from 'date-fns'
import {FiDollarSign} from 'react-icons/fi'

interface StatementItem {
    user: {
        firstName: string,
        lastName: string
    },
    value: number,
    type: 'paid' | 'received'
    updatedAt: Date
}

const StatementItems = ({user, value, type, updatedAt}: StatementItem) => {
    return (
        <StatementItemContainer>
            <StatementItemImage type={type}>
                <FiDollarSign size={24}/>
            </StatementItemImage>

            <StatementItemInfo>
                <p className='primary-color'>{value.toLocaleString('pt-br', 
                {style: 'currency', 
                currency: 'BRL'})}
                </p>

                <p>{type === 'paid' ? 'Pago a ' : 'Recebido de '}
                <strong> {user.firstName} {user.lastName}</strong>
                </p>

                <p>{format(new Date(updatedAt), "dd/MM/yyyy 'ás' HH:mm'H'")}</p>
            </StatementItemInfo>
        </StatementItemContainer>
    )
}

const Statement = () => {

    const [statements, setStatements] = useState<StatementItem[]>([]);

    const getAlltransactions = async () => {
        const {data} = await transactions();
        setStatements(data.transactions);
    }

    useEffect(()=>{
        getAlltransactions();
    }, [])

    return (
        <StatementContainer>
            {statements.length > 0 && statements.map(statment => <StatementItems {...statment}/>)}
        </StatementContainer>
    )
}

export default Statement;