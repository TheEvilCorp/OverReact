export default function(string) {
  let output = '';

  //loop through and convert words separated by spaces or underscores to Pascal case
  for ( let i = 0; i < string.length; i++ ) {
    if ( i === 0 ) {
      output += string[i].toUpperCase();
    } else if ( string[i] === ' ' || string[i] === '_' ) {
      if ( string[i + 1] ) output += string[i + 1].toUpperCase();
      i++;
    } else {
      output += string[i];
    }
  }

  return output;
}
