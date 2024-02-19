<?php
// Connect to the database
$db = new PDO('pgsql:host=localhost;dbname=profitpro_db', 'username', 'password');

// Check for form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encrypt the password

  // Insert the user into the database
  $query = $db->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
  $result = $query->execute([$email, $password]);

  if ($result) {
    echo 'Signup successful!';
  } else {
    echo 'An error occurred.';
  }
}
?>
