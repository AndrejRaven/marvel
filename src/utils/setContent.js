import Spinner from '../components/spinner/Spiner'
import ErrorMessage from '../components/errorMessage/ErrorMessage'
import Skeleton from '../components/skeleton/Skeleton'

const setContent = (process, Component, data) => {
  switch (process) {
    case('waiting'):
      return <Skeleton />;
      break;
    case('loading'): 
      return <Spinner />;
    case('confirmed'): 
      return <Component data={data} />;
      break;
    case('error'):
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected process state')
  }
}

export default setContent;