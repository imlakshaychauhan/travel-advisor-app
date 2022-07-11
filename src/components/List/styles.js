import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 220, marginBottom: '30px', width: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    padding: '25px',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '80vh', overflow:"auto", marginTop: "2%", width: "100%"
  },
}));