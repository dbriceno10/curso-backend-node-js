const esBisiesto = (year) => {
  if (year % 400 === 0) {
    console.log('Es biciesto');
  } else if (year % 4 === 0 && year !== 0) {
    console.log('Es biciesto');
  } else {
    console.log('No es Biciesto');
  }
};

esBisiesto(2000);
esBisiesto(2001);
esBisiesto(2004);
esBisiesto(2100);
