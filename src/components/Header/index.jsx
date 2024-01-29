import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { profileSelector } from '../../store/auth/selectors'
import { logout } from '../../store/auth/slice'

const Header = () => {
	const profile = useSelector(profileSelector)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogOut = () => {
		dispatch(logout())
		navigate('/login')
	}
	return (
		<header>
			<nav>
				<ul>
					<li>
						<NavLink to='/'>Home</NavLink>
					</li>
					<li>
						<NavLink to='/todo'>Todo</NavLink>
					</li>

					{profile ? (
						<button onClick={handleLogOut}>Logout</button>
					) : (
						<button>
							<NavLink to='/login'>Login</NavLink>
						</button>
					)}

					{profile && <p>{profile.firstName}</p>}
				</ul>
			</nav>
		</header>
	)
}

export default Header
