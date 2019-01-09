import variable from './../variables/platform';

export default (variables = variable) => {
	const thumbnailTheme = {
		'.square': {
			borderRadius: 0,
			'.small': {
				width: 36,
				height: 36,
				borderRadius: 0,
			},
			'.large': {
				width: 80,
				height: 80,
				borderRadius: 0,
			},
			'.Xlarge': {
				width: 150,
				height: 150,
				borderRadius: 0,
			},
		},
		'.small': {
			width: 36,
			height: 36,
			borderRadius: 18,
			'.square': {
				borderRadius: 0,
			},
		},
		'.large': {
			width: 80,
			height: 80,
			borderRadius: 40,
			'.square': {
				borderRadius: 0,
			},
		},
		'.Xlarge': {
			width:  175,
			height: 175,
			borderRadius: 40,
			'.square': {
				borderRadius: 0,
			},
		},
		'.mediumTeam': {
			width: 65,
			height: 65,
			borderRadius: 10,
			'.square': {
				borderRadius: 0,
			},
		},
		width: 56,
		height: 56,
		borderRadius: 28,
	};

	return thumbnailTheme;
};
