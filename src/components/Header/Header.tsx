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
import { IconButton, Popper } from "@mui/material";
import { supabase } from "@/api/supabase";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setPackage } from "@/hooks/redux/packageSlice";
import { setNileCruise } from "@/hooks/redux/cruiseSlice";
import { setActive } from "@/hooks/redux/homeSlice";
import { useLanguageAwareNavigate, useLanguageSwitch } from "@/i18n";
import { useTranslation } from "react-i18next";
import { MenuIcon } from "lucide-react";
import Drawer from "@mui/material/Drawer";

interface SubLinkItem {
  name: string;
  id: string;
}

interface SubLink {
  title: string;
  id: string;
  subLinks: SubLinkItem[];  // Updated to hold objects instead of strings
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
  const listRef = useRef<HTMLUListElement>(null);
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
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const toggleMobileDrawer = () => {
    setMobileOpen(!mobileOpen);
  };
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
    setActiveLink((prev)=> prev === link ? "" : link);
    console.log(link);
    if(["Egypt","Saudi Arabia","Dubai","Jordan"].includes(link)) 
      {
        filterByPlace(link)
        setMobileOpen(false);
      }
    if(link === "Nile Cruises") 
      {navigate(`/nile-cruises`); setMobileOpen(false);
      }
    if(link === "All Packages")
       {navigate(`/packages`); setMobileOpen(false);
       }
    if (link === "Create Your Tour") 
      {navigate(`/create`);  setMobileOpen(false);
      }
    if (link === "About All Royal Travel" )
       {navigate(`/about`);  setMobileOpen(false);
       }
    if (link === "Privacy Policy") 
      {navigate(`/privacy-policy`);  setMobileOpen(false);
      }
    if(link === "Our Partners") 
      {navigate(`/our-partners`); setMobileOpen(false);
      }
    if( link === "Become Our Partner" ) 
      {navigate(`/become-our-partner`); setMobileOpen(false);
      }
    if (link === "Global Code of Ethics for Tourism") 
      {navigate(`/global-code-of-ethics`);  setMobileOpen(false);
      }
    if (link === "Terms and Conditions") 
      {navigate(`/terms-and-conditions`);  setMobileOpen(false);
      }
    
    
  }
  const handleNestedClick = (index: number) => {
    setNestedOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const links: Links = {
    Destinations: [
      { title: "Egypt", id: "egypt", subLinks: [] },
      { title: "Dubai", id: "dubai", subLinks: [] },
      { title: "Saudi Arabia", id: "saudi-arabia", subLinks: [] },
      { title: "Jordan", id: "jordan", subLinks: [] },
    ],
    Packages: [
      { title: "All Packages", id: "all-packages", subLinks: [] },
      {
        title: "Egypt's Packages",
        id: "egypt-packages",
        subLinks: packages
          .filter((pkg) => pkg?.countries?.includes("Egypt"))
          .map((pkg) => ({
            name: pkg.package_name,
            id: pkg.id,
          })),
      },
      {
        title: "Jordan's Packages",
        id: "jordan-packages",
        subLinks: packages
          .filter((pkg) => pkg?.countries?.includes("Jordan"))
          .map((pkg) => ({
            name: pkg.package_name,
            id: pkg.id,
          })),
      },
      {
        title: "Dubai's Packages",
        id: "dubai-packages",
        subLinks: packages
          .filter((pkg) => pkg?.countries?.includes("Dubai"))
          .map((pkg) => ({
            name: pkg.package_name,
            id: pkg.id,
          })),
      },
      {
        title: "Saudi Arabia's Packages",
        id: "saudi-packages",
        subLinks: packages
          .filter((pkg) => pkg?.countries?.includes("Saudi Arabia"))
          .map((pkg) => ({
            name: pkg.package_name,
            id: pkg.id,
          })),
      },
    ],
    "Nile Cruises": [],
    "Create Your Tour": [],
    "About Us": [
      { title: "About All Royal Travel", id: "about", subLinks: [] },
      { title: "Our Partners", id: "partners", subLinks: [] },
      { title: "Become Our Partner", id: "become-partner", subLinks: [] },
      { title: "Terms and Conditions", id: "terms", subLinks: [] },
      { title: "Privacy Policy", id: "privacy", subLinks: [] },
      { title: "Global Code of Ethics for Tourism", id: "ethics", subLinks: [] },
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
      <div className="conatiner w-[90vw]  mx-auto">
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
          <IconButton
          edge="start"
    
          aria-label="menu"
          
          sx={{ display: { xs: "block", md: "none" } ,color:"white"}}
          onClick={toggleMobileDrawer}
        >
          <MenuIcon />
        </IconButton>
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
          <div className="hidden md:flex gap-4">
            {Object.keys(links).map((link) => (
              <Button
                key={link}
                color="inherit"
                sx={{ fontSize: "0.875rem" }}
                className={`${activeLink === link ? "bg[#0c2340]-700" : "bg[#0c2340]"}`}
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
                {t(link)}
              </Button>
            ))}
          </div>

          {/* Buttons and Language Container */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              variant="contained"
              sx={{ display:{ xs: "none", md: "block" },backgroundColor: "#044d88", fontSize: "0.875rem" }}
              onClick={() => navigate("/create")}
            >
              {t("Book With Us")}
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
          maxHeight:"300px",
          width:"350px",
          overflow: "auto",
          padding: "5px 10px",
        }}
      >
        <List onMouseLeave={() => setDialogOpen(false)}>
          {dialogContent.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                component={"button"}
                onClick={() => ["Egypt","Saudi Arabia","Dubai","Jordan"].includes(item.title) ?filterByPlace(item.title):handleNestedClick(index)}
                
              >
                <ListItemText primary={t(item.title)}  onClick={()=> item.subLinks.length == 0 && handleNavigation(item.title)}/>
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
                      onClick={() => {
                        navigate("/packages/" + subItem.id);
                        window.location.reload();
                      }}
                    >
                      <ListItemText primary={t(subItem.name)} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Popper>
      <Drawer anchor="left" open={mobileOpen} onClose={toggleMobileDrawer}>
  <List sx={{ width: 250, backgroundColor: "#0c2340", height: "100%", color: "white" }} className="flex flex-col justify-content-center">
    {Object.keys(links).map((link, index) => (
      <React.Fragment key={index}>
        <ListItem component={"button"} onClick={() => handleNavigation(link)}>
          <ListItemText primary={t(link)} />
          {links[link].length > 0 ? activeLink === link ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>
        {links[link].length > 0 && (
          <Collapse in={activeLink === link} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {links[link].map((subLink, subIndex) => (
                <ListItem
                  component={"button"}
                  key={subIndex}
                  sx={{ pl: 4 }}
                  onClick={() => handleNavigation(subLink.title)}
                >
                  <ListItemText primary={t(subLink.title)} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ))}
    <Button
      variant="contained"
      sx={{ backgroundColor: "#007bff", width: "80%", margin: "20px auto" }}
      onClick={() => navigate("/create")}
    >
      {t("Book With Us")}
    </Button>
  </List>
</Drawer>
    </AppBar>
  );
}

export default Header;
