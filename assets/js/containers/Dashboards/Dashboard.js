import React, {lazy, Suspense } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Tab, Tabs} from '@material-ui/core';
import Spinner from '../../components/Spinner/Spinner';
import AppsIcon from '@material-ui/icons/Apps';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PetsIcon from '@material-ui/icons/Pets';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SettingsIcon from '@material-ui/icons/Settings';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

const HomeDashboard = lazy(() => import('./HomeDashboard/HomeDashboard'));
const LightsDashboard = lazy(() => import('./LightsDashboard/LightsDashboard'));
const PetsDashboard =  lazy(() => import('./PetsDashboard/PetsDashboard'));

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    padding: 0,
    margin: 0,
    "& > div": {
      padding: 0,
      margin: 0,
    }
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const tabs = [
    {
      icon: <AppsIcon />,
      label: "Home",
      path: "/",
      component: HomeDashboard
    },
    {
      icon: <WbIncandescentIcon />,
      label: "Lights",
      path: "/lights",
      component: LightsDashboard
    },
    {
      icon: <MenuBookIcon />,
      label: "recipes",
      path: "/recipes"
    },
    {
      icon: <PetsIcon />,
      label: "pets",
      path: "/pets",
      component: PetsDashboard
    },
    {
      icon: <ScheduleIcon />,
      label: "calendar",
      path: "/calendar"
    },
    {
      icon: <SettingsIcon />,
      label: "settings",
      path: "/settings"
    }
  ]

  const [value, setValue] = React.useState(
    tabs.findIndex((t) => {
      return t.path === location.pathname
    })
  );

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
        <AppBar position="static">
          <Tabs
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            {tabs.map((tab, index) => (
              <Tab
                key={tab.path}
                icon={tab.icon}
                label={tab.label}
                to={tab.path}
                component={Link} 
                value={index}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </AppBar>
        <main className={classes.main}>
          <Container>
            <Switch>
              {tabs.map((tab, index) => (
                <Route exact path={tab.path} key={tab.path}>
                  <div
                    index={index} 
                    value={value}
                    role="tabpanel"
                    hidden={value !== index}
                    id={`nav-tabpanel-${index}`}
                    aria-labelledby={`nav-tab-${index}`}
                  >
                    {value === index && (
                      tab.component == null ? '' : React.createElement(tab.component)
                    )}
                  </div>
                </Route>
              ))}
            </Switch>
          </Container>
        </main>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
