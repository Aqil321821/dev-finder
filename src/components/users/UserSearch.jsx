import { useState, useContext, useEffect } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import { searchUsers } from '../../context/github/GithubActions';
import { getTopStarredReposUsers } from '../../context/github/GithubActions'; // Import new action

const UserSearch = () => {
  const [text, setText] = useState('');
  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const [searchText, setSearchText] = useState(''); // To update heading after submit

  // Fetch top-starred repository owners (users) on initial load
  useEffect(() => {
    const fetchTopUsers = async () => {
      dispatch({ type: 'SET_LOADING' });
      try {
        // Fetch top users based on starred repositories
        const topUsers = await getTopStarredReposUsers();

        const uniqueUsers = Array.from(new Set(topUsers.map((user) => user.login))).map((login) => topUsers.find((user) => user.login === login));

        dispatch({ type: 'GET_USERS', payload: uniqueUsers });
      } catch (error) {
        setAlert('Error fetching top users based on starred repos', 'error');
      }
    };

    fetchTopUsers();
  }, [dispatch, setAlert]);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === '') {
      setAlert('Enter Something', 'error');
    } else {
      dispatch({ type: 'SET_LOADING' });
      const users = await searchUsers(text);
      dispatch({ type: 'GET_USERS', payload: users });
      setSearchText(text); // Update searchText to change heading
      setText('');
    }
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR_USERS' });
    setSearchText('');
    setText('');
  };
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input type='text' className='w-full pr-40 bg-gray-200 input input-lg text-black' value={text} placeholder='Search' onChange={handleChange} />
              <button type='submit' className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'>
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={handleClear} className='btn btn-ghost btn-lg'>
            Clear
          </button>
        </div>
      )}

      {/* <h1 className='text-3xl font-bold  mt-6 mb-4'>{searchText ? `Results for "${searchText}"` : 'Most Starred Users'}</h1>
       */}

      <h1 className='text-3xl font-bold mt-6 mb-4'>{searchText ? `Results for "${searchText}"` : users.length > 0 ? 'Most Starred Users' : ''}</h1>
    </div>
  );
};

export default UserSearch;
