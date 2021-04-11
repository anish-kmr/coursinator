import { useHistory } from 'react-router-dom';

const HandleIllegalRoutes = ()=>{
    const history = useHistory();
    let user = JSON.parse(localStorage.getItem('user'));
    if(!user) history.push('/');
}

export default HandleIllegalRoutes;