export const generateRandom = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  ).toString();
};

/**
 * Converts timestamp to JavaScript date,
 * then formats and returns the date.
 * Example:
 * 1) 1508575774651 convert to Sat Oct 21 2017 Sat Oct 21 2017 16:49:34
 * 2) Sat Oct 21 2017 Sat Oct 21 2017 16:49:34 format to 21 October 2017
 *
 * @param {timestamp} Valid JavaScript Timestamp
 */
export const dateFormatter = (timestamp) => {
  let convertDate = new Date(timestamp).toString();
  let splitDate = convertDate.split(' ');

  let formatDate = splitDate[2] + ' ' + monthInFull(splitDate[1]) + ' ' + splitDate[3];
  return formatDate;
};

const monthInFull = (month) => {
  switch (month.toLowerCase()) {
    case 'jan':
      return 'January';
    case 'feb':
      return 'Febuary';
    case 'mar':
      return 'March';
    case 'apr':
      return 'April';
    case 'may':
      return 'May';
    case 'jun':
      return 'June';
    case 'jul':
      return 'July';
    case 'aug':
      return 'August';
    case 'sep':
      return 'September';
    case 'oct':
      return 'October';
    case 'nov':
      return 'November';
    case 'dec':
      return 'December';
    default:
      return null;
  }
};

