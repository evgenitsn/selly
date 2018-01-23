export default function(values) {
  const errors = {};
  const requiredFields = [
    'username',
    'email',
    'password',
    'repeatPassword',
    'title',
    'category',
    'description',
    'price',
    'itemCondition',
    'location',
    'contactName',
    'phone'
  ];
  
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if(values.username && values.username.length < 3) {
    errors.username = "Username must be at least 3 chars"
  }
  if(values.password && values.password.length < 6){
    errors.password = "Password must be at least 6 chars"
  }
  if(values.repeatPassword && values.repeatPassword.length < 6){
    errors.repeatPassword = "Password must be at least 6 chars"
  }
  if(values.password && values.repeatPassword && values.password !== values.repeatPassword) {
    errors.repeatPassword = "Passwords must be identical"
  }
  return errors
}