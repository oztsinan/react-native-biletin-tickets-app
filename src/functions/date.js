const date = (tarih) => {
  var yil = tarih.substr(0, 4);
  var ay = tarih.substr(5, 2);
  var gun = tarih.substr(tarih.length - 2, tarih.length);

  switch (ay) {
    case "01":
      ay = "Ocak";
      break;
    case "02":
      ay = "Şubat";
      break;
    case "03":
      ay = "Mart";
      break;
    case "04":
      ay = "Nisan";
      break;
    case "05":
      ay = "Mayıs";
      break;
    case "06":
      ay = "Haziran";
      break;
    case "07":
      ay = "Temmuz";
      break;
    case "08":
      ay = "Ağustos";
      break;
    case "09":
      ay = "Eylül";
      break;
    case "10":
      ay = "Ekim";
      break;
    case "11":
      ay = "Kasım";
      break;
    case "12":
      ay = "Aralık";
      break;
    default:
      break;
  }

  return gun + " " + ay + " " + yil;
};

export default date;
