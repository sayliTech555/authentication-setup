export function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  
 export function validatePhoneNumber(phoneNumber) {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  }
  
 export function validateName(name) {
    const re = /^[a-zA-Z\s\-']+$/;
    return re.test(name);
}


export const validateCriteria = [
    { regex: /.{8,}/, message: "Password must be at least 8 characters long" },
    {
      regex: /[a-z]/,
      message: "Password must contain at least one lowercase letter",
    },
    {
      regex: /[A-Z]/,
      message: "Password must contain at least one uppercase letter",
    },
    { regex: /\d/, message: "Password must contain at least one number" },
    {
      regex: /[@$!%*?&#]/,
      message: "Password must contain at least one special character",
    },
  ];

  export const validatePassword = (password) => {
    for (const criteria of validateCriteria) {
        
      if (!criteria.regex.test(password)) {
        console.log("message",criteria.message)
        return criteria.message;
      }
    }
    return "";
  };