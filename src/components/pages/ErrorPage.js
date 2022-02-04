import {Link} from 'react-router-dom'
import ErrorMessage from '../errorMessage/ErrorMessage';

const ErrorPage = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link to='/' style={{'textAlign': 'center', 'display': 'block', 'fontWeight': 'bold', 'fontSize': '24px'}}>Back to main page</Link>
        </div>
    )
}

export default ErrorPage;