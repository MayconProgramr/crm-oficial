import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { i18n } from "../../translate/i18n";

import { AuthContext } from "../../context/Auth/AuthContext";
import logo from "../../assets/zapsimples.png";

import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const eyeIconStyles = {
	fontSize: '24px', // Tamanho do ícone em pixels
	padding: '4px', // Padding ao redor do ícone em pixels
};

const Login = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [user, setUser] = useState({ email: "", password: "" });

	const { handleLogin } = useContext(AuthContext);

	const handleChangeInput = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handlSubmit = e => {
		e.preventDefault();
		handleLogin(user);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<div>
					<img style={{ margin: "0 auto", height: "80px", width: "100%" }} src={logo} alt="Whats" />
				</div>
				{/*<Typography component="h1" variant="h5">
					{i18n.t("login.title")}
				</Typography>*/}
				<form className={classes.form} noValidate onSubmit={handlSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label={i18n.t("login.form.email")}
						name="email"
						value={user.email}
						onChange={handleChangeInput}
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label={i18n.t("login.form.password")}
						type={showPassword ? "text" : "password"}
						id="password"
						value={user.password}
						onChange={handleChangeInput}
						autoComplete="current-password"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<span onClick={togglePasswordVisibility}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
										style={{
											cursor: isHovered ? 'pointer' : 'default',
											...eyeIconStyles, // Aplica os estilos personalizados
										}}>
										{showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
									</span>
								</InputAdornment>
							),
						}}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{i18n.t("login.buttons.submit")}
					</Button>
					<Grid container>
						<Grid item>
							<Link
								href="#"
								variant="body2"
								component={RouterLink}
								to="/signup"
							>
								{i18n.t("login.buttons.register")}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>{/* <Copyright /> */}</Box>
		</Container>
	);
};

export default Login;
