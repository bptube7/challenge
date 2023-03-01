import moment from 'moment';

//FORMAT DATE WITH MOMENT
export const formattedDate = ({value}) => {
  return moment(value, 'YYYY/MM/DD HH:mm:ss').format('DD/MM/YYYY');
}

//FORMAT TIME WITH MOMENT
export const formattedTime = ({value}) => {
  return moment.unix(value).utcOffset(0, false).format('HH:mm:ss');
}