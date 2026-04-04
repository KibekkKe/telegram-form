<?php

header("Content-Type: application/json");

// RECEIVE PHONE NUMBER
$data = json_decode(file_get_contents("php://input"), true);
$phone = $data["phone"] ?? "";

if(!$phone){
    echo json_encode(["status"=>"error","message"=>"No phone"]);
    exit;
}

// GENERATE OTP
$otp = rand(100000,999999);

// SAVE OTP TEMPORARILY
file_put_contents("otp_$phone.txt", $otp);

// AFRICA'S TALKING SETTINGS
$username = "sandbox"; // keep sandbox first
$apiKey   = "atsk_504c690d169d6a3e3f0b462219c34eea0e50b388092a75d3daeea05692c6a03953b0a27d";

// SMS MESSAGE
$message = "Your verification code is: $otp";

// SEND SMS
$url = "https://api.africastalking.com/version1/messaging";

$postData = http_build_query([
    "username"=>$username,
    "to"=>$phone,
    "message"=>$message
]);

$headers = [
    "apiKey: $apiKey",
    "Content-Type: application/x-www-form-urlencoded"
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
curl_setopt($ch, CURLOPT_POST,true);
curl_setopt($ch, CURLOPT_POSTFIELDS,$postData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);

$response = curl_exec($ch);
curl_close($ch);

echo json_encode([
    "status"=>"success",
    "otp_sent"=>true
]);
?>
