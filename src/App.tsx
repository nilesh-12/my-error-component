import { WarningRounded, ErrorRounded, ReportRounded, NewReleasesRounded, InfoRounded, DoneRounded, CloseRounded } from "@mui/icons-material";
import { Alert, Box, Button, Container, FormControl, FormControlLabel, FormLabel, IconButton, Paper, Popper, Radio, RadioGroup, Select, Slide, ToggleButton, ToggleButtonGroup, createTheme, styled } from "@mui/material";
import React from "react";

const Icons = {
  info: InfoRounded,
  newReleases: NewReleasesRounded,
  report: ReportRounded,
  error: ErrorRounded,
  warning: WarningRounded,
  done: DoneRounded
}

const theme = createTheme({
  transitions: {
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    }
  },
});

export function AlertFloatingBottom({
  icon,
  open,
  onClose,
  onOk,
  children
}: {
  icon: keyof typeof Icons;
  open: boolean;
  children?: React.ReactNode;
  onClose?: Function;
  onOk?: Function;
}) {
  const actionCloseLabel = "Cancel";
  const actionOkLabel = "OK";
  function handleActionCloseClick() { onClose?.(); }
  function handleActionOkClick() { onOk?.(); }
  const Icon = Icons[icon];
  const severity = icon === 'error' ?
    'error' : icon === 'warning' ?
      'warning' : icon === 'done' ?
        'success' : 'info'
  const actionCloseElement = <Button variant="outlined" color="inherit" sx={{ borderRadius: 2 }} onClick={handleActionCloseClick}>{actionCloseLabel}</Button>
  const actionOkElement = <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={handleActionOkClick}>{actionOkLabel}</Button>
  const anchorEl = React.useRef()
  const id = 'floatingbottomcomponent'
  return <>
    <Box aria-describedby={id} ref={anchorEl} sx={{
      position: 'absolute', bottom: 0, width: "100%", left: 0, right: 0, overflow: 'hidden', height: 25,
      opacity: open ? 1 : 0,
      // border: `1px solid ${theme.palette[severity].main}`,
      // background: 'linear-gradient(0deg, rgba(154,154,154,0.6) 0%, rgba(255,255,255,0) 90%)',
      background: `linear-gradient(0deg, ${theme.palette[severity].main}30 0%, rgba(255,255,255,0) 90%)`,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      transitionProperty: 'opacity',
      transitionDuration: `${theme.transitions.duration.short}ms`,
    }} />
    <Popper id={id} open={open} transition placement="bottom" anchorEl={anchorEl.current}>{({ TransitionProps }) =>
      <Slide {...TransitionProps} direction="up" timeout={theme.transitions.duration.short} easing={{
        enter: theme.transitions.easing.easeOut,
        exit: theme.transitions.easing.easeOut
      }}>
        <Alert severity={severity} icon={<Icon />} onClose={handleActionCloseClick}>
          <Box mx={1}>{children}</Box>
        </Alert>
      </Slide>}
    </Popper>
  </>
}


