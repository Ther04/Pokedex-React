import { Box } from '@mui/material';

interface tabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export const CustomTabPanel = (props: tabPanelProps) => {
	const { children, value, index, ...other } = props;
	return (
		<div role='tabpanel' hidden={value !== index} {...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
};
