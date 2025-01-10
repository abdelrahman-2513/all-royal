import React, { useCallback, useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Logo from "@/assets/homeImages/Logooo.png";
import { Popper } from "@mui/material";
import { supabase } from "@/api/supabase";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setPackage } from "@/hooks/redux/packageSlice";
import { setNileCruise } from "@/hooks/redux/cruiseSlice";
import { setActive } from "@/hooks/redux/homeSlice";
import { useLanguageAwareNavigate, useLanguageSwitch } from "@/i18n";
import { useTranslation } from "react-i18next";

interface SubLink {
  title: string;
  subLinks: string[];
}

interface Links {
  [key: string]: SubLink[];
}

function Header() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<SubLink[]>([]);
  const [nestedOpen, setNestedOpen] = useState<{ [key: number]: boolean }>({});
  const [dialogAnchor, setDialogAnchor] = useState<null | HTMLElement>(null);
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useLanguageAwareNavigate();
  const changeLanguage = useLanguageSwitch();
  const packages = useAppSelector((state) => state.package.package);
  // const availableLangs = ["en", "pl"];
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("appLang") ?? "en"
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("");
  const fetched = useRef(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  // const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const checkSession = async () => {
    try {
      dispatch(setActive(""));

      const { data: db_packages } = await supabase
        .from(currentLang === "en" ? "packages" : `packages_${currentLang}`)
        .select("*");
      const { data: db_cruises } = await supabase
        .from(
          currentLang === "en" ? "nile_cruises" : `nile_cruises_${currentLang}`
        )
        .select("*");

      if (db_packages && db_packages.length > 0 && !fetched.current) {
        dispatch(setPackage(db_packages));
      }
      if (!fetched.current && db_cruises && db_cruises.length > 0) {
        dispatch(setNileCruise(db_cruises));
      }
      fetched.current = true;
    } catch (error) {
      console.error("Error Fetching From DB : ", error);
    }
  };
  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    checkSession();
  }, [currentLang]);

  const handleClick = (item: any) => {
    navigate(item.path);
  };

  const filterByPlace = (place: string) => {
    // console.log(place);
    dispatch(setActive(place));
    navigate("/packages");
  };

  const handleMouseEnter = (itemName: string) => {
    // console.log(itemName);
    setShowDropdown(true);
    setHoveredItem(itemName);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleDropDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMobileDropdown(!showMobileDropdown);
  };

  const countries = [t("Egypt"), t("Dubai"), t("Jordan"), t("Saudi Arabia")];

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);

  const handleResize = useCallback(() => {
    setIsWideScreen(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  const handleLanguageChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLang = e.target.value;
    changeLanguage(newLang);
    setCurrentLang(newLang);
    await checkSession();
    window.location.reload();
  };
  const handleMenuClick = (
    links: SubLink[],
    link: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
   
    setActiveLink(link);
    setDialogContent(links);
    setDialogAnchor(event.currentTarget);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setActiveLink("");
    setDialogOpen(false);
    setNestedOpen({});
  };
  const handleNavigation = (link: string) => {
    if(link === "Nile Cruises") navigate(`/nile-cruises`);
  }
  const handleNestedClick = (index: number) => {
    setNestedOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const links: Links = {
    Destinations: [
      { title: "Europe", subLinks: ["France", "Italy", "Germany"] },
      { title: "Asia", subLinks: ["Japan", "China", "India"] },
      { title: "Africa", subLinks: ["Egypt", "Kenya", "South Africa"] },
    ],
    Packages: [
      { title: "Standard", subLinks: [] },
      { title: "Premium", subLinks: ["VIP", "Exclusive"] },
      { title: "Luxury", subLinks: ["5-Star Hotels", "Private Jets"] },
    ],
    "Nile Cruises": [ ],
    "Create Your Tour": [
      { title: "Custom Packages", subLinks: [] },
      { title: "Guided Tours", subLinks: [] },
    ],
    "About Us": [
      { title: "Our Story", subLinks: [] },
      { title: "Contact", subLinks: [] },
    ],
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgb(12, 35, 64)",
        height: "90px",
      }}
    >
      <div className="conatiner w-[90vw] mx-auto">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            justifyItems: "center",
            alignItems: "center",
            paddingTop: "10px",
            height: "100%",
          }}
        >
          {/* Logo Container */}
          <div>
            <img
              src={Logo}
              alt="Logo"
              onClick={() => navigate("/")}
              style={{ width: 150, height: "60px", marginRight: 10 }}
            />
          </div>

          {/* Links Container */}
          <div style={{ display: "flex", gap: "15px" }}>
            {Object.keys(links).map((link) => (
              <Button
                key={link}
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
                className={`${activeLink === link ? "bg[gray]" : "bg[#0c2340]"}`}
                onMouseOver={(e) =>
                  activeLink === link
                    ? handleCloseDialog()
                    : handleMenuClick(links[link], link, e)
                }
                onClick={(e) => handleNavigation( link)}
                endIcon={
                  links[link].some((item) => item.subLinks.length > 0) ? (
                    <ExpandMore />
                  ) : null
                }
              >
                {link}
              </Button>
            ))}
          </div>

          {/* Buttons and Language Container */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#044d88", fontSize: "0.875rem" }}
            >
              Book With Us
            </Button>
            <select
              value={currentLang}
              onChange={handleLanguageChange}
              style={{
                color: "white",
                backgroundColor: "#0c2340",
                border: "none",
                fontSize: "0.875rem",
              }}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="pl">pl</option>
            </select>
          </div>
        </Toolbar>
      </div>

      {/* Dialog Popup */}

      <Popper
        open={dialogOpen}
        anchorEl={dialogAnchor}
        sx={{
          background: "#0c2340",
          color: "white",
          borderRadius: "0.5em",
          padding: "5px 10px",
        }}
      >
        <List>
          {dialogContent.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                component={"button"}
                onClick={() => handleNestedClick(index)}
              >
                <ListItemText primary={item.title} />
                {item.subLinks.length > 0 ? (
                  nestedOpen[index] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItem>
              <Collapse in={nestedOpen[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subLinks.map((subItem, subIndex) => (
                    <ListItem
                      component={"button"}
                      key={subIndex}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={subItem} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Popper>
    </AppBar>
  );
}

export default Header;
