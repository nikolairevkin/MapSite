<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\User;

class UserController extends Controller
{
    private $status_code = 200;

    public function userSignUp(Request $request) {
        $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required|email",
            "phone" => "required",
            "password" => "required",
        ]);

        if($validator->fails()) {
            return response()->json(["status" => 'faild', "message" => "validation faild", "error" => $validator->error()]);
        }

        $name = $request->name;
        $explodedName = explode(" ", $name);
        $first_name = $explodedName[0];
        $second_name = "";

        if(isset($explodedName[1])) {
            $second_name = $explodedName[1];
        }

        $userDataArray = array(
            'first_name' => $first_name,
            'second_name' => $second_name,
            'full_name' => $name,
            'email' => $request->email,
            'password' => md5($request->password),
            'phone' => $request->phone,
        );

        $user_status = User::where("email", $request->email)->first();

        if(!is_null($user_status)) {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! email already registered"]);
        }

        foreach ($userDataArray as $key => $value) {
            echo $key, $value;
        }

        $user = User::insert($userDataArray);

        if(!is_null($user)) {
            return response()->json(['status' => $this->status_code, "success" => true, "message" => "Registeration completed successfully", "data" => $user]);
        } else {
            return response()->json(['status' => "failed", "success" => false, "message" => 'Registration failed!']);
        }
    }

    public function userLogIn(Request $request) {
        $validator = Validator::make($request->all(),
            [
                "email" => "required|email",
                "password" => "required"
            ]
        );

        if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }

        $email_status = User::where("email", $request->email)->first();

        if(!is_null($email_status)) {
            $password_status = User::where("email", $request->email)->where("password", md5($request->password))->first();

            // if password is correct
            if(!is_null($password_status)) {
                $user = $this->userDetail($request->email);

                return response()->json(["status" => $this->status_code, "success" => true, "message" => "You have logged in successfully", "data" => $user]);
            }

            else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Incorrect password."]);
            }
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Email doesn't exist."]);
        }
    }

    public function userDetail($email) {
        $user = array();
        if($email != "") {
            $user = User::where('email', $email)->first();
            return $user;
        }
    }
}
