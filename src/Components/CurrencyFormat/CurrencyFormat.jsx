import numeral from 'numeral'

const CurrencyFormat = ({amount})=> {
    const formattoAmount = numeral(amount).format("$0,0.00")
    return <div>{formattoAmount}</div>
} 

export default CurrencyFormat;