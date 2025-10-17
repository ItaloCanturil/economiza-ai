import { useNavigate } from "react-router";
import { Navbar01, type Navbar01NavLink } from "./shadcn-io/navbar-01";

const defaultNavigationLinks: Navbar01NavLink[] = [
	{ href: "#", label: "Home", active: true },
	{ href: "#features", label: "Features" },
	{ href: "#pricing", label: "Preço" },
	{ href: "#about", label: "Sobre" },
];

const Header = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Navbar01
				navigationLinks={defaultNavigationLinks}
				ctaText="Experimentar"
				onSignInClick={() => navigate("/login")}
				onCtaClick={() => navigate("/register")}
			/>
		</div>
	);
};

export default Header;
