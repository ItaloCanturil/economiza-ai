import { useNavigate } from "react-router";
import { Navbar01, type Navbar01NavLink } from "./shadcn-io/navbar-01";
import { useAuth } from "../../contexts/AuthContext";
import { Navbar05 } from "./shadcn-io/navbar-05";

const defaultNavigationLinks: Navbar01NavLink[] = [
	{ href: "#", label: "Home", active: true },
	{ href: "#features", label: "Features" },
	{ href: "#pricing", label: "Preço" },
	{ href: "#about", label: "Sobre" },
];

const Header = () => {
	const navigate = useNavigate();
	const { isAuthenticated, user } = useAuth();

	return (
		<div className="relative w-full">
			{!isAuthenticated ? (
				<Navbar01
					navigationLinks={defaultNavigationLinks}
					ctaText="Experimentar"
					onSignInClick={() => navigate("/login")}
					onCtaClick={() => navigate("/register")}
				/>
			) : (
				<Navbar05 userName={user?.name} userEmail={user?.email} />
			)}
		</div>
	);
};

export default Header;
