
 const getDistanceInKM = function (lat1, lon1, lat2, lon2) {
    if(lat1 === lat2 && lon1 === lon2) return 0;
    const radianeslat1 = (lat1/180)*Math.PI
    const radianeslat2 = (lat2/180)*Math.PI
    const radianeslon1= (lon1/180)*Math.PI
    const radianeslon2= (lon2/180)*Math.PI
    const dlat= radianeslat2 - radianeslat1
    const dlon= radianeslon2 - radianeslon1
    const rEarth= 6371.0
      let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(radianeslat1) * Math.cos(radianeslat2)* Math.pow(Math.sin(dlon / 2),2);       
      let distance = 2 *rEarth* Math.asin(Math.sqrt(a));
     return distance 
  } 

  module.exports = getDistanceInKM