export function PaperFloatingBottom({
  icon,
  open,
  onClose,
  onOk,
  children
}: {
  icon: keyof typeof Icons;
  open: boolean;
  children?: React.ReactNode;
  onClose?: Function;
  onOk?: Function;
}) {
  const actionCloseLabel = "Cancel";

  const actionOkLabel = "OK";
  function handleActionCloseClick() { onClose?.(); }
  function handleActionOkClick() { onOk?.(); }
  const Icon = Icons[icon];
  const severity = icon === 'error' ?
    'error' : icon === 'warning' ?
      'warning' : icon === 'done' ?
        'success' : 'info'
  const actionCloseElement =
    <Button variant="outlined" color="inherit" sx={{ borderRadius: 2 }} onClick={handleActionCloseClick}>{actionCloseLabel}</Button>
  const actionCloseIcon =
    <IconButton color="inherit" sx={{ borderRadius: 2 }} onClick={handleActionCloseClick}>
      <CloseRounded />
    </IconButton>

  const actionOkElement =
    <Button variant="outlined" color={severity} sx={{ borderRadius: 2 }} onClick={handleActionOkClick}>{actionOkLabel}</Button>
  const anchorEl = React.useRef()
  const id = 'floatingbottomcomponent'
  return <>
    <Box aria-describedby={id} ref={anchorEl} sx={{
      position: 'absolute', width: "100%", left: 0, right: 0, bottom: 0, overflow: 'hidden', height: 25, opacity: open ? 1 : 0,
      // background: 'linear-gradient(0deg, rgba(154,154,154,0.6) 0%, rgba(255,255,255,0) 90%)',
      background: `linear-gradient(0deg, ${theme.palette[severity].main}30 0%, rgba(255,255,255,0) 90%)`,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      transitionProperty: 'opacity',
      transitionDuration: `${theme.transitions.duration.short}ms`
    }} />
    <Popper id={id} open={open} transition anchorEl={anchorEl.current}>{({ TransitionProps }) =>
      <Slide {...TransitionProps} direction="up" timeout={theme.transitions.duration.short} easing={{
        enter: theme.transitions.easing.easeInOut,
        exit: theme.transitions.easing.easeInOut
      }}>
        <Paper sx={{
          p: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 3,
          border: `1px solid ${theme.palette[severity].light}`,
          // backgroundColor: `${theme.palette[severity].light}`,
          // color: `${theme.palette[severity].contrastText}`
        }}>
          {/* icon container */}
          <Box mx={1}><Icon color={severity} /></Box>
          {/* content container */}
          <Box mx={1}>{children}</Box>
          {/* action container */}
          <Box mx={1} display="flex" justifyContent="center" alignItems="center" gap={1}>{actionOkElement}{onClose ? actionCloseIcon : actionCloseElement}</Box>
        </Paper>
      </Slide>}
    </Popper>
  </>
}


export function ErrorToggleButton({
  defaultValue: alignment,
  onChange
}: {
  defaultValue?: string;
  onChange?: (value: string) => void
}) {
  // const [alignment, setAlignment] = React.useState(defaultValue);

  const values = ['Open', 'Close']

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    // setAlignment(newAlignment);
    onChange?.(newAlignment)
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {values.map(value => <ToggleButton value={value}>{value}</ToggleButton>)}
    </ToggleButtonGroup>
  );
}

export function MyCustomError() {
  return <Box>
    Jugal sir jindabad
  </Box>
}

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export function RadioButtons({ values, label, defaultValue, onChange }: { values: string[], label: string, defaultValue: string; onChange: Function }) {
  return (
    <FormControl>
      <FormLabel id="demo-customized-radios">{label}</FormLabel>
      <RadioGroup
        defaultValue={defaultValue}
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
        onChange={onChange}
      >
        {values.map(value => <FormControlLabel value={value} control={<BpRadio />} label={value} />)}
      </RadioGroup>
    </FormControl>
  );
}

function App() {
  const [open, setOpen] = React.useState(false)
  const [openAlert, setOpenAlert] = React.useState(false)

  const [selectedIcon, setSelectedValue] = React.useState<keyof typeof Icons>('info');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.currentTarget.value as keyof typeof Icons);
  };
  return (
    <Container>
      <Box>
        <RadioButtons values={Object.keys(Icons)} onChange={handleChange} defaultValue="info" label="Select Icon" />
      </Box>
      <Box>
        Alert-Floating-Bottom: <ErrorToggleButton defaultValue={openAlert ? 'Open' : 'Close'} onChange={value => setOpenAlert(value?.toLowerCase() === "open")} />
      </Box>
      <Box>
        Paper-Floating-Bottom: <ErrorToggleButton defaultValue={open ? 'Open' : 'Close'} onChange={value => setOpen(value?.toLowerCase() === "open")} />
      </Box>
      <AlertFloatingBottom open={openAlert} icon={selectedIcon} onClose={() => setOpen(false)}>
        <MyCustomError />
      </AlertFloatingBottom>
      <PaperFloatingBottom open={open} icon={selectedIcon} onClose={() => setOpen(false)}>
        <MyCustomError />
      </PaperFloatingBottom>
    </Container>
  )
}

export default App
