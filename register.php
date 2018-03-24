<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="../apicko/style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.4/howler.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div class="container form">
    <h2>Zaregistruj se hned a zdarma!</h2>
    <form class="form-horizontal" method="post">
      <div class="form-group">
        <label class="control-label col-sm-2" for="email"><span class="fa fa-envelope"></span></label>
        <div class="col-sm-10">
          <input type="email" class="form-control" placeholder="Email" name="email">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2"><span class="fa fa-user"></span></label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="Jak ti máme říkat?" name="username">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2"><span class="fa fa-key"></span></label>
        <div class="col-sm-10">
          <input type="password" class="form-control" placeholder="Heslo" name="password">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" name="register" class="btn btn-default">Registuj mě!</button>
        </div>
      </div>
    </form>
  </div>
</body>
</html>
<?php
$conn = mysqli_connect('localhost','root','root','api')  or die(mysql_error());
if(isset($_POST["register"]))
{
  if(empty($_POST["username"]) || empty($_POST["password"]) || empty($_POST["email"]))
  {
    echo '<script>alert("Vyplň prosím všechna pole");</script>';
  }
  else
  {
    $checkU = $_POST["username"];
    $checkP = $_POST["password"];
    if(strlen($checkU) < 2 || strlen($checkP) < 4)
    {
      echo '<script>alert("Jméno nebo heslo musí být delší");</script>';
    }
    else
    {
      $email = mysqli_real_escape_string($conn, $_POST["email"]);
      $username = mysqli_real_escape_string($conn, $_POST["username"]);
      $password = mysqli_real_escape_string($conn, $_POST["password"]);
      $emailValidation = "SELECT email FROM users WHERE email = '$email'";
      $result = mysqli_query($conn,$emailValidation);
      if(mysqli_num_rows($result) != 0)
      {
        echo '<script>alert("Email už používá někdo jiný.");</script>';
      }
      else
      {
        $password = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO users (email,username, password) VALUES('$email','$username', '$password')";
        if(mysqli_query($conn, $query))
        {
          header('location: login.php');
          die();
        }
      }
    }
  }
}
?>
