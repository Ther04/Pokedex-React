import { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Container,
	Grid,
	LinearProgress,
	Paper,
	Tab,
	Tabs,
	Typography,
} from '@mui/material';
import type { IPokemonDetails, PokemonElementType } from '../types/pokemon';
import { TYPE_COLORS } from '../utils/pokemonUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { getPokemonDetails } from '../api/pokeApi';
import { ArrowBack, CatchingPokemon } from '@mui/icons-material';
import { PokemonNameUpperCase } from '../utils/pokemonUtils';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { MoveTypeChip } from '../components/MoveTypeChip';
import { CustomTabPanel } from '../components/CustomTabPanel';
import { useIsMobile } from '../hooks/useIsMobile';
import { esES } from '@mui/x-data-grid/locales';

const Details = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();

	const isMobile = useIsMobile();

	const [PokemonDetail, setPokemonDetail] = useState<IPokemonDetails | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);
	const [tabValue, setTabValue] = useState<number>(0);

	useEffect(() => {
		const fetchPokemonDetails = async () => {
			if (!id) return;
			try {
				setLoading(true);
				const { data } = await getPokemonDetails(id);
				setPokemonDetail(data);
			} catch (error) {
				console.error('Error fetching Pokémon details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPokemonDetails();
	}, [id]);

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (!PokemonDetail) {
		return (
			<Typography variant='h5' align='center' sx={{ mt: 5 }}>
				No se encontró el Pokémon
			</Typography>
		);
	}

	const isFav = isFavorite(PokemonDetail.id);

	const handleFavoriteClick = () => {
		if (isFav) {
			removeFavorite(PokemonDetail.id);
		} else {
			addFavorite({
				id: PokemonDetail.id,
				name: PokemonDetail.name,
				image: PokemonDetail.sprites.front_default,
			});
		}
	};

	const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const statsTranslation: Record<string, string> = {
		hp: 'PS',
		attack: 'Ataque',
		defense: 'Defensa',
		'special-attack': 'At. Esp',
		'special-defense': 'Def. Esp',
		speed: 'Velocidad',
	};

	const chartData = PokemonDetail.stats.map((s) => ({
		subject: statsTranslation[s.stat.name] || s.stat.name,
		A: s.base_stat,
		fullMark: 255,
	}));

	const rows = PokemonDetail.moves.map((m, index) => ({
		id: index,
		name: PokemonNameUpperCase(m.move.name),
		url: m.move.url,
	}));

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Movimiento',
			flex: 1,
			headerAlign: 'center',
			align: 'center',
		},
		{
			field: 'url',
			headerName: 'Tipo',
			flex: 1,
			headerAlign: 'center',
			align: 'center',
			sortable: false,
			renderCell: (params) => (
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
					<MoveTypeChip url={params.value} />
				</Box>
			),
		},
	];

	return (
		<Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
			<Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
				volver
			</Button>
			<Paper
				elevation={0}
				sx={{ p: 0, borderRadius: 4, overflow: 'hidden', backgroundColor: '#1E1E1E', border: '1px solid border' }}
			>
				<Box
					sx={{
						background: 'linear-gradient(180deg, rgba(211, 47, 47, 0.2) 0%, rgba(30,30,30,1) 100%)',
						p: { xs: 2, md: 4 },
						displayy: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						alignItems: 'center',
						gap: 4,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: { xs: 'center', md: 'flex-start' },
							width: { xs: '100%', md: 'auto' },
						}}
					>
						<Box
							component='img'
							src={PokemonDetail.sprites.other['official-artwork'].front_default}
							alt={PokemonDetail.name}
							sx={{
								width: { xs: 200, md: 250 },
								height: { xs: 200, md: 250 },
								objectFit: 'contain',
								filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))',
								animation: 'float 6s ease-in-out infinite',
								mx: { xs: 'auto', md: 0 },
							}}
						/>
					</Box>

					<Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: { xs: 'column', md: 'row' },
								gap: 1,
								mb: 1,
								justifyContent: { xs: 'center', md: 'flex-start' },
							}}
						>
							<Typography
								variant='h3'
								sx={{
									fontFamily: 'Orbitron',
									fontWeight: 'bold',
									fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
									wordBreak: 'break-word',
									lineHeight: 1,
								}}
							>
								{PokemonNameUpperCase(PokemonDetail.name)}
							</Typography>
							<Typography
								variant='h4'
								sx={{
									fontFamily: 'Orbitron',
									color: 'text.secondary',
									opacity: 0.5,
									fontSize: { xs: '1.5rem', md: '2.125rem' },
								}}
							>
								#{PokemonDetail.id.toString().padStart(3, '0')}
							</Typography>
						</Box>

						<Box sx={{ mb: 3, display: 'flex', gap: '5px' }}>
							{PokemonDetail.types.map((t) => (
								<Chip
									key={t.type.name}
									label={t.type.name.toUpperCase()}
									sx={{
										backgroundColor: TYPE_COLORS[t.type.name as PokemonElementType],
										color: '#FFF',
										fontWeight: 'bold',
										fontFamily: 'Orbitron',
										border: '1px solid rgba(255, 255, 255, 0.2)',
									}}
								/>
							))}
						</Box>
						<Button
							variant={isFav ? 'outlined' : 'contained'}
							color={isFav ? 'error' : 'primary'}
							startIcon={<CatchingPokemon />}
							onClick={handleFavoriteClick}
							sx={{ borderRadius: '20px', fontFamily: 'Orbitron', px: 4 }}
						>
							{isFav ? 'QUITAR DE FAVORITOS' : 'AÑADIR A FAVORITOS'}
						</Button>
					</Box>
				</Box>

				<Box sx={{ width: '100%', bgcolor: '#151515' }}>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						centered={!isMobile}
						variant={isMobile ? 'scrollable' : 'standard'}
						scrollButtons='auto'
						allowScrollButtonsMobile
						textColor='primary'
						indicatorColor='primary'
						sx={{ borderBottom: '1px solid #333' }}
					>
						<Tab label='Datos Generales' sx={{ fontFamily: 'Orbitron' }} />
						<Tab label='Estadisticas' sx={{ fontFamily: 'Orbitron' }} />
						<Tab label='Movimientos' sx={{ fontFamily: 'Orbitron' }} />
					</Tabs>
				</Box>

				<CustomTabPanel value={tabValue} index={0}>
					<Grid container spacing={4} justifyContent='center'>
						<Grid size={{ xs: 12, md: 6 }}>
							<Box sx={{ p: 3, border: '1px solid #333', borderRadius: 2, bgcolor: '#1A1A1A' }}>
								<Typography variant='h6' gutterBottom sx={{ fontFamily: 'Orbitron', color: '#D32F2F' }}>
									Biometria
								</Typography>
								<Grid container spacing={2}>
									<Grid size={{ xs: 6 }}>
										<Typography color='text.secondary'>Altura</Typography>
										<Typography variant='h5' sx={{ fontFamily: 'Orbitron' }}>
											{PokemonDetail.height / 10} m
										</Typography>
									</Grid>
									<Grid size={{ xs: 6 }}>
										<Typography color='text.secondary'>Peso</Typography>
										<Typography variant='h5' sx={{ fontFamily: 'Orbitron' }}>
											{PokemonDetail.weight / 10} kg
										</Typography>
									</Grid>
								</Grid>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<Box sx={{ p: 3, border: '1px solid #333', borderRadius: 2, bgcolor: '#1A1A1A', height: '100%' }}>
								<Typography variant='h6' gutterBottom sx={{ fontFamily: 'Orbitron', color: '#D32F2F' }}>
									Habilidades
								</Typography>
								<Box>
									{PokemonDetail.abilities.map((a) => (
										<Chip
											key={a.ability.name}
											label={PokemonNameUpperCase(a.ability.name)}
											variant='outlined'
											sx={{
												mr: 1,
												mb: 1,
												borderColor: '#555',
												color: '#ccc',
											}}
										/>
									))}
								</Box>
							</Box>
						</Grid>
					</Grid>
				</CustomTabPanel>

				<CustomTabPanel value={tabValue} index={1}>
					<Box sx={{ height: 400, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<Typography variant='h6' sx={{ fontFamily: 'Orbitron', mb: 2 }}>
							Rendimiento de Combate
						</Typography>

						<ResponsiveContainer width='100%' height='100%'>
							<RadarChart cx='50%' cy='50%' outerRadius='80%' data={chartData}>
								<PolarGrid gridType='polygon' stroke='#444' />
								<PolarAngleAxis dataKey='subject' tick={{ fill: '#fff', fontSize: 12, fontFamily: 'Orbitron' }} />
								<PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
								<Radar name='stats' dataKey='A' stroke='#D32F2F' strokeWidth={3} fill='#D32F2F' fillOpacity={0.4} />
							</RadarChart>
						</ResponsiveContainer>

						<Grid container spacing={2} sx={{ width: '100%', maxWidth: 600, mt: 2 }}>
							{PokemonDetail.stats.map((s) => (
								<Grid key={s.stat.name} size={{ xs: 6 }}>
									<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
										<Typography variant='caption' color='text.secondary'>
											{statsTranslation[s.stat.name]}
										</Typography>
										<Typography variant='caption' sx={{ fontWeight: 'bold' }}>
											{s.base_stat}
										</Typography>
									</Box>
									<LinearProgress
										variant='determinate'
										value={(s.base_stat / 255) * 100}
										color={s.base_stat > 100 ? 'success' : 'primary'}
										sx={{
											height: 6,
											borderRadius: 5,
											bgcolor: '#333',
										}}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
				</CustomTabPanel>

				<CustomTabPanel value={tabValue} index={2}>
					<Box sx={{ height: 500, width: '100%' }}>
						<DataGrid
							rows={rows}
							columns={columns}
							initialState={{
								pagination: { paginationModel: { pageSize: 10 } },
							}}
							pageSizeOptions={[10, 25, 50]}
							disableRowSelectionOnClick
							localeText={esES.components.MuiDataGrid.defaultProps.localeText}
							sx={{
								border: 'none',
								color: '#FFF',
								fontFamily: 'Orbitron',
								'& .MuiDataGrid-cell': {
									borderBottom: '1px solid #333',
								},
								'& .MuiDataGrid-columnHeaders': {
									backgroundColor: '#151515',
									borderBottom: '2px solid #D32F2F',
									color: '#D32F2F',
									fontSize: '1.1rem',
								},
								'& .MuiDataGrid-footerContainer': {
									borderTop: '1px solid #333',
									backgroundColor: '#151515',
								},
								'& .MuiTablePagination-root': {
									color: '#FFF',
								},
								'& .MuiTablePagination-selectIcon': {
									color: '#FFF',
								},
								'& ::-webkit-scrollbar': {
									width: '10px',
									height: '10px',
								},
								'& ::-webkit-scrollbar-track': {
									background: '#0a0a0a',
									borderRadius: '0px',
								},
								'& ::-webkit-scrollbar-thumb': {
									background: '#333',
									borderRadius: '5px',
									border: '2px solid #0a0a0a',
								},
								'& ::-webkit-scrollbar-thumb:hover': {
									background: '#D32F2F',
								},
								'& ::-webkit-scrollbar-corner': {
									background: '#0a0a0a',
								},
							}}
						></DataGrid>
					</Box>
				</CustomTabPanel>
			</Paper>
		</Container>
	);
};

export default Details;
