package com.tigernum.app.data.remote.dto

data class RegisterRequest(
    val name: String,
    val email: String,
    val phone: String
)

data class RegisterResponse(
    val uuid: String,
    val name: String,
    val email: String,
    val phone: String,
    val balance: Double,
    val currency: String
)

data class UserProfileResponse(
    val uuid: String,
    val name: String,
    val email: String,
    val phone: String,
    val balance: Double,
    val currency: String
)
