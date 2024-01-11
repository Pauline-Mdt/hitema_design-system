import {useNavigate} from "react-router-dom";

const useNavigateTo = () => {
    const navigate = useNavigate();

    const navigateBackToPrevious = () => {
        navigate(-1);
    }

    const navigateBackToList = () => {
        navigate('./..');
    }

    const navigateToNew = () => {
        navigate('new');
    }

    const navigateToId = (id) => {
        navigate(`${id}`);
    }

    const navigateToNewId = (id) => {
        navigate(`./../${id}`);
    }

    return {
        navigateBackToPrevious,
        navigateBackToList,
        navigateToNew,
        navigateToId,
        navigateToNewId,
    }
}

export default useNavigateTo;