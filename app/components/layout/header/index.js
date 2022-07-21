import { AppBar, Avatar, Box, Hidden, Menu, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { PowerSettingsNew, AccountCircle } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { H5, H6, MenuItem, ListItemIcon } from 'components';
import { useGoogleLogout } from 'react-google-login';
import { useQueryClient } from 'react-query';
import { useAuthContext } from '../../../context/authContext';
import Logo from '../../../images/logo.png';
import { navigateTo } from '../../../utils/helper';
import Show from '../../show';
import Websocket from '../../webSocket/webSocket';
import { APP_MODULE } from '../../../utils/constants';
import AppNotification from '../../appNotification';
import { colors } from '../../../theme/colors';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    height: theme.defaultHeights.header,
    color: theme.palette.primary.main,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: { display: 'flex', justifyContent: 'space-between' },
  title: {
    flexGrow: 1,
  },
  logoStyle: {
    width: 150,
    marginTop: theme.spacing(3.3),
  },
  profileBox: {
    display: 'flex',
    position: 'relative',
    top: '10px',
  },
  titleBox: { display: 'flex', marginInline: '1em', alignItems: 'flex-end' },
  welcomeTextBox: { marginTop: '0.2rem' },

  appNotifications: {
    marginTop: '26px',
    padding: 0,
    '& .MuiPaper-rounded': {
      borderRadius: 0,
      boxShadow: '-1px 5px 5px rgba(0,0,0,.2)',
      borderTop: '1px solid #e6e2e2',
    },
    '& .MuiList-root': {
      margin: 0,
      padding: 0,
    },
    '& .MuiListItem-root': {
      margin: 0,
      padding: 0,
    },
    '& .MuiListItem-root:last-child > div': {
      border: 'none',
    },
    '& .MuiListItem-root:first-child > div': {},
  },
  appNotificationsHead: {
    borderBottom: '1px solid #e6e2e2',
    '&::before': {
      content: 'test',
    },
  },
  appNotificationsFooter: {
    display: 'inline-block',
    marginTop: '15px !important',
    marginBottom: '15px !important',
    marginLeft: '20px !important',
    borderBottom: '1px solid #e6e2e2',
  },
  readAllLink: {
    textDecoration: 'none',
    color: colors.primary,
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificaitonEl, setNotificaitonEl] = useState(null);
  const { user, setUser } = useAuthContext();
  const { data } = user;
  const queryClient = useQueryClient();
  const userAvatar = user.data.avatar;
  const clientId = process.env.GOOGLE_CLIENT_ID;

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificaitonEl(null);
  };
  const handleClickProfile = () => {
    navigateTo(history, '/profile');
    setAnchorEl(null);
  };

  // INITIALIZING
  useGoogleLogout({
    clientId,
    cookiePolicy: 'single_host_origin',
  });
  const onGoogleLogout = () => {
    const auth2 = window.gapi?.auth2?.getAuthInstance();
    if (auth2 != null) {
      auth2.signOut().then(auth2.disconnect());
    }
  };
  const handleLogout = () => {
    const unAuthenticatedUser = {
      announcement: [],
      data: {},
      isAuthenticated: false,
      token: null,
    };
    setUser(unAuthenticatedUser);
    onGoogleLogout();

    queryClient.removeQueries();
  };
  if (user.data.role) {
    handleLogout();
  }

  const notificationsData = [
    {
      avatar: true,
      time: 'About an hour ago',
      message: 'Josh Lamoureaux completed the course, Service: Calendars',
      link: '/',
      highlightText: 'Calendars',
    },
    {
      avatar: true,
      time: 'About an hour ago',
      message: 'Josh Lamoureaux completed the course, Service: Calendars',
      link: '/',
      highlightText: 'course',
    },
    {
      avatar: true,
      time: 'About an hour ago',
      message: 'Josh Lamoureaux completed the course, Service: Calendars',
      link: '/',
      highlightText: 'Lamoureaux',
      isRead: true,
    },
    {
      avatar: true,
      time: 'About an hour ago',
      message: 'Josh Lamoureaux completed the course, Service: Calendars',
      link: '/',
      highlightText: 'course',
      isRead: true,
    },
    {
      avatar: true,
      time: 'About an half and hour ago',
      message: 'Josh Lamoureaux completed the course, Service: Calendars',
      link: '/',
      highlightText: 'Service',
      isRead: true,
    },
  ];

  return (
    <>
      <Show IF={!data.isAdmin}>
        <Websocket />
      </Show>

      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Link to={`/${APP_MODULE.CENTRAL_POINT}/home`}>
            <img src={Logo} alt="intranet logo" className={classes.logoStyle} />
          </Link>
          <Show IF={user.isAuthenticated}>
            <Box display="flex" justifyContent="end">
              <Box className={classes.profileBox}>
                <Hidden smDown>
                  <Box className={classes.titleBox} alignSelf="center">
                    <Box className={classes.welcomeTextBox} mr={2}>
                      <H6 regular color="primary">
                        Welcome Back
                      </H6>
                    </Box>
                    <H5 medium color="primary">
                      {user.data.name}!
                    </H5>
                  </Box>
                </Hidden>

                <>
                  <Menu
                    id="notification-menu"
                    anchorEl={notificaitonEl}
                    keepMounted
                    open={Boolean(notificaitonEl)}
                    onClose={handleClose}
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    className={classes.appNotifications}
                  >
                    <Box
                      display="flex"
                      width={500}
                      p={5}
                      bgcolor="white"
                      className={classes.appNotificationsHead}
                    >
                      <Box flexGrow={1}>
                        <H5>Notifications</H5>
                      </Box>
                      <Box>
                        <Link href="/" className={classes.readAllLink}>
                          Mark all as read
                        </Link>
                      </Box>
                    </Box>

                    {notificationsData?.map((notification) => (
                      <MenuItem>
                        <AppNotification
                          isRead={notification?.isRead}
                          time={notification.time}
                          message={notification.message}
                          link={notification.link}
                          highlightText={notification.highlightText}
                        />
                      </MenuItem>
                    ))}
                    <MenuItem className={classes.appNotificationsFooter}>
                      <Box display="flex" justifyContent="center" width="100%">
                        <Button variant="contained" color="secondary">
                          View All
                        </Button>
                      </Box>
                    </MenuItem>
                  </Menu>

                  <Box alignSelf="center">
                    <Button onClick={handleClick}>
                      <Avatar src={userAvatar} />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      elevation={0}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                    >
                      <MenuItem onClick={handleClickProfile}>
                        <ListItemIcon>
                          <AccountCircle />
                        </ListItemIcon>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <PowerSettingsNew />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
              </Box>
            </Box>
          </Show>
        </Toolbar>
      </AppBar>
    </>
  );
}
