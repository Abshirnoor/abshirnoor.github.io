<?php

if (isset($_POST['send']))  {

    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $mailfrom = $_POST['mail'];
    $message = $_POST['message'];

    $mailTo = "abshirceynte9@gmail.com";
    $headers = "from:" ".$mailfrom";
    $txt = "you have received e-mail from".$name.".n\nz".$message;

    mail($mailTo, $subject, $txt, $headers);
    header("location: index.html")
}