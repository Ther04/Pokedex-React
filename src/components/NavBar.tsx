import { AppBar, Badge, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { Favorite } from '@mui/icons-material';

const NavBar = () => {
	const { favorites } = useFavorites();

	return (
		<AppBar position='sticky'>
			<Toolbar>
				<Typography
					component={Link}
					to='/'
					variant='h6'
					sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontweight: 'bold' }}
				>
					pokedex app
				</Typography>
				<Button color='inherit' component={Link} to='/favorites'>
					<Badge badgeContent={favorites.length} color='secondary'>
						<Favorite sx={{ mr: 1 }} />
					</Badge>
				</Button>
			</Toolbar>
		</AppBar>
	);
};
export default NavBar;
