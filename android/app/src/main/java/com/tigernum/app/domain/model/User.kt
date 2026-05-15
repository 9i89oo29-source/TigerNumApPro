package com.tigernum.app.domain.model

data class User(
    val uuid: String,
    val name: String,
    val email: String,
    val phone: String,
    val balance: Double,
    val currency: String
)
