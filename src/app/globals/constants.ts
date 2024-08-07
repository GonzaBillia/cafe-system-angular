export class Constants{
  //Message
  public static genericError:string = "Something went wrong. Please try again later."
  public static productExistError:string = "Product already exist."
  public static productAdded:string = "Product added successfully."

  public static unauthorized:string = "You are no authorized to access this page."
  //Regex
  public static nameRegex:string = "[a-zA-Z0-9 ]*"
  public static emailRegex:string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"
  public static phoneRegex:string = "[e0-9]{10,10}$"

  //Variable
  public static error:string = "Error"
}