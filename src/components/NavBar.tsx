import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { CatchingPokemon, Favorite, Menu as MenuIcon } from '@mui/icons-material';
import React, { useState } from 'react';

const NavBar = () => {
	const { favorites } = useFavorites();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position='sticky' elevation={0}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<CatchingPokemon sx={{ mr: 1, fontSize: 30, color: 'rgba(255, 255, 255, 0.8)' }} />
					<Typography
						component={Link}
						to='/'
						variant='h6'
						sx={{
							textDecoration: 'none',
							color: 'inherit',
							fontweight: 'bold',
							fontFamily: 'Orbitron',
							letterSpacing: '2px',
							textShadow: '0px 2px 4px rgba(0,0,0,0.3)',
						}}
					>
						Pokedex App
					</Typography>
				</Box>
				{isMobile ? (
					<>
						<IconButton
							color='inherit'
							onClick={handleMenuOpen}
							aria-controls={open ? 'mobile-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={open ? 'true' : undefined}
						>
							<Badge badgeContent={favorites.length} color='secondary'>
								<MenuIcon />
							</Badge>
						</IconButton>

						<Menu
							id='mobile-menu'
							anchorEl={anchorEl}
							open={open}
							onClose={handleMenuClose}
							slotProps={{
								list: { 'aria-labelledby': 'basic-button' },
								paper: { sx: { backgroundColor: '#1E1E1E', color: '#FFF', border: '1px solid #333' } },
							}}
						>
							<MenuItem onClick={handleMenuClose} component={Link} to='/Favorites'>
								<CatchingPokemon sx={{ mr: 1, color: '#D32F2F' }} />
								<Typography sx={{ fontFamily: 'Orbitron' }}>Mis Favoritos</Typography>
							</MenuItem>
						</Menu>
					</>
				) : (
					<Tooltip title='Ver Tus PoKemon Favoritos'>
						<Button
							color='inherit'
							component={Link}
							to='/favorites'
							sx={{
								border: '1px solid rgba(255, 255, 255, 0.3)',
								borderRadius: '20px',
								padding: '5px 20px',
								fontFamily: 'Orbitron',
								textTransform: 'none',
								fontSize: '1rem',
								backgroundColor: 'rgba(0,0,0,0.1)',
								'&:hover': {
									backgroundColor: 'rgba(0,0,0,0.3)',
									border: '1px solid rgba(255, 255, 255, 0.8)',
								},
							}}
						>
							Mis Favoritos
							<Badge
								badgeContent={favorites.length}
								color='secondary'
								sx={{
									'& .MuiBadge-badge': {
										fontWeight: 'bold',
										backgroundColor: '#FFF',
										color: '#D32F2F',
									},
								}}
							>
								<CatchingPokemon sx={{ ml: 1.5 }} />
							</Badge>
						</Button>
					</Tooltip>
				)}
			</Toolbar>
		</AppBar>
	);
};
export default NavBar;
