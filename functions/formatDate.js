function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

const formatDate = function(date){
        return [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('-');
}

module.exports = formatDate