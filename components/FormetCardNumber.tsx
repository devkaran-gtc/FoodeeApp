export function formatCardNumber(cardNumber:any) {
    cardNumber = cardNumber.toString();
        if (cardNumber.length >= 16) {
      return cardNumber.substring(0, 4) + ' **** **** ' + cardNumber.substring(cardNumber.length - 4);
    } else {
      return cardNumber;
    }
  }